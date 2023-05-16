// import {MDBBtn, MDBCard, MDBCardBody, MDBCheckbox, MDBInput} from "mdb-react-ui-kit";
// import {Link} from "react-router-dom";
// import React from "react";
//
// <MDBCard className='m-5' style={{maxWidth: '600px'}}>
//     <MDBCardBody className='px-5'>
//         <h2 className="text-uppercase text-center mb-5">Đăng nhập</h2>
//         <MDBInput wrapperClass='mb-4' label='Nhập tên người dùng' size='lg' id='form1' type='text'
//                   value={user}
//                   onChange={(e) => setUser(e.target.value)}
//         />
//         <MDBInput wrapperClass='mb-4' label='Nhập mật khẩu của bạn' size='lg' id='form3' type='password'
//                   value={pass}
//                   onChange={(e) => setPass(e.target.value)}
//         />
//         <div className='d-flex flex-row justify-content-center mb-4'>
//             <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='Nhớ tài khoản'/>
//         </div>
//         <MDBBtn className='mb-4 w-100 gradient-custom-4' size='lg' onClick={handleLogin}>Đăng nhập</MDBBtn>
//         <p>Bạn chưa có tài khoản? <Link to="/register">Đăng ký</Link></p>
//     </MDBCardBody>
// </MDBCard>

// const handleLogin = () => {
//     //Gửi yêu cầu đăng nhập đến server WebSocket
//     // eslint-disable-next-line react-hooks/rules-of-hooks
//     const requestData = {
//         action: "onchat",
//         data: {
//             event: "LOGIN",
//             data: {
//                 user: user,
//                 pass: pass,
//             },
//         },
//     };
//     socket.send(JSON.stringify(requestData));
//
// };
//
// //Sau khi đăng ký thành công, set socket và lưu trữ thông tin để đăng nhập
// useEffect(() => {
//     if (socket) {
//         socket.onmessage = (event) => {
//             const responseData = JSON.parse(event.data);
//             // eslint-disable-next-line react-hooks/rules-of-hooks
//             if (responseData && responseData.status === "success") {
//                 // Đăng nhập thành công
//                 setIsLoginSuccess(true);
//                 // Lưu trữ thông tin đăng nhập, ví dụ: lưu trữ token
//                 history.push('/home');
//                 window.location.href = '/home';
//             }
//         };
//     }
// }, [socket]);
// else {
//     const requestRelogin = {
//         action: "onchat",
//         data: {
//             event: "RE_LOGIN",
//             data: {
//                 user: sessionStorage.getItem('user'),
//                 code: sessionStorage.getItem('relogin_code')
//             },
//         },
//     };
//     socket.send(JSON.stringify(requestRelogin));
//     console.log("tin nhan da duoc chon");
//     const sendMess = {
//         action: 'onchat',
//         data: {
//             event: 'SEND_CHAT',
//             data: {
//                 type: 'room',
//                 to: 'nhu',
//                 mes: 'heloooooooo ca nha',
//             }
//         },
//     };
//     socket.send(JSON.stringify(sendMess));
//     console.log("Đã gửi tin nhắn lên cho server")
//     socket.onmessage = (event) => {
//         const response = JSON.parse(event.data);
//         if (response.status === 'success' && response.event === 'RE_LOGIN') {
//             console.log("Đã relogin thành công")
//         } else {
//             console.log(response.mes)
//         }
//         if (response.status === 'success' && response.event === 'SEND_CHAT') {
//             const chatContent = response.data;
//             setChatContent(chatContent);
//             console.log(chatContent);
//         } else {
//             console.log(response.mes)
//         }
//     }


