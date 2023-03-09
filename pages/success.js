import styles from "../styles/Success.module.css";
import Link from "next/link";
import { useAiMintsContext } from "../utils/AiMintsContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
const Success = () => {
  const [latestId, setLatestId] = useState("");
  const { fetchTokenURI, getLatestTokenId } = useAiMintsContext();

  const router = useRouter();

  const isError = router.query.isError;

  const fetchLatestId = async () => {
    await getLatestTokenId(setLatestId);
    
  };

  useEffect(() => {
    fetchLatestId();
  }, [])
  useEffect(() => {
    fetchTokenURI(latestId);
  }, [latestId]);

  return (
    <div className={styles.success_container}>
      {isError == "true" ? (
        <>
          <p className={`${styles.success_txt} ${styles.red_txt}`}>
          Error Minting NFT
        </p>
        <p className={styles.home_link}>
            Go Back to <span onClick={()=> router.push("/")}> Home Page</span>
          </p>
        </>
        
      ) : latestId.length > 0 ? (
        <>
          <p className={styles.success_txt}>🎉 Successfully Minted the NFT!</p>
          <p className={styles.opensea_link}>
            You can view your NFT on <Link target="" href={`https://testnets.opensea.io/assets/0x744656fbCa6EfEBC042dD080a7AC3660c0fDCEBb/${latestId}/?force_update=true`}>OpenSea</Link>
          </p>
          <p className={styles.home_link}>
            Go Back to <span onClick={()=> router.push("/")}> Home Page</span>
          </p>
        </>
      ) : (
        <p className={styles.success_txt}>
          Fetching Latest Token Id! Please Wait...
        </p>
      )}
    </div>
  );
};

export default Success;
