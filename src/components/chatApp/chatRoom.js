import React, {useEffect, useState} from "react";
import './chatApp.css';
import {useHistory, Link, useLocation} from 'react-router-dom';

import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBIcon,
    MDBBtn,
    MDBTypography,
    MDBTextArea,
    MDBCardHeader, MDBInput,
} from "mdb-react-ui-kit";





    function setSocket(url, onMessageCallback) {
        // Tạo kết nối WebSocket
        const socket = new WebSocket('ws://140.238.54.136:8080/chat/chat');
        // Xử lý sự kiện khi kết nối được thiết lập
        socket.onopen = function() {
            console.log("Kết nối WebSocket đã được thiết lập");
        // Xử lí sự kiện khi tin nhắn đến
            socket.onmessage = function(event) {
                const message = event.data;
                console.log('Received message:', message);
                if (typeof onMessageCallback === 'function') {
                    onMessageCallback(message);
                }
            };

            // Xử lí khi lỗi kết nối
            socket.onerror = function(error) {
                console.error('WebSocket error:', error);
                // Handle the error condition here
            };

            // Xử lí khi đóng kết nối
            socket.onclose = function(event) {
                console.log('WebSocket connection closed with code:', event.code);
                //
            };

            return socket;
        }


    // Gửi thông điệp cho máy chủ để tham gia nhóm chat
    const message = {
        type: 'join',
        groupId: 'group1', // ID của nhóm chat
        username: 'User1' // Tên người dùng
    };
    socket.send(JSON.stringify(message));
};

// Xử lý sự kiện khi nhận thông điệp từ máy chủ
socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    console.log('Nhận thông điệp từ máy chủ:', message);

    // Xử lý thông điệp theo loại
    switch (message.type) {
        case 'chat':
            console.log(`${message.username}: ${message.text}`);
            break;
        case 'join':
            console.log(`${message.username} đã tham gia nhóm chat.`);
            break;
        case 'leave':
            console.log(`${message.username} đã rời khỏi nhóm chat.`);
            break;
        // Xử lý các loại thông điệp khác (nếu cần)
    }
};

// Xử lý sự kiện khi kết nối bị đóng
socket.onclose = () => {
    console.log('Kết nối WebSocket đã bị đóng.');
};

// Gửi thông điệp chat đến nhóm
function sendChatMessage(text) {
    const message = {
        type: 'chat',
        groupId: 'group1', // ID của nhóm chat
        username: 'User1', // Tên người dùng
        text: text // Nội dung tin nhắn
    };
    socket.send(JSON.stringify(message));
}

// Gửi thông điệp rời khỏi nhóm chat
function leaveGroup() {
    const message = {
        type: 'leave',
        groupId: 'group1', // ID của nhóm chat
        username: 'User1' // Tên người dùng
    };
    socket.send(JSON.stringify(message));
}
