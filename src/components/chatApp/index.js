// import React, {useEffect, useState} from "react";
// import './chatApp.css';
// import {useHistory, Link} from 'react-router-dom';
//
// import {
//     MDBContainer,
//     MDBRow,
//     MDBCol,
//     MDBCard,
//     MDBCardBody,
//     MDBIcon,
//     MDBBtn,
//     MDBTypography,
//     MDBTextArea,
//     MDBCardHeader, MDBInput,
// } from "mdb-react-ui-kit";
//
// function ChatBox() {
//     const [socket, setSocket] = useState(null);
//     const history = useHistory();
//
//     const handleLogout = () => {
//         //Gửi yêu cầu đăng ký đến server WebSocket
//         const requestData = {
//             action: "onchat",
//             data: {
//                 event: "LOGOUT",
//             },
//         };
//         history.push("/");
//
//     };
//
//     return (
//         <MDBContainer fluid className="py-5 gradient-custom" style={{backgroundColor: "#eee"}}>
//             <MDBRow>
//                 <MDBCol md="6" lg="5" xl="4" className="mb-4 mb-md-0">
//                     <a href="#!" className="d-flex justify-content-between">
//                         <div className="d-flex flex-row m-3">
//                             <img
//                                 src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-8.webp"
//                                 alt="avatar"
//                                 className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
//                                 width="70"
//                             />
//                             <div className="pt-1 mt-3">
//                                 <h4 className="fw-bold font mb-0">Khanh Nhu</h4>
//                             </div>
//                         </div>
//                         <MDBBtn className='h-25 mt-4 gradient-custom-3' size='lg' onClick={handleLogout}>Đăng
//                             xuất</MDBBtn>
//                     </a>
//                     <MDBCard>
//                         <MDBCardBody>
//                             <div className="input-group mb-3 justify-content-center">
//                                 <MDBInput label='Nhập tên người dùng' size='lg' id='form1'
//                                           type='text'
//                                 />
//                                 <button type="button" className="btn btn-primary">
//                                     Thêm
//                                 </button>
//                             </div>
//                             <MDBTypography listUnStyled className="mb-0">
//                                 <li
//                                     className="p-2 border-bottom"
//                                     style={{backgroundColor: "#eee"}}
//                                 >
//                                     <a href="#!" className="d-flex justify-content-between">
//                                         <div className="d-flex flex-row">
//                                             <img
//                                                 src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-8.webp"
//                                                 alt="avatar"
//                                                 className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
//                                                 width="60"
//                                             />
//                                             <div className="pt-1">
//                                                 <p className="fw-bold mb-0">John Doe</p>
//                                                 <p className="small text-muted">
//                                                     Hello, Are you there?
//                                                 </p>
//                                             </div>
//                                         </div>
//                                         <div className="pt-1">
//                                             <p className="small text-muted mb-1">Just now</p>
//                                             <span className="badge bg-danger float-end">1</span>
//                                         </div>
//                                     </a>
//                                 </li>
//                                 <li className="p-2 border-bottom">
//                                     <a href="#!" className="d-flex justify-content-between">
//                                         <div className="d-flex flex-row">
//                                             <img
//                                                 src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-1.webp"
//                                                 alt="avatar"
//                                                 className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
//                                                 width="60"
//                                             />
//                                             <div className="pt-1">
//                                                 <p className="fw-bold mb-0">Danny Smith</p>
//                                                 <p className="small text-muted">
//                                                     Lorem ipsum dolor sit.
//                                                 </p>
//                                             </div>
//                                         </div>
//                                         <div className="pt-1">
//                                             <p className="small text-muted mb-1">5 mins ago</p>
//                                         </div>
//                                     </a>
//                                 </li>
//                                 <li className="p-2 border-bottom">
//                                     <a href="#!" className="d-flex justify-content-between">
//                                         <div className="d-flex flex-row">
//                                             <img
//                                                 src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-2.webp"
//                                                 alt="avatar"
//                                                 className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
//                                                 width="60"
//                                             />
//                                             <div className="pt-1">
//                                                 <p className="fw-bold mb-0">Alex Steward</p>
//                                                 <p className="small text-muted">
//                                                     Lorem ipsum dolor sit.
//                                                 </p>
//                                             </div>
//                                         </div>
//                                         <div className="pt-1">
//                                             <p className="small text-muted mb-1">Yesterday</p>
//                                         </div>
//                                     </a>
//                                 </li>
//                                 <li className="p-2 border-bottom">
//                                     <a href="#!" className="d-flex justify-content-between">
//                                         <div className="d-flex flex-row">
//                                             <img
//                                                 src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-3.webp"
//                                                 alt="avatar"
//                                                 className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
//                                                 width="60"
//                                             />
//                                             <div className="pt-1">
//                                                 <p className="fw-bold mb-0">Ashley Olsen</p>
//                                                 <p className="small text-muted">
//                                                     Lorem ipsum dolor sit.
//                                                 </p>
//                                             </div>
//                                         </div>
//                                         <div className="pt-1">
//                                             <p className="small text-muted mb-1">Yesterday</p>
//                                         </div>
//                                     </a>
//                                 </li>
//                                 <li className="p-2 border-bottom">
//                                     <a href="#!" className="d-flex justify-content-between">
//                                         <div className="d-flex flex-row">
//                                             <img
//                                                 src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-4.webp"
//                                                 alt="avatar"
//                                                 className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
//                                                 width="60"
//                                             />
//                                             <div className="pt-1">
//                                                 <p className="fw-bold mb-0">Kate Moss</p>
//                                                 <p className="small text-muted">
//                                                     Lorem ipsum dolor sit.
//                                                 </p>
//                                             </div>
//                                         </div>
//                                         <div className="pt-1">
//                                             <p className="small text-muted mb-1">Yesterday</p>
//                                         </div>
//                                     </a>
//                                 </li>
//                                 <li className="p-2 border-bottom">
//                                     <a href="#!" className="d-flex justify-content-between">
//                                         <div className="d-flex flex-row">
//                                             <img
//                                                 src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-5.webp"
//                                                 alt="avatar"
//                                                 className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
//                                                 width="60"
//                                             />
//                                             <div className="pt-1">
//                                                 <p className="fw-bold mb-0">Lara Croft</p>
//                                                 <p className="small text-muted">
//                                                     Lorem ipsum dolor sit.
//                                                 </p>
//                                             </div>
//                                         </div>
//                                         <div className="pt-1">
//                                             <p className="small text-muted mb-1">Yesterday</p>
//                                         </div>
//                                     </a>
//                                 </li>
//                                 <li className="p-2">
//                                     <a href="#!" className="d-flex justify-content-between">
//                                         <div className="d-flex flex-row">
//                                             <img
//                                                 src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
//                                                 alt="avatar"
//                                                 className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
//                                                 width="60"
//                                             />
//                                             <div className="pt-1">
//                                                 <p className="fw-bold mb-0">Brad Pitt</p>
//                                                 <p className="small text-muted">
//                                                     Lorem ipsum dolor sit.
//                                                 </p>
//                                             </div>
//                                         </div>
//                                         <div className="pt-1">
//                                             <p className="small text-muted mb-1">5 mins ago</p>
//                                             <span className="text-muted float-end">
//                         <MDBIcon fas icon="check"/>
//                       </span>
//                                         </div>
//                                     </a>
//                                 </li>
//                             </MDBTypography>
//                         </MDBCardBody>
//                     </MDBCard>
//                 </MDBCol>
//
//             </MDBRow>
//         </MDBContainer>
//     );
// }
//
// export default ChatBox;
import React from 'react';
import { Row, Col } from 'antd';
import Sidebar from './Sidebar';
import ChatWindow from './ChatWindow';

export default function chatApp() {
    return (
        <div>
            <Row>
                <Col span={6}>
                    <Sidebar />
                </Col>
                <Col span={18}>
                    <ChatWindow />
                </Col>
            </Row>
        </div>
    );
}
