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

function Organizer() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new MetaMaskConnector(),
  });

  const [userBal, setUserBal] = useState(null);
  async function getBalance() {
    const response = await axios.get("http://localhost:3000/getBalance", {
      params: {
        address: address,
      },
    });
    setUserBal(response.data.balance);
  }

  const [sendAmount, setSendAmount] = useState(0);
  function changeSendAmount(e){
    setSendAmount(e.target.value)
  }
  const debouncedSendAmount = useDebounce(sendAmount, 500);

  const { config } = usePrepareContractWrite({
    address: '0xEe86f830651679b1f5947d2a59b11915046989CC',
    abi: ABI,
    chainId: 43113,
    functionName: 'mint(uint256)',
    args: [ debouncedSendAmount],
    enabled: Boolean(debouncedSendAmount)
  })
  const { write } = useContractWrite(config)

  useEffect(() => {
    if (!isConnected) {
      setUserBal(null);
      setSendAmount(0);
      return;
    }
    getBalance();
  }, [isConnected, address]);

  return (
    <div className="Organizer"> 
    Organizer
    <br/>
    <input type="number" value={sendAmount} onChange={changeSendAmount} placeholder="Enter amount" />
    <button className="connectButton" onClick={()=>write?.()}>mint</button>
    <br/>
      {<p>(CTC Balance: {userBal} )</p>}
      {/* <button className="connectButton" onClick={()=>writex?.()}>mint</button> */}
      {/* <input type="number" value={sendAmount2} onChange={changeSendAmount2} placeholder="Enter amount" />
      <button  className="connectButton" onClick={()=>write2?.()}>approve</button>
      {/* <button style={{ marginLeft: '8px' }}onClick={() => {refetch();}}>{isFetching ? 'Reading...' : 'Read'}</button>
 */}

   </div>
  )
}

export default Organizer