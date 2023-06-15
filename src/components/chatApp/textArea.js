import React, {useRef, useState} from "react";
import {FaPaperPlane} from 'react-icons/fa';
import {MDBIcon, MDBTextArea} from "mdb-react-ui-kit";

function TextArea({handleSendMessageClick, selectedUser}) {
    const [message, setMessage] = useState("");
    const fileInputImage = useRef();

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };

    const handleSendMessage = () => {
        handleSendMessageClick(message);
    };

    if (!selectedUser) {
        return null; // Ẩn trang TextArea khi không có selectedMess
    }

    function handleClickSend() {
        if (message !== '') {
            handleSendMessage(message);
            setMessage('');
        }
    }

    function handleKeyPress(e) {
        if (e.key === 'Enter') {
            handleClickSend();
        }
    }

    function handleUploadImage(img) {
        const file = img.target.files[0];
        const reader = new FileReader();

        reader.onload = function (e) {
            const base64Image = e.target.result;

            handleSendMessage(base64Image);

            setMessage(""); // Cập nhật giá trị của mess sau khi gửi tin nhắn
        };
        reader.readAsDataURL(file);
    }

    return (
        <div style={{width: '732px', display: 'flex'}}>
            <MDBTextArea
                style={{width: '732px'}}
                className="form-control"
                rows="1"
                placeholder="Nhập tin nhắn tại đây..."
                value={message}
                onChange={handleMessageChange}
                onKeyPress={handleKeyPress}
            ></MDBTextArea>
            <input
                type="file"
                style={{display: "none"}}
                ref={fileInputImage}
                onChange={handleUploadImage}
            />
            <a className="ms-1 text-muted" onClick={() => fileInputImage.current.click()}>
                <MDBIcon fas icon="paperclip"/>
            </a>
            <a className="ms-3 text-muted" onClick={handleClickSend}>
                <MDBIcon fas icon="smile"/>
            </a>
            <a className="ms-3" onClick={handleClickSend}>
                <MDBIcon fas icon="paper-plane"/>
            </a>
        </div>
    );
}

export default TextArea;
