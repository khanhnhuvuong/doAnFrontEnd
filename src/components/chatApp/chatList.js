import { UserAddOutlined, UsergroupAddOutlined, WarningFilled } from '@ant-design/icons';
import { Button, Form, Input, Modal } from 'antd';
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

export default function ChatList({ handleClickMess, userList, selectedUser, handleCreateRoom, handleJoinRoom }) {
    const [socket, setSocket] = useState(null);
    const history = useHistory();
    const [roomName, setRoomName] = useState(""); // Thêm state để lưu trữ tên phòng chat mới
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    // const [data, setData] = useState("Loading...");
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


    function handleClickCreate() {
        if (roomName !== '') {
            handleCreateRoom(roomName);
            setRoomName('');
        }
    }
    function handleClickJoin() {
        if (roomName !== '') {
            handleJoinRoom(roomName);
            setRoomName('');

        }


        const login = () => {
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



 
    return (
  
        <MDBCol md="6" lg="5" xl="4" className="mb-4 mb-md-0">
            <a className="d-flex justify-content-between">
                <div className="d-flex flex-row m-2">
                    <img
                        src="https://khoinguonsangtao.vn/wp-content/uploads/2022/07/avatar-gau-cute.jpg"
                        alt="avatar"
                        className="rounded-circle d-flex align-self-center me-3 shadow-1-strong mb-1"
                        width="50"
                    />
                    <div className="pt-1"
                         style={{marginTop: '5px'}}>
                        <h4 className="fw-bold font mb-0">Khanh Nhu</h4>
                    </div>
                </div>
                <MDBBtn style={{height: '45px'}}
                        className='mt-2 gradient-custom-3' size='lg' onClick={handleLogout}>Đăng
                    Xuất</MDBBtn>
            </a>
            <MDBCard>
                <MDBCardBody>
                    <div className="input-group mb-3">
                        <MDBInput label='Nhập tên người dùng'
                                  value={roomName}
                                  onChange={(e) => setRoomName(e.target.value)}
                                  style={{width: '180px'}}
                        />
                        <button type="button" className="btn btn-primary" onClick={handleClickCreate}>
                            <i className="fas fa-plus"></i>
                        </button>
                        <button style={{marginLeft: '5px'}} type="button" className="btn btn-primary" onClick={handleClickJoin}>
                            <i className="fas fa-arrow-right-to-bracket"></i>
                        </button>
                        {/*<div class="form-check align-content-end">*/}
                        {/*    <input class="form-check-input"*/}
                        {/*           style={{marginLeft: '5px'}}*/}
                        {/*           type="checkbox" value="" id="flexCheckDefault" />*/}
                        {/*    <label class="form-check-label" for="flexCheckDefault">Room</label>*/}
                        {/*</div>*/}
                    </div>
                    <MDBTypography listUnStyled className="mb-0" style={{height: "415px", overflow: "scroll"}}>
                        <ul className="list-group list-group-light list-group-small">
                            {userList.map((user, index) => (
                                <li key={index}
                                    className={selectedUser === user.name ? 'active' : ''}
                                    onClick={() => handleClickMess(user.name, user.type)}>
                                    <a className="d-flex justify-content-between">
                                        <div className="d-flex flex-row">
                                            {user.type == 0 ? (
                                                <img
                                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBba0js-FmmQZDKqlMWoxKtzoT5Fg_mpdeMw&usqp=CAU"
                                                    alt="avatar"
                                                    className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                                                    width="50"
                                                />
                                            ) : (
                                                <img
                                                    src="https://cdn-icons-png.flaticon.com/512/166/166258.png"
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
}