import React, {useEffect, useState} from "react";

import {MDBCol, MDBContainer, MDBRow} from "mdb-react-ui-kit";
import ChatList from "../components/chatApp/chatList";
import ChatBox from "../components/chatApp/chatBox";
import TextArea from "../components/chatApp/textArea";
import moment from "moment";
import axios from "axios";
import {getStorage, ref, uploadString, getDownloadURL} from "firebase/storage";
import {initializeApp} from "firebase/app";


function Home() {
    const [socket, setSocket] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedType, setSelectedType] = useState(null);
    const [userList, setUserList] = useState([]);
    const [chatContent, setChatContent] = useState([]);
    const apiKey = '645f9baa9ada4f18c05d90c2526108a7';
    const [webPreview, setWebPreview] = useState({});
    const [isOnline, setIsOnline] = useState(null);
    const firebaseConfig = {
        apiKey: "AIzaSyCaOLY5fIOYCW2NBSZkkaY9Dt3QJhp7J8Y",
        authDomain: "appchat-efb9e.firebaseapp.com",
        projectId: "appchat-efb9e",
        storageBucket: "appchat-efb9e.appspot.com",
        messagingSenderId: "809554332860",
        appId: "1:809554332860:web:667caf7cfd4c41021d94b9"
    };

    //Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const storage = getStorage(app);

    function handleCreateRoom(roomName) {
        const chatData = {
            action: 'onchat',
            data: {
                event: 'CREATE_ROOM',
                data: {
                    name: roomName, // Tên phòng từ người dùng nhập vào
                }
            },
        };
        socket.send(JSON.stringify(chatData));
        console.log("Đã gửi tin nhắn lên cho server");
        setSelectedUser(roomName);
        const requestListUser = {
            action: 'onchat',
            data: {
                event: 'GET_USER_LIST',
            },
        };
        socket.send(JSON.stringify(requestListUser));
    }

    function handleJoinRoom(roomName) {
        const chatData = {
            action: 'onchat',
            data: {
                event: 'JOIN_ROOM',
                data: {
                    name: roomName, // Tên phòng từ người dùng nhập vào
                }
            },
        };
        socket.send(JSON.stringify(chatData));
        console.log("Gửi yêu cầu thành công");
        const requestListUser = {
            action: 'onchat',
            data: {
                event: 'GET_USER_LIST',
            },
        };
        socket.send(JSON.stringify(requestListUser));
    }

    const isURL = (text) => {
        const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
        return urlPattern.test(text);
    };

    function checkUserStatus(userName) {
        const requestRelogin = {
            action: "onchat",
            data: {
                event: "RE_LOGIN",
                data: {
                    user: sessionStorage.getItem('user'),
                    code: btoa(sessionStorage.getItem('relogin_code'))
                },
            },
        };
        socket.send(JSON.stringify(requestRelogin));
        const requestCheckUser = {
            action: "onchat",
            data: {
                event: "CHECK_USER",
                data: {
                    user: userName,
                },
            },
        };
        socket.send(JSON.stringify(requestCheckUser));
    }


    function handleClickMess(userName, type) {
        console.log(userName);
        if (type == 1) {
            setSelectedUser(userName);
            setSelectedType('room');
            const requestRelogin = {
                action: "onchat",
                data: {
                    event: "RE_LOGIN",
                    data: {
                        user: sessionStorage.getItem('user'),
                        code: btoa(sessionStorage.getItem('relogin_code'))
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
            // socket.onmessage = (event) => {
            //     const response = JSON.parse(event.data);
            //     if (response.status === 'success' && response.event === 'RE_LOGIN') {
            //         console.log("Đã relogin thành công")
            //     }
            //     if (response.status === 'success' && response.event === 'GET_ROOM_CHAT_MES') {
            //         const chatContent = response.data.chatData;
            //         setChatContent(chatContent);
            //         console.log(chatContent);
            //     } else {
            //         console.log(response.mes)
            //     }
            // }

        } else {
            setSelectedType('people');
            setSelectedUser(userName);
            const requestRelogin = {
                action: "onchat",
                data: {
                    event: "RE_LOGIN",
                    data: {
                        user: sessionStorage.getItem('user'),
                        code: btoa(sessionStorage.getItem('relogin_code'))
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
            checkUserStatus(userName);
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
        console.log("gui tin nhan den", selectedUser)
        console.log("gui tin nhan voi noi dung", mes)

        const requestWebPreview = (url) => {
            // Gửi yêu cầu để lấy thông tin web preview từ url bằng Axios
            axios
                .get(`https://api.linkpreview.net/?key=${apiKey}&q=${encodeURIComponent(url)}`)
                .then((response) => {
                    const preview = response.data;
                    console.log("Web Preview:", preview);
                    // Cập nhật thông tin web preview vào state webPreview với key là đường link (mes)
                    // setWebPreview((prevWebPreview) => ({
                    //     ...prevWebPreview,
                    //     [url]: preview,
                    // }));
                    // Lưu thông tin web preview vào Firebase Storage
                    const firebaseApp = initializeApp(firebaseConfig);
                    const storage = getStorage(firebaseApp);
                    const storageRef = ref(storage, "webprevies/" + preview.url + ".json"); // Sử dụng child() để tạo thư mục con

                    // Chuyển đổi đối tượng preview thành chuỗi JSON
                    const previewJSON = JSON.stringify(preview);
                    uploadString(storageRef, previewJSON, "raw")
                        .then(() => {
                            console.log("Web preview uploaded to Firebase Storage");
                        })
                        .catch((error) => {
                            console.error("Error uploading web preview to Firebase Storage:", error);
                        });

                    setWebPreview((prevWebPreview) => ({
                        ...prevWebPreview,
                        [url]: preview,
                    }));
                })
                .catch((error) => {
                        console.error("Error fetching link preview:", error);
                    }
                );
        };

        if (isURL(mes)) {
            if (webPreview[mes]) {
                // Đường link đã tồn tại trong webPreview, sử dụng thông tin web preview đã lưu trữ
                console.log('Web Preview:', webPreview[mes]);
            } else {
                // Đường link chưa tồn tại trong webPreview, gửi yêu cầu để lấy thông tin từ API
                requestWebPreview(mes);
            }
        }


        if (selectedType == 'people') {
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
        if (selectedType == 'room') {
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
                            code: atob(sessionStorage.getItem('relogin_code'))
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
                    sessionStorage.setItem('relogin_code', btoa(response.data.RE_LOGIN_CODE));
                }
                if (response.status === 'success' && response.event === 'GET_ROOM_CHAT_MES') {
                    const chatContent = response.data.chatData;
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
                if (response.status === "success" && response.event === "CHECK_USER") {
                    const status = response.data.status;
                    console.log(status);
                    setIsOnline(status);
                }
            }

            setSocket(socket);
        });

        socket.addEventListener("message", (event) => {
            const message = JSON.parse(event.data);
            const {event: eventType, data} = message;

            //hien thi tin nhan vua nhan duoc len chatBox
            if (eventType === "SEND_CHAT") {
                const newChatContent = {
                    name: data.name,
                    createAt: moment(data.createAt).format('YYYY-MM-DD HH:mm:ss'),
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
        <MDBContainer fluid className="py-2 gradient-custom" style={{backgroundColor: "#eee"}}>
            <MDBRow>
                <ChatList userList={userList} handleClickMess={handleClickMess} selectedUser={selectedUser}
                          handleCreateRoom={handleCreateRoom} handleJoinRoom={handleJoinRoom}
                          setSelectedUser={setSelectedUser}/>
                {selectedUser && (
                    <MDBCol md="6" lg="7" xl="8">
                        <ChatBox chatContent={chatContent} selectedUser={selectedUser} webPreview={webPreview}
                                 setWebPreview={setWebPreview} isOnline={isOnline}/>
                        <TextArea selectedUser={selectedUser} handleSendMessage={handleSendMessage}/>
                    </MDBCol>
                )}
            </MDBRow>
        </MDBContainer>
    );
}

export default Home;