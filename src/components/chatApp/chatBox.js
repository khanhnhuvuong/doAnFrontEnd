import React, {useEffect, useRef, useState} from "react";
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

export default function ChatBox(props) {
    const { chatContent } = props;
    const chatBoxRef = useRef(null);

    useEffect(() => {
        // tu dong cuon xuong cuoi
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [chatContent]);

    let sortedChatContent = [];
    if (Array.isArray(chatContent)) {
        sortedChatContent = [...chatContent].sort((a, b) => {
            const timeA = new Date(a.createAt).getTime();
            const timeB = new Date(b.createAt).getTime();
            return timeA - timeB;
        });
    }

    return (
        <MDBTypography listUnStyled style={{height:"432px", width: "900px", overflow: "scroll", marginTop: '102px'}} ref={chatBoxRef}>
            <ul>
                {sortedChatContent.map((mess, index) => (
                    <div key={index} style={{ width: '750px' }}>
                        {mess.name === sessionStorage.getItem('user') ? (
                            <li className="d-flex mb-3">
                                <MDBCardBody className="p-0 m-lg-1">
                                    <div className="d-flex"
                                         style={{marginLeft: '537px'}}>
                                        <p className="small mb-1 text-muted"
                                        >{mess.createAt} -</p>
                                        <p className="small mb-1 fw-bold"
                                           style={{marginLeft: '5px'}}>{mess.name}</p>
                                    </div>
                                    <div className="d-flex flex-row justify-content-end mb-4 pt-1">
                                        <div>
                                            <p className="small p-2 me-3 mb-3 text-white rounded-3 btn-primary">
                                                {mess.mes}
                                            </p>
                                        </div>
                                        <img
                                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                                            alt="avatar 1"
                                            style={{ width: "45px", height: "100%" }}
                                        />
                                    </div>
                                </MDBCardBody>
                            </li>
                        ) : (
                            <li className="d-flex mb-4">
                                <MDBCardBody className="p-0 m-lg-1">
                                    <div className="d-flex">
                                        <p className="small mb-1 fw-bold ">{mess.name} -</p>
                                        <p className="small mb-1 text-muted"
                                           style={{marginLeft: '5px'}}>{mess.createAt}</p>
                                    </div>
                                    <div className="d-flex flex-row justify-content-start">
                                        <img
                                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava5-bg.webp"
                                            alt="avatar 1"
                                            style={{ width: "45px", height: "100%" }}
                                        />
                                        <div>
                                            <p
                                                className="small p-2 ms-3 mb-3 rounded-3"
                                                style={{ backgroundColor: "#f5f6f7" }}
                                            >
                                                {mess.mes}
                                            </p>
                                        </div>
                                    </div>
                                </MDBCardBody>
                            </li>
                        )}
                    </div>
                ))}
            </ul>
        </MDBTypography>
    );
}