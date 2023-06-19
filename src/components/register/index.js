import React, {useState, useEffect} from "react";
import './index.css';
import { useHistory, Link } from 'react-router-dom';
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBCheckbox, MDBAccordion
}
    from 'mdb-react-ui-kit';

function Register() {
    const [roomName, setRoomName] = useState("");
    const [socket, setSocket] = useState(null);
    const [isLoginSuccess, setIsLoginSuccess] = useState(false);
    const [error, setError] = useState("");
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");

    const history = useHistory();

    // Khi component được tạo, thiết lập kết nối WebSocket
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

    const handleRegister = () => {
        //Gửi yêu cầu đăng ký đến server WebSocket
        const requestData = {
            action: "onchat",
            data: {
                event: "REGISTER",
                data: {
                    user: user,
                    pass: pass,
                },
            },
        };
        socket.send(JSON.stringify(requestData));
    };

    //Sau khi đăng ký thành công, set socket và lưu trữ thông tin để đăng nhập
    useEffect(() => {
        if (socket) {
            socket.onmessage = (event) => {
                const responseData = JSON.parse(event.data);
                if (responseData && responseData.status === "success") {
                    // Đăng ký thành công
                    setIsLoginSuccess(true);
                    // Lưu trữ thông tin đăng nhập, ví dụ: lưu trữ token
                    history.push('/');
                    // window.location.href = '/login';
                }
                if (responseData && responseData.status === "error" &&  responseData.event === "REGISTER") {
                    setError('Tài khoản đã tồn tại')
                }
            };
        }
    }, [socket]);

    return (
        <MDBContainer fluid className='d-flex align-items-center justify-content-center'>
            <div className='mask gradient-custom-3'></div>
            <MDBCard className='m-5' style={{maxWidth: '600px'}}>
                <MDBCardBody className='px-5'>
                    <h2 className="text-uppercase text-center mb-5">Đăng ký</h2>
                    <MDBInput wrapperClass='mb-4' label='Nhập tên người dùng' size='lg' id='form1' type='text'
                              value={user}
                              onChange={(e) => setUser(e.target.value)}
                              style={{color: 'black'}}
                    />
                    <MDBInput wrapperClass='mb-4' label='Nhập mật khẩu của bạn' size='lg' id='form3' type='password'
                              value={pass}
                              onChange={(e) => setPass(e.target.value)}
                              style={{color: 'black'}}
                    />
                    <MDBBtn className='mb-4 w-100 gradient-custom-4' size='lg' onClick={handleRegister}>Đăng ký</MDBBtn>
                    <div className='d-flex flex-row justify-content-center mb-4'>
                        <p>Bạn đã có tài khoản? <Link to="/">Đăng nhập</Link></p>
                    </div>
                    {error && <p className='d-flex flex-row justify-content-center mb-4' style={{color: 'red'}}>{error}</p>}
                </MDBCardBody>
            </MDBCard>
        </MDBContainer>
    );
}

export default Register;