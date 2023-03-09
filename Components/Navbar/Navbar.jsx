import { useEffect, useState } from "react";
import { useAiMintsContext } from "../../utils/AiMintsContext";
import Link from "next/link"
import styles from "./Navbar.module.css"
import Address from "../Address/Address";

const Navbar = () => {
    const [windowWidth, setWindowWidth] = useState("");

    const {currentAddress, connectWallet, walletConnected} = useAiMintsContext();
    useEffect(() => {
      setWindowWidth(window.innerWidth);
    }, [])

    useEffect(() => {
      window.ethereum.on("accountsChanged",(newAccounts) => {
        console.log("Accounts Changed");
        connectWallet();
      });
    }, [currentAddress])

 
  
  return (
    <div className={styles.navbar_container}>
        <nav className={styles.navbar}>
                <Link href="/" ><p className={styles.logo}>{windowWidth > 768 ? "Donuts Protocol AI Mints" : "DIM"}</p></Link>
                <Link href="/whitelist"><p className={styles.navbar_link}>Get Whitelisted</p></Link>    
                { walletConnected ? (
                    <p className={styles.connect_btn}>Connected</p>
                ):(
                    <button className={styles.connect_btn} onClick={connectWallet}>Connect Wallet</button>
                ) }
        </nav>
        {walletConnected ? <Address address={currentAddress} cut={windowWidth > 768 ? false: true} /> : null}
        
    </div>
  )
}

export default Navbar