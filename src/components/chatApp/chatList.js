import { UserAddOutlined, UsergroupAddOutlined, WarningFilled } from '@ant-design/icons';
import { Alert, Button, Form, Input, Modal } from 'antd';
import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import './chatApp.css';

import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCol,
    MDBInput,
    MDBTypography
} from "mdb-react-ui-kit";

export default function ChatList({ handleClickMess, userList, selectedUser }) {
    const [socket, setSocket] = useState(null);
    const history = useHistory();
    // const location = useLocation();

    const [isChecked, setIsChecked] = useState(false); // Thêm state để lưu trữ trạng thái của checkbox
    const [roomName, setRoomName] = useState(""); // Thêm state để lưu trữ tên phòng chat mới
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    //join chat
    const [isModalJoinRoomOpen, setisModalJoinRoomOpen] = useState(false);
    //add groups chat
    const [isModalOpen, setIsModalOpen] = useState(false);
    const API_URL = "ws://140.238.54.136:8080/chat/chat";

    const showModalJoinRoom = () => {
        setisModalJoinRoomOpen(true);
    }
    const handleJoinRoomCancel = () => {
        setisModalJoinRoomOpen(false);
        form.resetFields();
    };
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
    };

    const [form] = Form.useForm();

    // const [selectedUser, setSelectedUser] = useState(null);


    // if search null => show all user
    useEffect(() => {
        if (searchQuery === "") {
            setSearchResults(userList);
        }
    }, [searchQuery, userList]);



    const handleLogout = () => {
        //Gửi yêu cầu đăng xuất đến server WebSocket
        const requestData = {
            action: "onchat",
            data: {
                event: "LOGOUT",
            },
        };
        socket.send(JSON.stringify(requestData));
        console.log("gui yeu cau logout thanh cong");
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("relogin_code");
        history.push("/");
    };

    useEffect(() => {
        onLoad();
    }, []);


    const onLoad = () => {
        // Khởi tạo kết nối với server qua websocket
        const socket = new WebSocket(API_URL);
        socket.addEventListener("open", () => {
            console.log("WebSocket connection established.");
            const username = sessionStorage.getItem('user');
            const code = sessionStorage.getItem('code');

            // Gửi message RE_LOGIN để đăng nhập lại với thông tin user và code
            socket.send(JSON.stringify({
                action: "onchat",
                data: {
                    event: "RE_LOGIN",
                    data: {
                        user: username,
                        code: code,
                    }
                }
            }
            ));

            socket.onmessage = (event) => {
                const response = JSON.parse(event.data);
                if (response.status === 'success' && response.event === 'GET_USER_LIST') {
                    const newRoom = response.data;
                    setRoomName(newRoom);
                }
            }
            setSocket(socket);
        });

        // Đóng kết nối khi component unmount
        return () => {
            socket.close();
        };
    }
    // create room
    const createRoom = () => {
        console.log("create room");

        const roomName = document.getElementById('roomName').value;
        // login after create room
        login();
        // Gửi message RE_LOGIN để đăng nhập lại với thông tin user và code
        socket.send(JSON.stringify({
            action: "onchat",
            data: {
                event: "CREATE_ROOM",
                data: {
                    name: roomName
                }
            }
        }
        ));

        socket.onmessage = (event) => {
            const response = JSON.parse(event.data);
            console.log(response);
            if(response.status === 'success' && response.event === 'CREATE_ROOM'){
                <Alert message="Create room successfull!" type="success" showIcon />;
                alert("Create room successfull!");
                const room = {
                    id: response.data.id,
                    name: response.data.name,
                    type: 1,
                    // time now
                    actionTime:  new Date().toLocaleString(),
                };
                setSearchResults([...searchResults, room]);

                // hide modal
                form.resetFields();
                setIsModalOpen(false);
            }

        }
    }

    // join room
    const joinRoom = () => {
        console.log("join room");
        const roomName = document.getElementById('roomName').value;
        console.log(roomName);
        // login after create room
        login();
        // Gửi message RE_LOGIN để đăng nhập lại với thông tin user và code
        socket.send(JSON.stringify({
            action: "onchat",
            data: {
                event: "JOIN_ROOM",
                data: {
                    name: roomName
                }
            }
        }
        ));

        socket.onmessage = (event) => {
            const response = JSON.parse(event.data);
            console.log(response);
            if (response.status === 'success' && response.event === 'JOIN_ROOM') {
                <Alert message="Join room successfull!" type="success" showIcon />;
                alert("Join room successfull!");
                const room = {
                    id: response.data.id,
                    name: response.data.name,
                    type: 1,
                    // time now
                    actionTime: new Date().toLocaleString(),
                };
                setSearchResults([...searchResults, room]);

                // hide modal
                form.resetFields();
                setisModalJoinRoomOpen(false);
            }
            else if(response.status === 'error')
            {
                alert("Join room failed! please try again");
            }

        }
    }

    const login = () =>{
        // re login
        socket.send(JSON.stringify({
            action: "onchat",
            data: {
                event: "LOGIN",
                data: {
                    user: sessionStorage.getItem('user'),
                    pass: sessionStorage.getItem('pass'),
                }
            }
        }
        ));
    }


    const handleSearch = () => {
        // Tìm kiếm tin nhắn trong danh sách tin nhắn dựa trên searchQuery
        const results = userList.filter((user) =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        setSearchResults(results);
    };


    const FormStyled = styled(Form)`
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 2px 2px 2px 0;
        width: 67%;
        height: 40px;
        margin-top: 5px;
        margin-left: 5px;
        border: 1px solid rgb(230, 230, 230);
        border-radius: 0.2rem;
        .ant-form-item {
          flex: 1;
          margin-bottom: 0;
        }
        margin-right: 5px;
        background-color: buttonface;
        float: left;
    `;
    const ButtonAddFriendStyled = styled(Button)`
        float: left;
        padding-left: -100px;
        border: none !important;
        
    `;
    const ButtonStyled = styled(Button)`
        border: none;
        margin-right: -150px;
    `;
    return (
        <MDBCol md="6" lg="5" xl="4" className="mb-4 mb-md-0">
            <a className="d-flex justify-content-between">
                <div className="d-flex flex-row m-2">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/185/185846.png"
                        alt="avatar"
                        className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                        width="50"
                    />
                    <div className="pt-1" style={{ marginTop: '5px' }}>
                        <h4 className="fw-bold font mb-0">{sessionStorage.getItem('user')}</h4>
                    </div>
                </div>
                <MDBBtn style={{ height: '45px' }}
                    className='mt-2 gradient-custom-3' size='lg' onClick={handleLogout}>Đăng Xuất</MDBBtn>
            </a>
            <MDBCard>
                <MDBCardBody>
                    <div className="input-group mb-3">
                        <MDBInput
                            label="Tìm kiếm tin nhắn"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <MDBBtn
                            onClick={handleSearch}
                        >
                            Tìm kiếm
                        </MDBBtn>
                        <ButtonAddFriendStyled>
                            <Button
                                type="primary"
                                size='large'
                                icon={<UserAddOutlined />}
                                className='join-room'
                                onClick={showModalJoinRoom}>
                            </Button>
                            <Modal
                                title='Join Room'
                                open={isModalJoinRoomOpen}
                                onOk={joinRoom}
                                onCancel={handleJoinRoomCancel}
                            >
                                <Form form={form} layout='vertical'>
                                    <Form.Item label='' name='name'>
                                        <Input
                                            type='text'
                                            id="roomName"
                                            value={roomName}
                                            placeholder='Enter room name ' />
                                    </Form.Item>
                                </Form>
                            </Modal>
                        </ButtonAddFriendStyled>
                        <ButtonStyled >
                            <Button
                                type="primary"
                                size='large'
                                icon={<UsergroupAddOutlined />}
                                className='add-room'
                                onClick={showModal}
                            >
                            </Button>
                            <Modal
                                title='Create New Room'
                                open={isModalOpen}
                                onOk={createRoom}
                                onCancel={handleCancel}
                            >
                                <Form form={form} layout='vertical'>
                                    <Form.Item label='Room name' name='name'>
                                        <Input
                                            type='text'
                                            id="roomName"
                                            value={roomName}
                                            placeholder='Enter room name ' />
                                    </Form.Item>
                                </Form>
                            </Modal>
                        </ButtonStyled>

                        {/* <div className="form-check align-content-end">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckDefault"
                                checked={isChecked}
                                onChange={handleCheckboxChange} // Thêm sự kiện onChange cho checkbox
                            />
                            <label className="form-check-label" htmlFor="flexCheckDefault">Room</label>
                        </div> */}
                    </div>

                    <MDBTypography listUnStyled className="mb-0" style={{ height: "415px", overflow: "scroll" }}>
                        <ul className="list-group list-group-light list-group-small">
                            {searchResults.map((user, index) => (
                                <li key={index}
                                    className={selectedUser === user.name ? 'active' : ''}
                                    onClick={() => handleClickMess(user.name, user.type)}>
                                    <a className="d-flex justify-content-between">
                                        <div className="d-flex flex-row">
                                            {user.type == 0 ? (
                                                <img
                                                    src="https://cdn-icons-png.flaticon.com/256/147/147142.png"
                                                    alt="avatar"
                                                    className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                                                    width="50"
                                                />
                                            ) : (
                                                <img
                                                    src="https://cdn-icons-png.flaticon.com/512/5234/5234876.png"
                                                    alt="avatar"
                                                    className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                                                    width="50"
                                                />
                                            )}
                                            <div className="pt-1">
                                                <p className="fw-bold mt-3">{user.name}</p>
                                                <p className="small text-muted">
                                                </p>
                                            </div>
                                        </div>
                                        <div className="pt-1">
                                            <p className="small text-muted mt-3">{user.actionTime}</p>
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
