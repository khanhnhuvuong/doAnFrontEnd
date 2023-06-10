import React, { useEffect, useState } from "react";
import './chatApp.css';
import { useHistory, Link, useLocation } from 'react-router-dom';

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

export default function ChatList({ handleClickMess }) {
    const [socket, setSocket] = useState(null);
    const history = useHistory();
    const location = useLocation();
    const userList = location.state?.userList || [];
    const [isChecked, setIsChecked] = useState(false); // Thêm state để lưu trữ trạng thái của checkbox
    const [roomName, setRoomName] = useState(""); // Thêm state để lưu trữ tên phòng chat mới
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);



    useEffect(() => {
        console.log(userList); // Đảm bảo danh sách người dùng được cập nhật
    }, [userList]);

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
    }, []);

    const handleLogout = () => {
        // Gửi yêu cầu đăng xuất đến server WebSocket
        const requestData = {
            action: "onchat",
            data: {
                event: "LOGOUT",
            },
        };

        if (socket) {
            socket.send(JSON.stringify(requestData));
        }

        history.push("/");
    };

    const handleCreateRoom = () => {
        const roomName = document.getElementById('roomName').value;

        if (roomName && socket) {
            // Gửi yêu cầu tạo phòng đến server WebSocket
            const requestData = {
                action: "onchat",
                data: {
                    event: "CREATE_ROOM",
                    data: {
                        name: roomName
                    }
                }
            };

            // Gửi requestData tới server WebSocket
            socket.send(JSON.stringify(requestData));
        }
    };

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    };

    const handleRoomNameChange = (event) => {
        setRoomName(event.target.value);
    };



    const handleSearch = () => {
        // Tìm kiếm tin nhắn trong danh sách tin nhắn dựa trên searchQuery
        const results = userList.filter((user) =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        setSearchResults(results);
    };


    return (
        <MDBCol md="6" lg="5" xl="4" className="mb-4 mb-md-0">
            <a href="#!" className="d-flex justify-content-between">
                <div className="d-flex flex-row m-2">
                    <img
                        src="https://img6.thuthuatphanmem.vn/uploads/2022/11/18/anh-avatar-don-gian-cho-nu_081757692.jpg"
                        alt="avatar"
                        className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                        width="50"
                    />
                    <div className="pt-1" style={{marginTop: '5px'}}>
                        <h4 className="fw-bold font mb-0">{sessionStorage.getItem('user')}</h4>
                    </div>
                </div>
                <MDBBtn style={{height: '45px'}}
                        className='mt-2 gradient-custom-3' size='lg' onClick={handleLogout}>Đăng Xuất</MDBBtn>
            </a>
            <MDBCard>
                <MDBCardBody>
                    <div className="input-group mb-3">
                        <MDBInput
                            label="Nhập tên người dùng"
                            size="lg"
                            id="roomName"
                            type="text"
                            value={roomName}
                            onChange={handleRoomNameChange} // Thêm sự kiện onChange để cập nhật tên phòng chat
                        />

                        <button type="button" className="btn btn-primary" onClick={handleCreateRoom}>
                            Thêm
                        </button>

                        <MDBInput
                            label="Tìm kiếm tin nhắn"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />

                        {searchResults.map((result, index) => (
                            <li key={index}>{result.name}</li>
                        ))}

                        <MDBBtn onClick={handleSearch}>Tìm kiếm</MDBBtn>

                        {/*<MDBInput*/}
                        {/*    label="Tìm kiếm tin nhắn"*/}
                        {/*    value={searchQuery}*/}
                        {/*    onChange={(e) => {*/}
                        {/*        setSearchQuery(e.target.value);*/}
                        {/*        handleSearch();*/}
                        {/*    }}*/}
                        {/*/>*/}

                        <div className="form-check align-content-end">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckDefault"
                                checked={isChecked}
                                onChange={handleCheckboxChange} // Thêm sự kiện onChange cho checkbox
                            />
                            <label className="form-check-label" htmlFor="flexCheckDefault">Room</label>
                        </div>

                        <MDBInput
                            label="Tìm kiếm tin nhắn"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />

                        {searchResults.map((result, index) => (
                            <li key={index}>{result.name}</li>
                        ))}

                        <MDBBtn onClick={handleSearch}>Tìm kiếm</MDBBtn>

                        {/*<MDBInput*/}
                        {/*    label="Tìm kiếm tin nhắn"*/}
                        {/*    value={searchQuery}*/}
                        {/*    onChange={(e) => {*/}
                        {/*        setSearchQuery(e.target.value);*/}
                        {/*        handleSearch();*/}
                        {/*    }}*/}
                        {/*/>*/}

                        <div className="form-check align-content-end">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="flexCheckDefault"
                                checked={isChecked}
                                onChange={handleCheckboxChange} // Thêm sự kiện onChange cho checkbox
                            />
                            <label className="form-check-label" htmlFor="flexCheckDefault">Room</label>
                        </div>
                    </div>
                    <MDBTypography listUnStyled className="mb-0" style={{height: "415px", overflow: "scroll"}}>
                        <ul className="list-group list-group-light list-group-small">
                            {userList.map((user, index) => (
                                <li key={index} className="list-group-item" onClick={() => handleClickMess(user.name, user.type)}>
                                    <a className="d-flex justify-content-between">
                                        <div className="d-flex flex-row">
                                            {user.type === 0 ? (
                                                <img
                                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBba0js...usqp=CAU"
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
                                                <p className="small text-muted"></p>
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
            {selectedUser && (
                <div>
                    <h5>Tin nhắn đang chat với: {selectedUser.name}</h5>
                    {/* Hiển thị tin nhắn ở đây */}
                </div>
            )}
        </MDBCol>
    );
}
