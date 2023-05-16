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


    return (
        <MDBCol md="6" lg="5" xl="4" className="mb-4 mb-md-0">
            <a href="#!" className="d-flex justify-content-between">
                <div className="d-flex flex-row m-3">
                    <img
                        src="data:image/png;base64,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"
                        alt="avatar"
                        className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                        width="70"
                    />
                    <div className="pt-1 mt-3">
                        <h4 className="fw-bold font mb-0">Khanh Nhu</h4>
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
                        <div class="form-check align-content-end">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                            <label class="form-check-label" for="flexCheckDefault">Room</label>
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

