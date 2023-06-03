import React from 'react'
import { Link } from "react-router-dom";
import { useConnect, useAccount } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

function Event({ propEvent }) {
  
  return (
    <div className="event-grid-table">
        <img src="" />
        <div className="event-title">
            <a herf="https://baidu.com" className=""></a>
            <div className="event-main-content">
                {/* <div className="event-image">
                    <img src="https://profile-avatar.csdnimg.cn/default.jpg!1"  />
                </div> */}
                <div className="content">
                    <h3 className="event-name">{propEvent.eventName}</h3>
                    <div className="event-organizer">
                        Organizer: {propEvent.organizer}
                    </div>
                    <div className="event-profile">
                        Event Profile: {propEvent.profile}
                    </div>
                    <div className="event-jackpot">
                        Jackpot: {propEvent.jackpot}ETH
                    </div>
                    <div className="event-time">
                        Time: {propEvent.startTime} - {propEvent.endTime}
                    </div>
                    {/* ... */}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Event