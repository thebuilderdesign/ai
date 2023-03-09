import { useEffect, useContext, useState } from "react";
import { AiMintsContractAbi, AiMintsContractAddress, WhitelistContractAbi, WhitelistContractAddress } from "./constants";
import { ethers } from "ethers";
import React from 'react'
import {useRouter} from "next/router";

const AiMintsContext = React.createContext();

const AiMintsProvider = ({children}) => {
const [currentAddress, setCurrentAddress] = useState("")
  const [walletConnected, setWalletConnected] = useState(false);
  const [totalWhitelisted, setTotalWhitelisted] = useState(0);
  const [nftsMinted, setNftsMinted] = useState(0);

  const router = useRouter();

  useEffect(() => {
    if(!(window.ethereum)) {
      alert("Please Install Metamask");
    }
  }, [])


  const getProviderOrSigner = async (needSigner = false) => {
    try {
         const provider = new ethers.providers.Web3Provider(window.ethereum);

    const chainId = await provider.send("eth_chainId", []);
    console.log(chainId);
    if (chainId != "0x66eed") {
      window.alert("Please connect to the Goerli Testnet");
      throw new Error("Please Switch to the localhost");
    }

    if (needSigner) {
      const signer = provider.getSigner();
      return signer;
    }
    return provider;
    } catch (error) {
      console.log("Error getting provider/signer", error )
    }
 
  };


  const connectWallet = async () => {
    try {
      const provider = await getProviderOrSigner(false);
      
      const accounts = await provider.send("eth_requestAccounts", []);
      setWalletConnected(true);
      setCurrentAddress(accounts[0])
    } catch (error) {
      console.log("Error COnnecting to the wallet", error)
    }
  }

  const getContractInstance = async (contractAddress, contractAbi, providerOrSigner) => {
    const instance =  new ethers.Contract(
      contractAddress,
      contractAbi,
      providerOrSigner
    );
    return instance
  }

  const getWhitelisted = async (setWhitelistTxt) => {
    try {

      setWhitelistTxt("Whitelisting...");
      const signer = await getProviderOrSigner(true);


      console.log("Whitelist contract address --> ", WhitelistContractAddress);

      const whitelistContract = await getContractInstance(WhitelistContractAddress, WhitelistContractAbi, signer);
      
      console.log("WHite list Contract ",whitelistContract )

      

      const txn = await whitelistContract.addAddressToWhitelist();
      await txn.wait();

      setWhitelistTxt("🎉 Whitelisted");
      await getTotalWhitelisted();


      console.log("Number of Addresses whitelisted -->", totalWhitelisted);
    } catch (error) {
      // console.log("error msg", error.data.message)
      if(error.data){
        if(error.data.message == "Error: VM Exception while processing transaction: reverted with reason string 'Sender has already been whitelisted'")
        alert("You are already Whitelisted");
      }
      console.log("Error Whitelisting the Address", error);
    }
  }

  const getTotalWhitelisted = async () => {
    try {
      const provider = await getProviderOrSigner(false);
      const whitelistContract = await getContractInstance(WhitelistContractAddress, WhitelistContractAbi, provider);
      const noWhitelisted = await whitelistContract.numAddressesWhitelisted();

      setTotalWhitelisted(noWhitelisted);

    } catch (error) {
      console.log("Error fetching the number of whitelisted addresses", error)
    }
  }

  const checkIfWhitelisted = async () => {
    try {
      const signer = await getProviderOrSigner(true);
      const whitelistContract = await getContractInstance(WhitelistContractAddress, WhitelistContractAbi, signer)

      const address = await signer.getAddress();
      console.log("WHitelist Contract", whitelistContract);
      const txn = await whitelistContract.isWhitelisted(address);

      console.log("txn -->", txn)

      return txn;
    } catch (error) {
      console.log("Error checking for Whitelist", error )
    }
  }

  const mintNFT = async (tokenURI, isWhitelisted, setBtnText) => {
    try {
      const signer = await getProviderOrSigner(true);
      const aiMintsContract = await getContractInstance(AiMintsContractAddress, AiMintsContractAbi, signer);
      console.log("aiMintsContract", aiMintsContract);

      setBtnText("Minting NFT");

      if(isWhitelisted) {
        let txn = await aiMintsContract.whitelistMint(tokenURI, {value: ethers.utils.parseUnits("0.01", "ether")});
        await txn.wait();
        alert("Successfully Minted the NFT")
      } else {
          let txn = await aiMintsContract.publicMint(tokenURI, {value: ethers.utils.parseUnits("0.02", "ether")});
          await txn.wait();
        alert("Successfully Minted the NFT")
        }

        router.push({ pathname: "success", query:{isError : "false"} });
    } catch (error) {
      alert("Failed to Mint NFT");
      router.push({ pathname: "success", query:{isError : "true"} });

      console.log("Error Minting NFT", error);
    }
  }

  const fetchTokenURI = async (tokenId) => {
    try {
      const provider = await getProviderOrSigner(false);
      const aiMintsContract = await getContractInstance(AiMintsContractAddress, AiMintsContractAbi, provider);

      console.log("tokenId before fetching tokenURI ", tokenId)

      const tokenURI = await aiMintsContract.tokenURI(tokenId);
      console.log("TOKEN URI --> ", tokenURI)

      return tokenURI;
    } catch (error) {
      console.log("error fetching token URI", error);
    }
  }

  const numberOfNFTsMinted = async() => {
    try {
      const signer = await getProviderOrSigner(true);
      const aiMintsContract = await getContractInstance(AiMintsContractAddress, AiMintsContractAbi, signer);
      
      const address = await signer.getAddress();
      const no = await aiMintsContract.getNumberOfNFTsMinted(address);

      console.log("address --> ", address);

      console.log("number of NFTs minted --> ", no);
      setNftsMinted(no);
    } catch (error) {
      console.log("Error fetching the number of NFTs Minted", error);
    }
  }

  const getLatestTokenId = async (setLatestId) => {
    try {
      const provider = await getProviderOrSigner(false);

      const aiMintsContract = await getContractInstance(AiMintsContractAddress, AiMintsContractAbi, provider);

      let latestId = await aiMintsContract.latestTokenId();
      latestId = latestId.toString();

      setLatestId(latestId);
      console.log("latest token Id -->", latestId);

      return latestId;
    } catch (error) {
      console.log("Error fetching latest token Id ", error);
    }
  }
 
  return (
    <AiMintsContext.Provider value={
       {
        totalWhitelisted,
        connectWallet,
        currentAddress,
        walletConnected,
        getWhitelisted,
        getTotalWhitelisted,
        checkIfWhitelisted,
        mintNFT,
        numberOfNFTsMinted,
        nftsMinted,
        fetchTokenURI,
        getLatestTokenId
       }
    }>{children}</AiMintsContext.Provider>
  )
}

export const useAiMintsContext = () => {
    return useContext(AiMintsContext)
}

export default AiMintsProvider