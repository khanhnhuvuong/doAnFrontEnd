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

export default function ChatList() {
    const [socket, setSocket] = useState(null);
    const history = useHistory();
    // const [userList, setUserList] = useState([]);
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const location = useLocation();
    const userList = location.state?.userList || [];

    useEffect(() => {
        console.log(userList); // Đảm bảo danh sách người dùng được cập nhật
    }, [userList]);


    useEffect(() => {
        const newSocket = new WebSocket("ws://140.238.54.136:8080/chat/chat");

        newSocket.addEventListener("open", (event) => {
            console.log("Kết nối WebSocket đã được thiết lập", event);
            setSocket(newSocket);
        });

        return () => {
            // Đóng kết nối WebSocket khi component bị hủy
            newSocket.close();
        };
    }, []);

    const handleLogout = () => {
        //Gửi yêu cầu đăng ký đến server WebSocket
        const requestData = {
            action: "onchat",
            data: {
                event: "LOGOUT",
            },
        };
        history.push("/");
    };

    // const handleLogin = () => {
    //     //Gửi yêu cầu đăng nhập đến server WebSocket
    //     // eslint-disable-next-line react-hooks/rules-of-hooks
    //     const requestData = {
    //         action: "onchat",
    //         data: {
    //             event: "LOGIN",
    //             data: {
    //                 user: user,
    //                 pass: pass,
    //             },
    //         },
    //     };
    //
    //     socket.send(JSON.stringify(requestData));
    //
    // };
    //
    // const userListRequest = () => {
    //     //Gửi yêu cầu đăng ký đến server WebSocket
    //     const requestData = {
    //         action: "onchat",
    //         data: {
    //             event: "GET_USER_LIST",
    //         },
    //     };
    //     socket.send(JSON.stringify(requestData));
    //     socket.addEventListener("message", (event) => {
    //         const message = JSON.parse(event.data);
    //
    //         // Xử lý tin nhắn từ server
    //         if (message.action === "onchat" && message.data.event === "USER_LIST") {
    //             // Cập nhật danh sách người dùng
    //             setUserList(message.data.userList);
    //         }
    //     });
    // };

    // const handleGetUserList = () => {
    //     // Gửi yêu cầu lấy danh sách user tới WebSocket Server
    //     const requestData = {
    //         action: "onchat",
    //         data: {
    //             event: "LOGIN",
    //             data: {
    //                 user: user,
    //                 pass: pass,
    //             },
    //         },
    //     };
    //     socket.send(JSON.stringify(requestData));
    //     const loginData = {
    //         action: 'onchat',
    //         data: {
    //             event: 'GET_USER_LIST',
    //         },
    //     };
    //     socket.send(JSON.stringify(loginData));
    //     console.log("Đã gửi yêu cầu lấy danh sách cho server")
    //     socket.onmessage = (event) => {
    //         const response = JSON.parse(event.data);
    //         if (response.status === 'success' && response.event === 'GET_USER_LIST') {
    //             const users = response.data;
    //             setUserList(users);
    //             history.push('/userlist', {userList : users})
    //         }
    //     }
    // }
    //
    // useEffect(() => {
    //     if (socket) {
    //         socket.onmessage = (event) => {
    //             const responseData = JSON.parse(event.data);
    //             // eslint-disable-next-line react-hooks/rules-of-hooks
    //             if (responseData.action === "onchat" && responseData.data.event === "success") {
    //                 // Đăng nhập thành công
    //             }
    //         };
    //     }
    // }, [socket]);

    return (
        <MDBCol md="6" lg="5" xl="4" className="mb-4 mb-md-0">
            <a href="#!" className="d-flex justify-content-between">
                <div className="d-flex flex-row m-3">
                    <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-8.webp"
                        alt="avatar"
                        className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                        width="70"
                    />
                    <div className="pt-1 mt-3">
                        <h4 className="fw-bold font mb-0">Khanh Nhu</h4>
                    </div>
                </div>
                <MDBBtn className='h-25 mt-4 gradient-custom-3' size='lg' onClick={handleLogout}>Đăng
                    xuất</MDBBtn>
            </a>
            <MDBCard>
                <MDBCardBody>
                    <div className="input-group mb-3 justify-content-center">
                        <MDBInput label='Nhập tên người dùng' size='lg' id='form1'
                                  type='text'
                        />
                        <button type="button" className="btn btn-primary">
                            Thêm
                        </button>
                    </div>
                    <MDBTypography listUnStyled className="mb-0">
                        <ul className="list-group list-group-light list-group-small">
                            {userList.map((user, index) => (
                                <li key={index} className="list-group-item">
                                    <a href="#!" className="d-flex justify-content-between">
                                        <div className="d-flex flex-row">
                                            <img
                                                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-8.webp"
                                                alt="avatar"
                                                className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                                                width="60"
                                            />
                                            <div className="pt-1">
                                                <p className="fw-bold mb-0">{user.name}</p>
                                                <p className="small text-muted">
                                                </p>
                                            </div>
                                        </div>
                                        <div className="pt-1">
                                            <p className="small text-muted mb-1">{user.actionTime}</p>
                                        </div>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </MDBTypography>
                </MDBCardBody>
            </MDBCard>
        </MDBCol>
);
}
