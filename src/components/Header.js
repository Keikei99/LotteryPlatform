/**
 * Header：导航栏
 * 
 */
import React from 'react'
import { Link } from "react-router-dom";
import { useConnect, useAccount } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";

function Header() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new MetaMaskConnector(),
  });
  
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

      
      {/**
        FIXME: What is this???
        花括号里的是一个语句表达式，isConnected判断是否链接成功
        初步判断是Metamask条件渲染
      */}
      {isConnected ? (
      <>
        <h2 className="connectButton">Connected Wallet</h2>
      </>
      ) : (
        <button className="connectButton" onClick={connect} >Connect Your Wallet</button>
      )}

    </header>
  )
}

export default Header