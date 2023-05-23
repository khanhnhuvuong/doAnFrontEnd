import React, { useEffect, useState } from "react";
import {
    MDBTextArea,
    MDBBtn, MDBCardHeader, MDBCardBody, MDBCard
} from "mdb-react-ui-kit";

export default function TextArea({ handleSendMessage }) {
    const [socket, setSocket] = useState(null);
    const [mess, setMess] = useState('');
    const [chatContent, setChatContent] = useState([]);
    const [selectedMess, setSelectedMess] = useState(null);




    function handleSendMessage(userName, type) {
        setSelectedMess(userName);
        setSelectedMess(type);
        console.log(userName);
        if (type == 1) {
            // const requestRelogin = {
            //     action: "onchat",
            //     data: {
            //         event: "RE_LOGIN",
            //         data: {
            //             user: sessionStorage.getItem('user'),
            //             code: sessionStorage.getItem('relogin_code')
            //         },
            //     },
            // };
            // socket.send(JSON.stringify(requestRelogin));
            // console.log("re login");
            const messageRoom = {
                action: "onchat",
                data: {
                    event: "SEND_CHAT",
                    data: {
                        type: "room",
                        to: "abc", // Thay "abc" bằng username người nhận
                        mes: mess
                    }
                }
            };

            console.log(" gui tin nhắn den phong", messageRoom);
            setMess('');
            console.log("Đã gửi tin nhắn tu", sessionStorage.getItem('user'));
            console.log("Đã gửi tin nhắn den", userName);
            console.log("Đã gửi tin nhắn voi noi dung", mess);
            socket.send(JSON.stringify(messageRoom));
            console.log("Đã gửi yêu cầu gui tin nhan");
            socket.onmessage = (event) => {
                const response = JSON.parse(event.data);
                if (response.status === 'success' && response.event === 'SEND_CHAT') {
                    const chatContent = response.data.chatData;
                    setChatContent(chatContent);
                    console.log("The server has received the message");
                } else {
                    console.log("The server has not received the message");
                }
            };

        } else {

            // const requestRelogin = {
            //     action: "onchat",
            //     data: {
            //         event: "RE_LOGIN",
            //         data: {
            //             user: sessionStorage.getItem('user'),
            //             code: sessionStorage.getItem('relogin_code')
            //         },
            //     },
            // };
            // socket.send(JSON.stringify(requestRelogin));
            // console.log("tin nhan da duoc chon");
            const messagePeople = {
                action: "onchat",
                data: {
                    event: "SEND_CHAT",
                    data: {
                        type: "people",
                        to: "ti", // Thay "ti" bằng username người nhận
                        mes: mess
                    }
                }
            };

            console.log("Đã gửi yeu cau  tin nhắn di den user", messagePeople);
            setMess('');
            console.log("Đã gửi tin nhắn tu", sessionStorage.getItem('user'));
            console.log("Đã gửi tin nhắn den", userName);
            console.log("Đã gửi tin nhắn voi noi dung", mess);
            socket.send(JSON.stringify(messagePeople));
            console.log("Đã gửi yêu cầu gui tin nhan");
            socket.onmessage = (event) => {
                const response = JSON.parse(event.data);
                if (response.status === 'success' && response.event === 'SEND_CHAT') {
                    const chatContent = response.data.chatData;
                    setChatContent(chatContent);
                    console.log("The server has received the message");
                } else {
                    console.log("The server has not received the message");
                }
            };

        }

    }

    useEffect(() => {
        const newSocket = new WebSocket("ws://140.238.54.136:8080/chat/chat");


        newSocket.addEventListener("open", (event) => {
            console.log("WebSocket connection has been established", event);
            setSocket(newSocket);
        });

        newSocket.addEventListener("message", (event) => {
            const message = JSON.parse(event.data);
            console.log("Received message from server:", message);
            // Xử lý tin nhắn từ server và cập nhật chatContent
            setChatContent(prevChatContent => [...prevChatContent, message]);

        });

        return () => {
            // Đóng kết nối WebSocket khi component bị unmount
            newSocket.close();
        };
    }, []);
    // function handleSendMess(userName, type) {
    //     setSelectedMess(userName);
    //     setSelectedMess(type);
    //     console.log(userName);
    //     if (type == 1) {
    // const handleSendMessageClick = () => {
    //     if (socket && mess) {
    //         const message = {
    //             action: "onchat",
    //             data: {
    //                 event: "SEND_CHAT",
    //                 data: {
    //                     type: "room",
    //                     to: userName, // Thay "ti" bằng username người nhận
    //                     mes: mess
    //                 }
    //             }
    //         };
    //
    //         socket.send(JSON.stringify(message));
    //         console.log("Đã gửi yeu cau  tin nhắn di", message);
    //         setMess('');
    //         console.log("Đã gửi tin nhắn tu", sessionStorage.getItem('user'));
    //         console.log("Đã gửi tin nhắn den", userName);
    //         console.log("Đã gửi tin nhắn voi mess", mess);
    //     }}
    //     }
    // };


    // useEffect(() => {
    //     // Khởi tạo kết nối với server qua websocket
    //     const socket = new WebSocket("ws://140.238.54.136:8080/chat/chat");
    //
    //     socket.addEventListener("open", () => {
    //         console.log("WebSocket connection established.");
    //         const username = sessionStorage.getItem('user');
    //         const code = sessionStorage.getItem('code');
    //
    //         // // Gửi message RE_LOGIN để đăng nhập lại với thông tin user và code
    //         // socket.send(JSON.stringify({
    //         //         action: "onchat",
    //         //         data: {
    //         //             event: "RE_LOGIN",
    //         //             data: {
    //         //                 user: username,
    //         //                 code: code,
    //         //             }
    //         //         }
    //         //     }
    //         // ));
    //
    //         setSocket(socket);
    //     });
    //
    //     // Đóng kết nối khi component unmount
    //     return () => {
    //         socket.close();
    //     };
    // }, []);


    return (
        <>
            <MDBTextArea
                label="Message"
                id="textAreaExample"
                rows={4}
                value={mess}
                onChange={(e) => setMess(e.target.value)}
            />
            <MDBBtn color="info" rounded className="float-end" onClick={handleSendMessage}>
                Send
            </MDBBtn>

            {chatContent.map((message, index) => (
                <div key={index} style={{ width: '800px' }}>
                    {message.name === sessionStorage.getItem('user') ? (
                        <li style={{ textAlign: 'right' }} className="d-flex mb-3">
                            <MDBCard style={{ width: '800px' }}>
                                <MDBCardHeader className="d-flex p-3">
                                    <p className="fw-bold mb-0">{message.name}</p>
                                    <p className="text-muted small mb-0" style={{ marginLeft: '460px' }}>
                                        {message.createAt}
                                    </p>
                                </MDBCardHeader>
                                <MDBCardBody>
                                    <p className="mb-0">
                                        {message.mes}
                                    </p>
                                </MDBCardBody>
                            </MDBCard>
                            <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                                alt="avatar"
                                className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                                width="60"
                                style={{ marginLeft: '20px' }}
                            />
                        </li>
                    ) : (
                        <li className="d-flex mb-4">
                            <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                                alt="avatar"
                                className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                                width="60"
                            />
                            <MDBCard style={{ width: '700px' }}>
                                <MDBCardHeader className="d-flex p-3">
                                    <p className="fw-bold mb-0">{message.name}</p>
                                    <p className="text-muted small mb-0" style={{ marginLeft: '460px' }}>
                                        {message.createAt}
                                    </p>
                                </MDBCardHeader>
                                <MDBCardBody>
                                    <p className="mb-0">
                                        {message.mes}
                                    </p>
                                </MDBCardBody>
                            </MDBCard>
                        </li>
                    )}
                </div>
            ))}
        </>
    );
}
