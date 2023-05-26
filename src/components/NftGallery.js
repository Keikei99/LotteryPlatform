/**
 * NftGallery: NFT导航栏
 */

import React from 'react'
import Logo from "../manghe.jpg";

import { useConnect, useAccount } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";

import axios from "axios";
import {useState } from "react";
import useDebounce from "./useDebounce";
import ABI from "./abi.json";
import ABI2 from "./abi2.json";
import { usePrepareContractWrite} from "wagmi";
import { useContractWrite } from "wagmi";
import { useContractRead } from 'wagmi';
import { useEffect } from "react";

function NftGallery() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new MetaMaskConnector(),
  });

  const { config } = usePrepareContractWrite({
    address: '0x0b5808C78a99317266A982af9695367a3CE72C77',
    abi: ABI2,
    chainId: 43113,
    functionName: 'safeMint',
  })
  const { write } = useContractWrite(config)
  return (
    <div>
      <img src={Logo}  width="300" height="300" />
      <br/>
      <button className="connectButton" onClick={()=>write?.()}>1CTC to mint</button>
      <br/>
      <a href="https://testnets.opensea.io/" target="_blank" rel="noopener noreferrer">Check it out on OpenSea</a>
    </div>
  )
}

export default NftGallery