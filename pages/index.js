import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { lazy, useState } from "react";
import axios from "axios";
import ai from "../public/logo.png"
import {useRouter} from "next/router"
export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState([]);
  const [isError, setIsError] = useState(false)
  const router = useRouter();

  const submitHandler = async () => {
    try {
      setImages([])
      setLoading(true)
      const res = await axios.get(`/api/${prompt}`);
      setPrompt("");
      const imageData = res.data.imageData;

      const imageURLs = imageData.map((el) => b64ToFile(el.b64_json));

      setLoading(false)

      storeToLocalStorage(imageData);
      setImages(imageURLs);
    } catch (error) {
      setLoading(false)
      setIsError("Error Fetching Images");
      console.log("Error", error);
    }
  };

  const b64ToFile = (b64String) => {
    const binaryData = atob(b64String);

    // Create an array containing the binary data
    const byteArray = new Uint8Array(binaryData.length);
    for (let i = 0; i < binaryData.length; i++) {
      byteArray[i] = binaryData.charCodeAt(i);
    }

    // Create a Blob containing the binary data
    const blob = new Blob([byteArray], { type: "image/png" });

    const file = new File([blob], "newImage.png", {type: "image/png"})

    // Create a URL for the Blob
    const url = URL.createObjectURL(file);

    return url;
  }

  const storeToLocalStorage = (arr) => {
    arr.map((el, i) => {
      localStorage.setItem(`url${i+1}`, el.b64_json);
    })
  }

  const redirectToMint = (e) => {
    const id = e.target.getAttribute('id');
    const imageId = e.target.getAttribute('id');
    router.push({pathname: "/mint", query: { imageId: id }})
    console.log("Image Id -->", imageId);

  }

  return (
    <div>
      <main className={styles.main}>
      
      <div className={styles.promptBar_container}>
        <input
          className={styles.promptBar}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter Your Prompt"
          value={prompt}
        />
        <button onClick={submitHandler} className={styles.generate_btn}>
          Generate Image
        </button>
      </div>
      <p className={styles.user_guide_txt}>{images.length > 0 ? "Select the Image for which you want to mint an NFT" :"Generate Images by Entering Prompts in the above bar"}</p>
      
        <div className={styles.bottom_section}>
          {images.length > 0 ? (
            <div className={styles.images_container}>
              {
                images.map((el, i) => <Image key={i+1}  id={i+1} onClick={redirectToMint} alt="prompt images" src={el} width={400} height={400} className={styles.prompt_img} />)
              }
            </div>
          ): (
            <div className={styles.text_container}>
              {loading || isError ? ( loading ? <p className={styles.cta_txt}>Loading...Fetching Images</p> : <p className={`${styles.cta_txt} ${styles.red_text}`}>Error Fetching Images</p>   ) : (
                <div className={styles.cta_container}>
              <h1 className={styles.cta_txt}>Donuts Protocol AI NFT Minting App</h1>
              <Image alt="ai robot" src={ai} width={400} height={400} className={styles.cta_img} />
              </div>
              ) }
              
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
