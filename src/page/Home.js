import React, { useEffect, useState } from "react";

import {MDBCol, MDBContainer, MDBRow} from "mdb-react-ui-kit";
import ChatList from "../components/chatApp/chatList";
import ChatBox from "../components/chatApp/chatBox";
import TextArea from "../components/chatApp/textArea";
import moment from "moment";
import axios from "axios";


function Home() {
    const [socket, setSocket] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedType, setSelectedType] = useState(null);
    const [userList, setUserList] = useState([]);
    const [chatContent, setChatContent] = useState([]);
    const apiKey = '645f9baa9ada4f18c05d90c2526108a7';
    const [webPreview, setWebPreview] = useState(null);
    const isURL = (text) => {
        const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
        return urlPattern.test(text);
    };

    function handleClickMess(userName, type) {
        console.log(userName);
        if (type === 1) {
            setSelectedUser(userName);
            setSelectedType('room');
            const requestRelogin = {
                action: "onchat",
                data: {
                    event: "RE_LOGIN",
                    data: {
                        user: sessionStorage.getItem('user'),
                        code: sessionStorage.getItem('relogin_code')
                    },
                },
            };
            socket.send(JSON.stringify(requestRelogin));
            console.log("da gui yeu cau relogin");
            const requestRoomChatMessage = {
                action: "onchat",
                data: {
                    event: "GET_ROOM_CHAT_MES",
                    data: {
                        name: userName,
                        page: 1,
                    },
                },
            };
            socket.send(JSON.stringify(requestRoomChatMessage));
            console.log("Đã gửi yêu cầu lay tin nhan");
            socket.onmessage = (event) => {
                const response = JSON.parse(event.data);
                if (response.status === 'success' && response.event === 'RE_LOGIN') {
                    console.log("Đã relogin thành công")
                }
                if (response.status === 'success' && response.event === 'GET_ROOM_CHAT_MES') {
                    const chatContent = response.data.chatData;
                    setChatContent(chatContent);
                    console.log(chatContent);
                } else {
                    console.log(response.mes)
                }
            }
        } else {
            setSelectedType('people');
            setSelectedUser(userName);
            const requestRelogin = {
                action: "onchat",
                data: {
                    event: "RE_LOGIN",
                    data: {
                        user: sessionStorage.getItem('user'),
                        code: sessionStorage.getItem('relogin_code')
                    },
                },
            };
            socket.send(JSON.stringify(requestRelogin));
            console.log("tin nhan da duoc chon");
            setSelectedUser(userName);
            setSelectedType('people');
            const requestRoomChatMessage = {
                action: "onchat",
                data: {
                    event: "GET_PEOPLE_CHAT_MES",
                    data: {
                        name: userName,
                        page: 1,
                    },
                },
            };
            socket.send(JSON.stringify(requestRoomChatMessage));
            console.log("Đã gửi yêu cầu lay tin nhan");
            socket.onmessage = (event) => {
                const response = JSON.parse(event.data);
                if (response.status === 'success' && response.event === 'RE_LOGIN') {
                    console.log("Đã re-login thành công")
                }
                if (response.status === 'success' && response.event === 'GET_PEOPLE_CHAT_MES') {
                    const chatContent = response.data;
                    setChatContent(chatContent);
                    console.log(chatContent);
                } else {
                    console.log(response.mes)
                }
            }
        }
    }

    function handleSendMessage(mes) {
        const encodedMessage = encodeURIComponent(mes);
        const requestSendMessageRoom = {
            action: "onchat",
            data: {
                event: "SEND_CHAT",
                data: {
                    type: selectedType,
                    to: selectedUser,
                    mes: encodedMessage,
                },
            },
        };
        socket.send(JSON.stringify(requestSendMessageRoom));
        console.log("gui tin nhan tu", sessionStorage.getItem('user'))
        console.log("gui tin nhan den", selectedUser)
        console.log("gui tin nhan voi noi dung", mes)

        if (isURL(mes)) {
            // Gửi yêu cầu để lấy thông tin từ linkpreview.net
            const getLinkPreview = async (url) => {
                try {
                    const response = await axios.get(`https://api.linkpreview.net/?key=${apiKey}&q=${encodeURIComponent(url)}`);
                    return response.data;
                } catch (error) {
                    console.error('Error fetching link preview:', error);
                    return null;
                }
            };

            const previewLink = async () => {
                const preview = await getLinkPreview(mes);
                console.log('Web Preview:', preview);
                setWebPreview(preview);
            };
            previewLink();
        }

        if (selectedType === 'people') {
            const requestRoomChatMessage = {
                action: "onchat",
                data: {
                    event: "GET_PEOPLE_CHAT_MES",
                    data: {
                        name: selectedUser,
                        page: 1,
                    },
                },
            };
            socket.send(JSON.stringify(requestRoomChatMessage));
        }
        if (selectedType === 'room') {
            const requestRoomChatMessage = {
                action: "onchat",
                data: {
                    event: "GET_ROOM_CHAT_MES",
                    data: {
                        name: selectedUser,
                        page: 1,
                    },
                },
            };
            socket.send(JSON.stringify(requestRoomChatMessage));
        }
    }

    useEffect(() => {
        // Khởi tạo kết nối với server qua websocket
        const socket = new WebSocket("ws://140.238.54.136:8080/chat/chat");

        socket.addEventListener("open", () => {
            console.log("WebSocket connection established.");

            // Gửi message RE_LOGIN để đăng nhập lại với thông tin user và code
            socket.send(JSON.stringify({
                    action: "onchat",
                    data: {
                        event: "RE_LOGIN",
                        data: {
                            user: sessionStorage.getItem('user'),
                            code: sessionStorage.getItem('relogin_code')
                        },
                    },
                }
            ));
            socket.send(JSON.stringify({
                    action: "onchat",
                    data: {
                        event: "GET_USER_LIST",
                    }
                }
            ));
            socket.onmessage = (event) => {
                const response = JSON.parse(event.data);
                if (response.status === 'success' && response.event === 'RE_LOGIN') {
                    sessionStorage.setItem('relogin_code', response.data.RE_LOGIN_CODE);
                }
                if (response.status === 'success' && response.event === 'GET_ROOM_CHAT_MES') {
                    const chatContent = response.data;
                    // const chatContent = response.data.chatData;
                    setChatContent(chatContent);
                }
                if (response.status === 'success' && response.event === 'GET_PEOPLE_CHAT_MES') {
                    const chatContent = response.data;
                    setChatContent(chatContent);
                }
                if (response.status === "success" && response.event === "GET_USER_LIST") {
                    const newUserList = response.data;
                    setUserList(newUserList);
                }
            }

            setSocket(socket);
        });

        socket.addEventListener("message", (event) => {
            const message = JSON.parse(event.data);
            const { event: eventType, data } = message;

            //hien thi tin nhan vua nhan duoc len chatBox
            if (eventType === "SEND_CHAT") {
                const newChatContent = {
                    name: data.name,
                    createAt:moment( data.createAt).format('YYYY-MM-DD HH:mm:ss'),
                    mes: data.mes,
                };

                setChatContent((prevChatContent) => [
                    ...prevChatContent,
                    newChatContent,
                ]);
            }
        });

        return () => {
            socket.close();
        };
    }, []);


    return (
        <MDBContainer fluid className="py-2 gradient-custom" style={{ backgroundColor: "#eee" }}>
            <MDBRow>
                <ChatList userList={userList} handleClickMess={handleClickMess} selectedUser={selectedUser}/>
                {selectedUser && (
                    <MDBCol md="6" lg="7" xl="8">
                        <ChatBox chatContent={chatContent} selectedUser={selectedUser} webPreview={webPreview} setWebPreview={setWebPreview}/>
                        <TextArea selectedUser={selectedUser} handleSendMessage={handleSendMessage}  />
                    </MDBCol>
                )}
            </MDBRow>
        </MDBContainer>
    );
}

export default Home;