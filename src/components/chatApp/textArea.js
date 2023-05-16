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

export default function TextArea({handleSendMessage}) {
    const [socket, setSocket] = useState(null);
    const [mess, setMess] = useState('');
    const [selectedMess, setSelectedMess] = useState(null);


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

    return (
        <><MDBTextArea
            label="Message"
            id="textAreaExample"
            rows={4}
            value={mess}
            onChange={(e) => setMess(e.target.value)}
        />
            <MDBBtn color="info" rounded className="float-end" onClick={handleSendMessage}>
                Send
            </MDBBtn></>
    );
}

