import React, {useEffect, useState} from "react";
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
import ChatList from "../components/chatApp/chatList";
import ChatBox from "../components/chatApp/chatBox";

function Home() {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = new WebSocket("ws://140.238.54.136:8080/chat/chat");

        newSocket.addEventListener("open", (event) => {
            console.log("Kết nối WebSocket đã được thiết lập", event);
            setSocket(newSocket);
        });
    }, []);


    return (
        <MDBContainer fluid className="py-5 gradient-custom" style={{ backgroundColor: "#eee" }}>
            <MDBRow>
                <ChatList/>
                <ChatBox/>
            </MDBRow>
        </MDBContainer>
    );
}

export default Home;