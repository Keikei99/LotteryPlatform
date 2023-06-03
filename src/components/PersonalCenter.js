import React from 'react'

import { useConnect, useAccount } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";

import axios from "axios";
import { usePrepareContractWrite } from "wagmi";
import { useContractWrite } from "wagmi";
import { useContractRead } from 'wagmi';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

import Event from './Event'
import {EventLists, VictoryEventLists, ParticipatedEventLists, CreatedEventLists} from '../testData/EventLists';

import { UserOutlined } from '@ant-design/icons';
import { Avatar, Space } from 'antd';

function PersonalCenter() {

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

  // TODO: Connect a wallet with metamask
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
    alert(`Disconnect with address ${accountAddress}`);
    setAccountAddress('');
    setAccountBalance('');
    setIsConnected(false);
  };

  return (
    <div className="PersonalCenter-div">
      <h1>Personal Center</h1>
      <Space direction="vertical" size={16}>
        <Space wrap size={16}>
          <Avatar size={64} icon={<UserOutlined />} />
        </Space>
        {haveMetamask ? (
          <div className="PersonalCenter-header">
            {isConnected ? (
              <div className="card">
                <div className="card-row">
                  <h3>Wallet Address:</h3>
                  <p>
                    {accountAddress}
                  </p>
                </div>
                <div className="victory-event">
                  <h2>Victory Events</h2>
                {
                  VictoryEventLists.map((event) => {
                    return <Event propEvent={event} />
                  })
                }
                </div>
                <h2>Participated Events</h2>
                <div className="participated-event">
                {
                  ParticipatedEventLists.map((event) => {
                    return <Event propEvent={event} />
                  })
                }
                </div>
                <div className="created-event">
                <h2>Created Events</h2>
                {
                  CreatedEventLists.map((event) => {
                    return <Event propEvent={event} />
                  })
                }
                </div>
                
              </div>
            ) : (
              <h2>Connect with your wallet and then you can check your personal center.</h2>
            )}
            {isConnected ? (
              <button className="connectButton" onClick={disconnectWallet}>
                DisConnect
              </button>
            ) : (
              <button className="connectButton" onClick={connectWallet}>
                Connect
              </button>
            )}
          </div>
        ) : (
          <p>Please Install MataMask</p>
        )}
      </Space>
      

      

    </div>
  );
}

export default PersonalCenter