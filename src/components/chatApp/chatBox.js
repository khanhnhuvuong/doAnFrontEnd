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
    MDBCardImage, MDBCardText, MDBCardTitle,
} from "mdb-react-ui-kit";
import Linkify from 'react-linkify';
import ModalImage from "react-modal-image";

export default function ChatBox({chatContent, webPreview, isOnline}) {
    const chatBoxRef = useRef(null);
    const isImage = (str) => {
        return str.includes('images');
    };

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
                                                    {webPreview[decoratedHref] && (
                                                        <MDBCard  key={decoratedHref} style={{width: '350px', height: 'auto'}}>
                                                            <MDBCardImage src={webPreview[decoratedHref].image} position='top'
                                                                          alt='...' style={{
                                                                width: '100px',
                                                                height: '100px',
                                                                margin: 'auto'
                                                            }}/>
                                                            <MDBCardBody>
                                                                <MDBCardTitle>{webPreview[decoratedHref].title}</MDBCardTitle>
                                                                <MDBCardText>
                                                                    {webPreview[decoratedHref].description}                                                                </MDBCardText>
                                                                <MDBBtn>Click to open{webPreview[decoratedHref].link}</MDBBtn>
                                                            </MDBCardBody>
                                                        </MDBCard>
                                                    )}
                                                </a>
                                            )}>
                                                <p className="small p-2 me-3 mb-3 text-white rounded-3 btn-primary">
                                                    {isImage(decodeURIComponent(mess.mes)) ?
                                                        (<ModalImage
                                                            small={decodeURIComponent(mess.mes)}
                                                            large={decodeURIComponent(mess.mes)}
                                                            alt="Image"
                                                            hideDownload={true}
                                                            hideZoom={true}
                                                            className="modal-image"
                                                        />) : (decodeURIComponent(mess.mes))
                                                    }
                                                </p>
                                            </Linkify>
                                        </div>
                                        <img
                                            src="https://www.shareicon.net/data/512x512/2016/05/26/771187_man_512x512.png"
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
                                            src="https://img.freepik.com/free-icon/avatar_318-158392.jpg?w=2000"
                                            alt="avatar 1"
                                            style={{width: "45px", height: "100%"}}
                                        />
                                        <span style={{marginLeft: '-17px', marginTop: '33px', fontSize: '12px'}}>{isOnline ? <MDBIcon fas icon="circle" style={{color: 'blue'}}/> : <MDBIcon fas icon="circle" style={{color: 'grey'}}/>}</span>
                                        <div>
                                            <Linkify componentDecorator={(decoratedHref, decoratedText, key) => (
                                                <a href={decoratedHref} target="_blank" rel="noopener noreferrer"
                                                   key={key}>
                                                <span className="small p-2 ms-3 mb-3 rounded-3" style={{backgroundColor: "#f5f6f7"}}>
                                                    {decodeURIComponent(mess.mes)}
                                                    </span>
                                                    {webPreview[decoratedHref] && (
                                                        <MDBCard style={{width: '350px', height: '250px'}}>
                                                            <MDBCardImage src={webPreview[decoratedHref].image} position='top'
                                                                          alt='...' style={{
                                                                width: '100px',
                                                                height: '100px',
                                                                margin: 'auto'
                                                            }}/>
                                                            <MDBCardBody>
                                                                <MDBCardTitle>{webPreview[decoratedHref].title}</MDBCardTitle>
                                                                <MDBCardText>
                                                                    {webPreview[decoratedHref].description}                                                                </MDBCardText>
                                                                <MDBBtn>Click to open{webPreview[decoratedHref].link}</MDBBtn>
                                                            </MDBCardBody>
                                                        </MDBCard>
                                                    )}
                                                </a>
                                            )}>
                                                <p className="small p-2 ms-3 mb-3 rounded-3"
                                                   style={{backgroundColor: "#f5f6f7"}}>
                                                    {isImage(decodeURIComponent(mess.mes)) ?
                                                        (<ModalImage
                                                            small={decodeURIComponent(mess.mes)}
                                                            large={decodeURIComponent(mess.mes)}
                                                            alt="Image"
                                                            hideDownload={true}
                                                            hideZoom={true}
                                                            className="modal-image"
                                                        />) : (decodeURIComponent(mess.mes))
                                                    }
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