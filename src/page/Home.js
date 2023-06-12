import React, { useEffect, useState } from "react";

import {MDBCol, MDBContainer, MDBRow} from "mdb-react-ui-kit";
import ChatList from "../components/chatApp/chatList";
import ChatBox from "../components/chatApp/chatBox";
import TextArea from "../components/chatApp/textArea";
import moment from "moment";

function Home() {
    const [socket, setSocket] = useState(null);
    const [selectedMess, setSelectedMess] = useState(null);
    const [userList, setUserList] = useState([]);
    const [chatContent, setChatContent] = useState([]);
    const [typeUser, setType] = useState();

    function handleClickMess(userName, type) {
        setSelectedMess(userName);
        setType(type);
        console.log(userName);

        if (type === 1) {
            const requestRelogin = {
                action: "onchat",
                data: {
                    event: "RE_LOGIN",
                    data: {
                        user: sessionStorage.getItem("user"),
                        code: sessionStorage.getItem("relogin_code"),
                    },
                },
            };
            socket.send(JSON.stringify(requestRelogin));
            console.log("tin nhan da duoc chon");
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
            console.log("Đã gửi yêu cầu lấy tin nhắn");

            socket.onmessage = (event) => {
                const response = JSON.parse(event.data);
                if (response.status === "success" && response.event === "RE_LOGIN") {
                    console.log("Đã relogin thành công");
                } else {
                    console.log(response.mes);
                }
                if (
                    response.status === "success" &&
                    response.event === "GET_ROOM_CHAT_MES"
                ) {
                    const chatContent = response.data.chatData;
                    setChatContent(chatContent);
                    console.log(chatContent);
                } else {
                    console.log(response.mes);
                }
            };
        } else {
            const requestRelogin = {
                action: "onchat",
                data: {
                    event: "RE_LOGIN",
                    data: {
                        user: sessionStorage.getItem("user"),
                        code: sessionStorage.getItem("relogin_code"),
                    },
                },
            };
            socket.send(JSON.stringify(requestRelogin));
            console.log("tin nhan da duoc chon");
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
            console.log("Đã gửi yêu cầu lấy tin nhắn");
            socket.onmessage = (event) => {
                const response = JSON.parse(event.data);
                if (response.status === "success" && response.event === "RE_LOGIN") {
                    console.log("Đã relogin thành công");
                } else {
                    console.log(response.mes);
                }
                if (
                    response.status === "success" &&
                    response.event === "GET_PEOPLE_CHAT_MES"
                ) {
                    const chatContent = response.data;
                    setChatContent(chatContent);
                    console.log(chatContent);
                } else {
                    console.log(response.mes);
                }
            };
        }
    }



    function handleSendMessage(mes) {

        if (selectedMess) {
            if(typeUser === 1){
                const requestSendMessageRoom = {
                    action: "onchat",
                    data: {
                        event: "SEND_CHAT",
                        data: {
                            type: "room",
                            to: selectedMess,
                            mes: mes,
                        },
                    },
                };
                socket.send(JSON.stringify(requestSendMessageRoom));
                console.log("gui tin nhan tu",sessionStorage.getItem('user'))
                console.log("gui tin nhan den",selectedMess)
                console.log("gui tin nhan voi noi dung",mes)
                // hien tin nhan vua gui di len chatBox
                const newChatContent = [
                    ...chatContent,
                    {
                        name: sessionStorage.getItem("user"),
                        createAt: moment(mes.createAt).format('YYYY-MM-DD HH:mm:ss'),
                        mes: mes,
                    },
                ];
                setChatContent(newChatContent);
            }
            else{
                const requestSendMessagePeople = {
                    action: "onchat",
                    data: {
                        event: "SEND_CHAT",
                        data: {
                            type: "people",
                            to: selectedMess,
                            mes: mes,
                        },
                    },
                };
                socket.send(JSON.stringify(requestSendMessagePeople));
                console.log("gui tin nhan tu",sessionStorage.getItem('user'))
                console.log("gui tin nhan den",selectedMess)
                console.log("gui tin nhan voi noi dung",mes)
                // hien tin nhan vua gui di len chatBox
                const newChatContent = [
                    ...chatContent,
                    {
                        name: sessionStorage.getItem("user"),
                        createAt: moment(mes.createAt).format('YYYY-MM-DD HH:mm:ss'),
                        mes: mes,
                    },
                ];
                setChatContent(newChatContent);
            }
        }
    }

    useEffect(() => {
        // Khởi tạo kết nối với server qua websocket
        const socket = new WebSocket("ws://140.238.54.136:8080/chat/chat");

        socket.addEventListener("open", () => {
            console.log("WebSocket connection established.");
            const username = sessionStorage.getItem("user");
            const code = sessionStorage.getItem("code");

            // Gửi message RE_LOGIN để đăng nhập lại với thông tin user và code
            socket.send(
                JSON.stringify({
                    action: "onchat",
                    data: {
                        event: "RE_LOGIN",
                        data: {
                            user: username,
                            code: code,
                        },
                    },
                })
            );

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
                <ChatList userList={userList} handleClickMess={handleClickMess} />
                {selectedMess && (
                    <MDBCol md="6" lg="7" xl="8">
                        <ChatBox selectedMess={selectedMess} chatContent={chatContent} />
                        <TextArea handleSendMessageClick={handleSendMessage} selectedMess={selectedMess} />
                    </MDBCol>
                )}
            </MDBRow>
        </MDBContainer>
    );
}

export default Home;