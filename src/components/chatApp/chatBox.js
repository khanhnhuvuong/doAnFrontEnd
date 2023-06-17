import React, {useEffect, useRef, useState} from "react";
import {
    MDBCard,
    MDBCardBody,
    MDBTypography,
    MDBCardImage,
    MDBCardText, MDBCardTitle,
    MDBBtn,
} from "mdb-react-ui-kit";
import Linkify from 'react-linkify';
import axios from "axios";

export default function ChatBox({chatContent, webPreview, setWebPreview}) {
    const chatBoxRef = useRef(null);
    const isURL = (text) => {
        const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
        return urlPattern.test(text);
    };
    const isImage = (str) => {
        return str.includes('images');
    };

    let sortedChatContent = [];
    if (Array.isArray(chatContent)) {
        sortedChatContent = [...chatContent].sort((a, b) => {
            const timeA = new Date(a.createAt).getTime();
            const timeB = new Date(b.createAt).getTime();
            return timeA - timeB;
        });
    }

    useEffect(() => {
        // tu dong cuon xuong cuoi
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [chatContent]);

    useEffect(() => {
        const fetchLinkPreviews = async () => {
            const updatedLinkPreviews = [];

            for (const mess of chatContent) {
                if (isURL(decodeURIComponent(mess.mes))) {
                    try {
                        // Lấy thông tin từ link

                        const apiKey = '645f9baa9ada4f18c05d90c2526108a7'; // Thay YOUR_API_KEY bằng API key của bạn
                        const url = `https://api.linkpreview.net/?key=${apiKey}&q=${encodeURIComponent(decodeURIComponent(mess.mes))}`;


                        const response = await axios.get(url);

                        updatedLinkPreviews.push(response.data);
                        console.log(response.data);
                    } catch (error) {
                        console.error('Error fetching link preview:', error);
                        updatedLinkPreviews.push(null);
                    }
                } else {
                    updatedLinkPreviews.push(null);
                }
            }

            // Cập nhật state linkPreviews
            setWebPreview(updatedLinkPreviews);
            console.log(webPreview)
        };

        fetchLinkPreviews();
    }, [chatContent]);


    return (
        <MDBTypography listUnStyled style={{height: "432px", overflow: "scroll", marginTop: '102px'}} ref={chatBoxRef}>
            <ul>
                {sortedChatContent.map((mess, index) => (
                    <div key={index} style={{width: '750px'}}>
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
                                            <Linkify componentDecorator={(decoratedHref, decoratedText, key) => (
                                                <a href={decoratedHref} target="_blank" rel="noopener noreferrer"
                                                   key={key}>
                                                    <span
                                                        className="small p-2 me-3 mb-3 text-white rounded-3 btn-primary">
                                                        {decodeURIComponent(mess.mes)}
                                                    </span>
                                                    {webPreview && webPreview[index] && (
                                                        <MDBCard style={{width: '350px', height: '250px'}}>
                                                            <MDBCardImage src={webPreview[0].image} position='top'
                                                                          alt='...' style={{
                                                                width: '100px',
                                                                height: '100px',
                                                                margin: 'auto'
                                                            }}/>
                                                            <MDBCardBody>
                                                                <MDBCardTitle>{webPreview[1].title}</MDBCardTitle>
                                                                <MDBCardText>
                                                                    {webPreview[3].description}                                                                </MDBCardText>
                                                                <a>{webPreview[4].link}</a>
                                                            </MDBCardBody>
                                                        </MDBCard>
                                                    )}
                                                </a>
                                            )}>
                                                <p className="small p-2 me-3 mb-3 text-white rounded-3 btn-primary">
                                                    {isImage(decodeURIComponent(mess.mes)) ?
                                                        (<MDBCardImage
                                                            style={{width: '350px', height: 'auto'}}
                                                            src={decodeURIComponent(mess.mes)}></MDBCardImage>) : (decodeURIComponent(mess.mes))
                                                    }
                                                </p>
                                            </Linkify>
                                        </div>
                                        <img
                                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                                            alt="avatar 1"
                                            style={{width: "45px", height: "100%"}}
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
                                            style={{width: "45px", height: "100%"}}
                                        />
                                        <div>
                                            <Linkify componentDecorator={(decoratedHref, decoratedText, key) => (
                                                <a href={decoratedHref} target="_blank" rel="noopener noreferrer"
                                                   key={key}>
                            <span className="small p-2 ms-3 mb-3 rounded-3" style={{backgroundColor: "#f5f6f7"}}>
                        {decodeURIComponent(mess.mes)}
                            </span>
                                                    {webPreview && webPreview[index] && (
                                                        <MDBCard style={{width: '350px', height: '250px'}}>
                                                            <MDBCardImage src={webPreview[index].image} position='top'
                                                                          alt='...' style={{
                                                                width: '100px',
                                                                height: '100px',
                                                                margin: 'auto'
                                                            }}/>
                                                            <MDBCardBody>
                                                                <MDBCardTitle>{webPreview[index].title}</MDBCardTitle>
                                                                <MDBCardText>
                                                                    {webPreview[index].description}                                                                </MDBCardText>
                                                                <a>{webPreview[index].link}</a>
                                                            </MDBCardBody>
                                                        </MDBCard>
                                                    )}
                                                </a>
                                            )}>
                                                <p className="small p-2 ms-3 mb-3 rounded-3"
                                                   style={{backgroundColor: "#f5f6f7"}}>
                                                    {decodeURIComponent(mess.mes)}
                                                </p>
                                            </Linkify>

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