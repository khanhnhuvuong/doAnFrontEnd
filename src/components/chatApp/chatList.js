import React, {useEffect, useRef, useState} from "react";
import './chatApp.css';
import {useHistory, Link, useLocation} from 'react-router-dom';

import {
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBBtn,
    MDBTypography,
    MDBInput,
} from "mdb-react-ui-kit";

export default function ChatList({handleClickMess, handleCreateRoom, userList, handleJoinRoom, selectedUser}) {
    const [socket, setSocket] = useState(null);
    const history = useHistory();
    const [roomName, setRoomName] = useState('');
    const [exRooms, setExRooms] = useState([]); // Danh sách phòng tồn tại
    const [roomExists, setRoomExists] = useState(false);
    const activeRoomRef = useRef(null);

    useEffect(() => {
        // Scroll to the active room when it changes
        if (activeRoomRef.current) {
            activeRoomRef.current.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
            });
        }
    }, [selectedUser]);

    const handleLogout = () => {
        //Gửi yêu cầu đăng ký đến server WebSocket
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

    function handleClickCreate() {
        if (roomName !== '') {
            const roomExists = exRooms.includes(roomName);
            if (roomExists) {
                setRoomExists(true);
            } else {
                handleCreateRoom(roomName);
                setRoomName('');
            }
        }
    }


    function handleClickJoin() {
        if (roomName !== '') {
            handleJoinRoom(roomName);
            setRoomName('');
        }
    }

    useEffect(() => {
        // Khởi tạo kết nối với server qua websocket
        const socket = new WebSocket("ws://140.238.54.136:8080/chat/chat");

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
                    const listRoom = response.data;
                    setExRooms(listRoom);
                }
            }
            setSocket(socket);
        });

        // Đóng kết nối khi component unmount
        return () => {
            socket.close();
        };
    }, []);

    return (
        <MDBCol md="6" lg="5" xl="4" className="mb-4 mb-md-0">
            <a className="d-flex justify-content-between">
                <div className="d-flex flex-row m-2">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/185/185846.png"
                        alt="avatar"
                        className="rounded-circle d-flex align-self-center me-3 shadow-1-strong mb-1"
                        width="50"
                    />
                    <div className="pt-1"
                         style={{marginTop: '5px'}}>
                        <h4 className="fw-bold font mb-0" style={{color: '#3b71ca'}}>{sessionStorage.getItem('user')}</h4>
                    </div>
                </div>
                <MDBBtn style={{height: '45px', backgroundColor: '#3b71ca'}}
                        className='mt-2'  size='lg' onClick={handleLogout}>Đăng
                    Xuất</MDBBtn>
            </a>
            <MDBCard>
                <MDBCardBody>
                    <div className="input-group mb-3">
                        <MDBInput label='Nhập tên phòng'
                                  value={roomName}
                                  onChange={(e) => setRoomName(e.target.value)}
                                  style={{width: '150px', color: 'black'}}
                        />
                        <button type="button" className="btn btn-primary" onClick={handleClickCreate} >
                            <i className="fas fa-plus"></i>
                        </button>
                        <button style={{marginLeft: '5px'}} type="button" className="btn btn-primary" onClick={handleClickJoin}>
                            <i className="fas fa-arrow-right-to-bracket"></i>
                        </button>
                        <button style={{marginLeft: '5px'}} type="button" className="btn btn-primary" onClick={handleClickCreate}>
                            <i className="fas fa-magnifying-glass"></i>
                        </button>
                    </div>
                    <MDBTypography listUnStyled className="mb-0" style={{height: "415px", overflow: "scroll"}}>
                        <ul className="list-group list-group-light list-group-small">
                            {userList.map((user, index) => (
                                <li key={index}
                                    className={selectedUser === user.name ? 'active' : ''}
                                    onClick={() => handleClickMess(user.name, user.type)}
                                    ref={selectedUser === user.name ? activeRoomRef : null}>
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
                                                <p className="fw-bold mt-3" style={{color: '#3b71ca'}}>{user.name}</p>
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

