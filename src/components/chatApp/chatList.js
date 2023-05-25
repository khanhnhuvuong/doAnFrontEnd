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

export default function ChatList({handleClickMess}) {
    const [socket, setSocket] = useState(null);
    const history = useHistory();
    const location = useLocation();
    const userList = location.state?.userList || [];
    const [userListChat, setUserListChat] = useState([]);

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
    const handleCreateRoom = () => {
        const roomName = document.getElementById('roomName').value;
        if (roomName) {
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


    return (
        <MDBCol md="6" lg="5" xl="4" className="mb-4 mb-md-0">
            <a href="#!" className="d-flex justify-content-between">
                <div className="d-flex flex-row m-3">
                    <img
                        src="https://img6.thuthuatphanmem.vn/uploads/2022/11/18/anh-avatar-don-gian-cho-nu_081757692.jpg"
                        alt="avatar"
                        className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                        width="70"
                    />
                    <div className="pt-1 mt-3">
                        <h4 className="fw-bold font mb-0">{sessionStorage.getItem('user')}</h4>
                    </div>
                </div>
                <MDBBtn className='h-25 mt-4 gradient-custom-3' size='lg' onClick={handleLogout}>Đăng
                    Xuất</MDBBtn>
            </a>
            <MDBCard>
                <MDBCardBody>
                    <div className="input-group mb-3">
                        <MDBInput label='Nhập tên người dùng' size='lg' id='form1'
                                  type='text'
                        />
                        <button type="button" className="btn btn-primary">
                            Thêm
                        </button>
                        <div className="form-check align-content-end">
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                            <label className="form-check-label" for="flexCheckDefault">Room</label>
                        </div>
                    </div>
                    <MDBTypography listUnStyled className="mb-0" style={{height: "500px", overflow: "scroll"}}>
                        <ul className="list-group list-group-light list-group-small">
                            {userList.map((user, index) => (
                                <li key={index} className="list-group-item" onClick={() => handleClickMess(user.name, user.type)}>
                                    <a className="d-flex justify-content-between">
                                        <div className="d-flex flex-row">
                                            {user.type == 0 ? (
                                                <img
                                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBba0js-FmmQZDKqlMWoxKtzoT5Fg_mpdeMw&usqp=CAU"
                                                    alt="avatar"
                                                    className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                                                    width="60"
                                                />
                                            ) : (
                                                <img
                                                    src="https://cdn-icons-png.flaticon.com/512/166/166258.png"
                                                    alt="avatar"
                                                    className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                                                    width="60"
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



