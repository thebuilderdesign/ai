import styles from "../styles/Whitelist.module.css"
import { useEffect, useState } from "react";
import { useAiMintsContext } from "../utils/AiMintsContext"
const Whitelist = () => {

  const { totalWhitelisted, getWhitelisted, getTotalWhitelisted, checkIfWhitelisted } = useAiMintsContext();
  const [isWhitelisted, setisWhitelisted] = useState(false);
  const [whitelistTxt, setWhitelistTxt] = useState("WHITELIST")
  const checkWhitelist = async () => {
    let result = await checkIfWhitelisted();
    console.log("Result --> ", result);
    setisWhitelisted(result)
  }

  useEffect(() =>{
    checkWhitelist();
    getTotalWhitelisted();
  }, [])

  return (
    <div className={styles.whitelist_container}> {
      isWhitelisted ? <h2 className={styles.whitelist_heading}>You are Already Whitelisted !!</h2> : (
        <>
        <h2 className={styles.whitelist_heading}>{ whitelistTxt }</h2>
        <p className={styles.whitelist_info}>{totalWhitelisted}/100 Adresses already Whitelisted!</p>
        <button className={styles.whitelist_btn} onClick={ () => { getWhitelisted(setWhitelistTxt)  }}>Get Whitelisted</button>
        </>
      )
    }
        
    </div>
  )
}

export default Whitelist