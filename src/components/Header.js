/**
 * Header：导航栏
 * 
 */
import React from 'react'
import { Link } from "react-router-dom";
import { useConnect, useAccount } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

function Header() {
  const [haveMetamask, sethaveMetamask] = useState(true);
  const [accountAddress, setAccountAddress] = useState('');
  const [accountBalance, setAccountBalance] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  const { ethereum } = window;
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  useEffect(() => {
    const { ethereum } = window;
    const checkMetamaskAvailability = async () => {
      if (!ethereum) {
        sethaveMetamask(false);
      }
      sethaveMetamask(true);
    };
    checkMetamaskAvailability();
  }, []);

  const connectWallet = async () => {
    try {
      if (!ethereum) {
        sethaveMetamask(false);
      }
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });
      let balance = await provider.getBalance(accounts[0]);
      let bal = ethers.utils.formatEther(balance);
      setAccountAddress(accounts[0]);
      setAccountBalance(bal);
      setIsConnected(true);
    } catch (error) {
      setIsConnected(false);
    }
  };

  // TODO: To disconnect with metamask
  const disconnectWallet = async () => {
    alert(`disconnect with ${accountAddress}`);
    setAccountAddress('');
    setAccountBalance('');
    setIsConnected(false);
  };

  return (
    <header>
      <Link to="/" className="link">
        <div className="headerItem">Home</div>
      </Link>

      {/* <Link to="/NftGallery" className="link">
        <div className="headerItem">NftGallery</div>
      </Link>

      <Link to="/Swap" className="link">
        <div className="headerItem">Swap</div>
      </Link> */}

      <Link to="/Participant" className="link">
        <div className="headerItem">Participant</div>
      </Link>

      <Link to="/Organizer" className="link">
        <div className="headerItem">Organizer</div>
      </Link>

      <Link to="/PersonalCenter" className="link">
        <div className="headerItem">Personal Center</div>
      </Link>


      {/**
        FIXME: What is this???
        花括号里的是一个语句表达式，isConnected判断是否链接成功
        初步判断是Metamask条件渲染
      */}
      {/* {isConnected ? (
        <>
          <h2 className="connectButton">Connected Wallet</h2>
        </>
      ) : (
        <button className="connectButton" onClick={connect} >Connect Your Wallet</button>
      )} */}
      {isConnected ? (
        <button className="connectButton" onClick={disconnectWallet}>
          DisConnect  
        </button>
      ) : (
        <button className="connectButton" onClick={connectWallet}>
          Connect Wallet
        </button>
      )}

    </header>
  )
}

export default Header