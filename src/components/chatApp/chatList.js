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
                <MDBCol md="6" lg="7" xl="8">
                    <MDBTypography listUnStyled>
                        <li className="d-flex justify-content-between mb-4">
                            <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                                alt="avatar"
                                className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                                width="60"
                            />
                            <MDBCard>
                                <MDBCardHeader className="d-flex justify-content-between p-3">
                                    <p className="fw-bold mb-0">Brad Pitt</p>
                                    <p className="text-muted small mb-0">
                                        <MDBIcon far icon="clock" /> 12 mins ago
                                    </p>
                                </MDBCardHeader>
                                <MDBCardBody>
                                    <p className="mb-0">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                                        do eiusmod tempor incididunt ut labore et dolore magna
                                        aliqua.
                                    </p>
                                </MDBCardBody>
                            </MDBCard>
                        </li>
                        <li class="d-flex justify-content-between mb-4">
                            <MDBCard className="w-100">
                                <MDBCardHeader className="d-flex justify-content-between p-3">
                                    <p class="fw-bold mb-0">Lara Croft</p>
                                    <p class="text-muted small mb-0">
                                        <MDBIcon far icon="clock" /> 13 mins ago
                                    </p>
                                </MDBCardHeader>
                                <MDBCardBody>
                                    <p className="mb-0">
                                        Sed ut perspiciatis unde omnis iste natus error sit
                                        voluptatem accusantium doloremque laudantium.
                                    </p>
                                </MDBCardBody>
                            </MDBCard>
                            <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-5.webp"
                                alt="avatar"
                                className="rounded-circle d-flex align-self-start ms-3 shadow-1-strong"
                                width="60"
                            />
                        </li>
                        <li className="d-flex justify-content-between mb-4">
                            <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                                alt="avatar"
                                className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                                width="60"
                            />
                            <MDBCard>
                                <MDBCardHeader className="d-flex justify-content-between p-3">
                                    <p className="fw-bold mb-0">Brad Pitt</p>
                                    <p className="text-muted small mb-0">
                                        <MDBIcon far icon="clock" /> 10 mins ago
                                    </p>
                                </MDBCardHeader>
                                <MDBCardBody>
                                    <p className="mb-0">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                                        do eiusmod tempor incididunt ut labore et dolore magna
                                        aliqua.
                                    </p>
                                </MDBCardBody>
                            </MDBCard>
                        </li>
                        <li className="bg-white mb-3">
                            <MDBTextArea label="Message" id="textAreaExample" rows={4} />
                        </li>
                        <MDBBtn color="info" rounded className="float-end">
                            Send
                        </MDBBtn>
                    </MDBTypography>
                </MDBCol>

    );
}

export default Chat;