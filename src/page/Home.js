import React, {useEffect, useState} from "react";
import './chatApp.css';
import { useHistory, Link } from 'react-router-dom';

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
import ChatBox from "../components/chatApp/chatBox";

function Chat() {
    const [socket, setSocket] = useState(null);
    const history = useHistory();

    const handleLogout = () => {
        //Gửi yêu cầu đăng ký đến server WebSocket
        const requestData = {
            action: "onchat",
            data: {
                event: "LOGOUT",
            },
        };
        history.push("/");

        // if (response.ok) {
        //     const { token } = await response.json();
        //     localStorage.setItem('token', token);
        //     // Đặt trạng thái xác thực trong ứng dụng của bạn
        // } else {
        //     // Xử lý lỗi đăng nhập
        // }
    };

    const ChatList = ({ message }) => {

    }

    return (
        <MDBContainer fluid className="py-5 gradient-custom" style={{ backgroundColor: "#eee" }}>
            <MDBRow>
                <ChatBox/>
                <ChatList/>
            </MDBRow>
        </MDBContainer>
    );
}

export default Chat;