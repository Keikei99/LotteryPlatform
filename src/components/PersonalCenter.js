import React from 'react'

import { useConnect, useAccount } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";

import axios from "axios";
import { usePrepareContractWrite } from "wagmi";
import { useContractWrite } from "wagmi";
import { useContractRead } from 'wagmi';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

import { UserOutlined } from '@ant-design/icons';
import { Avatar, Space } from 'antd';
import { DownOutlined, FrownFilled, MehOutlined, SmileOutlined, FrownOutlined } from '@ant-design/icons';
import { Tree } from 'antd';

const treeData1 = [
  {
    title: 'Victory Events',
    key: '0-0',
    icon: <SmileOutlined />,
    children: [
      {
        title: 'Event1',
        key: '0-0-0',
        icon: <MehOutlined />,
      },
      {
        title: 'Event2',
        key: '0-0-1',
        icon: ({ selected }) => (selected ? <FrownFilled /> : <FrownOutlined />),
      },
    ],
  },
];

const treeData2 = [
  {
    title: 'Participated Events',
    key: '0-0',
    icon: <SmileOutlined />,
    children: [
      {
        title: 'Event1',
        key: '1-0-0',
        icon: <MehOutlined />,
      },
      {
        title: 'Event2',
        key: '1-0-1',
        icon: ({ selected }) => (selected ? <FrownFilled /> : <FrownOutlined />),
      },
    ],
  },
];

const treeData3 = [
  {
    title: 'Created Events',
    key: '0-0',
    icon: <SmileOutlined />,
    children: [
      {
        title: 'Event1',
        key: '2-0-0',
        icon: <MehOutlined />,
      },
      {
        title: 'Event2',
        key: '2-0-1',
        icon: ({ selected }) => (selected ? <FrownFilled /> : <FrownOutlined />),
      },
    ],
  },
];

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
                {/* <div className="card-row">
                  <h3>Wallet Balance:</h3>
                  <p>{accountBalance}</p>
                </div> */}
                {/* TODO: 加入个人中心的内容 */}
                <Tree
                  showIcon
                  defaultExpandAll
                  defaultSelectedKeys={['0-0-0']}
                  switcherIcon={<DownOutlined />}
                  treeData={treeData1}
                />
                <Tree
                  showIcon
                  defaultExpandAll
                  defaultSelectedKeys={['0-0-0']}
                  switcherIcon={<DownOutlined />}
                  treeData={treeData2}
                />
                <Tree
                  showIcon
                  defaultExpandAll
                  defaultSelectedKeys={['0-0-0']}
                  switcherIcon={<DownOutlined />}
                  treeData={treeData3}
                />
              </div>
            ) : (
              <h2>Connect with your wallet and then you can check your personal center.</h2>
            )}
            {isConnected ? (
              <button className="disconnectBtn" onClick={disconnectWallet}>
                DisConnect
              </button>
            ) : (
              <button className="connectBtn" onClick={connectWallet}>
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