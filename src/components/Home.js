import React from 'react'
import Logo from "../manghe.jpg";

import { useConnect, useAccount } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";

import axios from "axios";
import {useState } from "react";
import { usePrepareContractWrite} from "wagmi";
import { useContractWrite } from "wagmi";
import { useContractRead } from 'wagmi';
import { useEffect } from "react";

function Home() {

  return (
    <div className="Home"> 
      <h1>Home</h1>
   </div>
  )
}

export default Home