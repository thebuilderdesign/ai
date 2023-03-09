import React, { useEffect, useState } from 'react'
import { useAiMintsContext } from '../../utils/AiMintsContext'
const Address = ({address, cut}) => {

    const { nftsMinted, numberOfNFTsMinted} = useAiMintsContext();

    useEffect(() => {
      numberOfNFTsMinted();
      console.log("NFTS Minted --> ", nftsMinted);
    },[])
  return (
    <div>
        <p>Connected To : {cut ? `${address.substr(0,12)}...${address.substr(35)}` : address } <span>{nftsMinted != 3 ? `${3 - nftsMinted}/3 NFTs left to Mint` : "Max no. of Mints Reached"}</span></p>
        <style jsx>
        {`
        p {
          display: block;
          width: 100%;
          text-align: center;
          font-family: monospace;
          font-size: 1.2rem;
          margin: 0;
          height: 5%;
        }

        p span {
          color: white;
          background: black;
          display:block;
          width:fit-content;
          text-align: center;
          margin: 0 auto;
          padding: 0 20px;
          border-radius: 10px;
          filter: var(--text-shadow);
        }

        @media screen and (max-width: 768px) {
            p {
                font-size: 0.8rem;
            }
        }
      `}
      </style>
    </div>
  )
}

export default Address