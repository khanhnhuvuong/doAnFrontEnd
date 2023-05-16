import React, {useEffect, useState} from "react";
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
    MDBCardHeader,
} from "mdb-react-ui-kit";
import TextArea from "./textArea";

export default function ChatBox(props, {handleSendMessage}) {
    const [selectedMess, setSelectedMess] = useState(null);
    const {chatContent} = props;
    const [mess, setMess] = useState('');

    //Click để tải lên được tin nhắn của người dùng
    useEffect(() => {
        if (selectedMess) {

        }
    }, [selectedMess]);

    return (
        <MDBCol md="6" lg="7" xl="8">
            <MDBTypography listUnStyled>
                <ul>
                    {chatContent.map((mess, index) => (
                        <div key={index} style={{width: '800px'}}>
                            {mess.name === sessionStorage.getItem('user') ? (
                                <li style={{textAlign: 'right'}} className="d-flex mb-3">
                                    <MDBCard style={{width: '800px'}}>
                                        <MDBCardHeader className="d-flex p-3">
                                            <p className="fw-bold mb-0">{mess.name}</p>
                                            <p className="text-muted small mb-0" style={{marginLeft: '460px'}}>
                                                {mess.createAt}
                                            </p>
                                        </MDBCardHeader>
                                        <MDBCardBody>
                                            <p className="mb-0">
                                                {mess.mes}
                                            </p>
                                        </MDBCardBody>
                                    </MDBCard>
                                    <img
                                        src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                                        alt="avatar"
                                        className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                                        width="60"
                                        style={{marginLeft: '20px'}}
                                    />
                                </li>
                            ) : (
                                <li className="d-flex mb-4">
                                    <img
                                        src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                                        alt="avatar"
                                        className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                                        width="60"
                                    />
                                    <MDBCard style={{width: '700px'}}>
                                        <MDBCardHeader className="d-flex p-3">
                                            <p className="fw-bold mb-0">{mess.name}</p>
                                            <p className="text-muted small mb-0" style={{marginLeft: '460px'}}>
                                                {mess.createAt}
                                            </p>
                                        </MDBCardHeader>
                                        <MDBCardBody>
                                            <p className="mb-0">
                                                {mess.mes}
                                            </p>
                                        </MDBCardBody>
                                    </MDBCard>
                                </li>
                            )}
                        </div>
                    ))}
                </ul>
               <TextArea/>
            </MDBTypography>
        </MDBCol>

    );
}