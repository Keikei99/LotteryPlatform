/**
 * FIXME: 可以考虑利用步骤条来分步创建活动。
 * 1. What about your Event? (Event Information)
 * 2. What about you? (Organizer Information)
 * 3. Stack to the jackpot (pay)
 */
import React from 'react'

import { useConnect, useAccount } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";

import axios from "axios";
import { useState } from "react";
import { usePrepareContractWrite } from "wagmi";
import { useContractWrite } from "wagmi";
import { useContractRead } from 'wagmi';
import { useEffect } from "react";

import 'react-datepicker/dist/react-datepicker.css';

// import '../css/Organizer.css'
import { UploadOutlined } from '@ant-design/icons';
import { Input, Button } from 'antd'; // antd UI组件库
import { DatePicker, Space } from 'antd';
import { InputNumber } from 'antd';
import { message, Upload } from 'antd';
import { Alert } from 'antd';
const { RangePicker } = DatePicker;
const { Dragger } = Upload;

function Organizer() {
  const [event, setEvent] = useState({
    eventName: '',
    eventImage: '', // 暂时先改空字符串
    profile: '',
    organizer: '',
    promotionLink: '',
    jackpot: '',
    startTime: new Date(),
    endTime: new Date()
  });

  // 从本地存储中恢复表单数据
  useEffect(() => {
    const savedEvent = localStorage.getItem('event');
    if (savedEvent) {
      setEvent(JSON.parse(savedEvent));
    }
  }, []);

  // TODO: date
  const handleDateChange = (value, dateString) => {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
  };

  const handleDateOk = (value) => {
    console.log('handleDateOk: ', value);
    let [startTime, endTime] = value;
    startTime = new Date(startTime);
    event.startTime = startTime.getTime();
    endTime = new Date(endTime);
    event.endTime = endTime.getTime();
    console.log([startTime, endTime]);
  };

  // TODO: image upload
  const props = {
    name: 'file',
    action: 'https://127.0.0.1/imgs',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      // FIXME: 后面再考虑
      console.log(info);

      // if (info.file.status !== 'uploading') {
      //   console.log(info.file, info.fileList);
      // }
      // if (info.file.status === 'done') {
      //   message.success(`${info.file.name} file uploaded successfully`);
      // } else if (info.file.status === 'error') {
      //   message.error(`${info.file.name} file upload failed.`);
      // }
    },
  };

  // TODO: text input
  const handleTextInputChange = (event) => {
    const { name, value } = event.target;
    setEvent(prevEvent => ({ ...prevEvent, [name]: value }));
  };

  // TODO: button save
  const handleSave = () => {
    // 处理保存逻辑
    console.log('Event saved:', event);
    alert("button save");
    // 将表单数据保存到本地存储
    localStorage.setItem('event', JSON.stringify(event));
  };

  // TODO: button publish
  const handlePublish = () => {
    // 处理发布逻辑
    console.log('Event published:', event);
    alert("button publish");

    console.log(event);
  };

  // TODO: button cancel
  const handleCancel = () => {
    // 处理取消逻辑
    console.log('Event creation cancelled');
    alert("button cancel");

    localStorage.removeItem('event');
    setEvent({
      eventName: '',
      eventImage: '', // 暂时先改空字符串
      profile: '',
      organizer: '',
      promotionLink: '',
      jackpot: '',
      startTime: new Date(),
      endTime: new Date()
    });
  };

  return (
    <div>
      <h2>Create Event:</h2>
      <form>
        {/* 使用table将表单对齐 */}
        <table className="createEventTable">
          {/* TODO: Event Name */}
          <tr>
            <td>Event Name: </td>
            <td>
              <Input
                placeholder="Event Name"
                type="text"
                name="eventName"
                value={event.eventName}
                onChange={handleTextInputChange}
              />
            </td>
          </tr>
          {/* TODO: Event Profile */}
          <tr>
            <td>Event Profile:</td>
            <td>
              <Input
                placeholder="Event Profile"
                type="text"
                name="profile"
                value={event.profile}
                onChange={handleTextInputChange}
              />
            </td>
          </tr>
          {/* TODO: Promotion Link: */}
          <tr>
            <td>Promotion Link:</td>
            <td>
              <Input
                placeholder="Promotion Link"
                type="text"
                name="promotionLink"
                value={event.promotionLink}
                onChange={handleTextInputChange}
              />
            </td>
          </tr>

          <tr>
            <td>Your Name:</td>
            <td>
              <Input
                placeholder="Your Name"
                type="text"
                name="organizer"
                value={event.organizer}
                onChange={handleTextInputChange}
              />
            </td>
          </tr>

          {/* TODO: Jackpot Amount: */}
          <tr>
            <td>Jackpot Amount:</td>
            <td>
              <Input
                placeholder="Jackpot Amount"
                type="text"
                name="jackpot"
                value={event.jackpot}
                onChange={handleTextInputChange}
              />
              ETH
            </td>
          </tr>
          {/* TODO: Event Image: */}
          <tr>
            <td>Event Image:</td>
            <td>
              <Upload {...props} >
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </td>
            
          </tr>
          {/* TODO: Time */}
          <tr>
            <td>Time:</td>
            <td>
              <Space direction="vertical" size={12}>

                <RangePicker
                  showTime={{
                    format: 'HH:mm',
                  }}
                  format="YYYY-MM-DD HH:mm"
                  onChange={handleDateChange}
                  onOk={handleDateOk}
                />
              </Space>
            </td>
          </tr>
        </table>
      </form>
      <br />
      <Button type="default" onClick={handleSave}>Save</Button>
      <Button type="primary" onClick={handlePublish}>Publish</Button>
      <Button danger onClick={handleCancel}>Cancel</Button>
    </div>
  );
}

export default Organizer;