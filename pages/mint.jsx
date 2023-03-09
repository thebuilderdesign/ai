import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";


import { uploadFileToIPFS } from "../utils/pinata";


import styles from "../styles/Mint.module.css";
import { useAiMintsContext } from "../utils/AiMintsContext";

const Mint = () => {
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [btnText, setBtnText] = useState("Mint NFT");
  const [isWhitelisted, setIsWhitelisted] = useState(false)

  
  const router = useRouter();
  const { mintNFT, checkIfWhitelisted, nftsMinted, connectWallet } = useAiMintsContext();

  const b64ToFile = (b64String) => {
    const binaryData = atob(b64String);

    // Create an array containing the binary data
    const byteArray = new Uint8Array(binaryData.length);
    for (let i = 0; i < binaryData.length; i++) {
      byteArray[i] = binaryData.charCodeAt(i);
    }

    // Create a Blob containing the binary data
    const blob = new Blob([byteArray], { type: "image/png" });

    const file = new File([blob], "newImage.png", { type: "image/png" });

    setImageFile(file);

    console.log("image file --> ", imageFile);

    // Create a URL for the Blob
    const url = URL.createObjectURL(file);

    return url;
  };


  const whitelistCheck = async () => {
    const txn = await checkIfWhitelisted();
    console.log("result --> ", txn);
    setIsWhitelisted(txn);

  }

  const id = router.query.imageId;

  useEffect(() => {
    connectWallet()
    whitelistCheck();
    createFile();
  }, []);

  const createFile = () => {
    const b64String = localStorage.getItem(`url${id}`);
    const imageURL = b64ToFile(b64String);
    setImage(imageURL);
  };

  const mintHandler = async (e) => {
    try {
      e.target.disabled = true;
      setBtnText("Uploading File to IPFS...");
      console.log("Uploading metadata to ipfs");
      // console.log("Image file before uploading to IPFS", imageFile)
      let response = await uploadFileToIPFS(imageFile);


      if (response.success == true) {
        setBtnText("Successfully Uploaded File to IPFS ✅");
        const tokenURI = response.pinataURL;
        console.log("TOKen URI -->", tokenURI)
        // setBtnText("Minting NFT...");
        if(isWhitelisted){
          await mintNFT(tokenURI, true, setBtnText);
        } else {
          await mintNFT(tokenURI, false, setBtnText);
        }
        console.log("Minted NFT")
        setBtnText("Mint NFT");
        e.target.disabled = false;
  
      } else {
        alert("Failed to Upload File to IPFS");
        e.target.disabled = false;
        setBtnText("Mint NFT");
      }
    } catch (error) {
      alert("Error Minting NFT")
      e.target.disabled = false;
      console.log("Error Minting NFT", error);
    }
  };

  return (
    <div className={styles.mint_container}>
      {!(nftsMinted < 3) ? (
        <p className={styles.no_mints}>Max No of Mints Reached !</p>
      ) : (
        <>
          <div className={styles.mint_left_section}>
            {image ? (
              <Image
                src={image}
                alt="nft image"
                width={400}
                height={400}
                className={styles.mint_nft_img}
              />
            ) : null}
          </div>
          <div className={styles.mint_right_section}>
            <p className={styles.prompt}>{isWhitelisted ? "You are Whitelisted!" : "Get Whitelisted to mint at half the price"}</p>
            <p>
              <span>Price : {isWhitelisted ? "0.01": "0.02" } ETH</span>
            </p>
            <button
              className={styles.mint_btn}
              onClick={mintHandler}
            >
              {btnText}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Mint;
