import React, {useRef, useState} from "react";
import {MDBIcon, MDBTextArea} from "mdb-react-ui-kit";
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

function TextArea({handleSendMessage, selectedUser}) {
    const [message, setMessage] = useState("");
    const fileInputImage = useRef();
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [selectedEmoji, setSelectedEmoji] = useState('');
    const [selectedEmojis, setSelectedEmojis] = useState([]);
    const emojiList = [
        "😊", "😄", "😃", "😉", "😍", "🥰", "😘", "😎", "😜", "😂", "🤣", "😇", "😴", "🤫", "🙄", "😷", "🤔",
        "🙂", "🙃", "😋", "😚", "😐", "😑", "😮", "😯", "😪", "😫", "😴", "😝", "😛", "🤪", "🤨", "😕", "😟",
        "🙁", "😤", "😠", "😡", "🤬", "😓", "🤥", "🤢", "🤮", "🤧", "🥵", "🥶", "😱", "😨", "😰", "😥", "😭",
        "😢", "😓", "😤"];

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };

    // const handleSendMessage = () => {
    //     handleSendMessage(message);
    // };

    if (!selectedUser) {
        return null; // Ẩn trang TextArea khi không có selectedMess
    }

    function handleClickSend() {
        if (message !== '') {
            handleSendMessage(message);
            setMessage('');
        }
    }
        function handleSendIcon() {
            if (selectedEmojis.length > 0) {
                handleSendMessage(selectedEmojis.join(''));
                setSelectedEmojis([]);
                setShowEmojiPicker(false);
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
            <input
                style={{ width: "800px", height: '40px'}}
                label="Message"
                id="textAreaExample"
                value={selectedEmojis.length > 0 ? `${message}${selectedEmojis.join('')}` : message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}

            />
            <input
                type="file"
                style={{display: "none"}}
                ref={fileInputImage}
                onChange={handleUploadImage}
            />
            <a className="ms-3 text-muted"
               style={{marginTop: '5px'}}
               onClick={() => fileInputImage.current.click()}>
                <MDBIcon fas icon="paperclip"/>
            </a>
            <a className="ms-3 text-muted"
               style={{marginTop: '5px'}}
               onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                <MDBIcon fas icon="smile"/>
            </a>
            <a className="ms-3" onClick={handleSendIcon}
               style={{marginTop: '5px', color: '#3b71ca'}}>
                <MDBIcon fas icon="paper-plane"/>
            </a>
            {showEmojiPicker && (
                <div className="emoji-picker">
                    {emojiList.map((emoji, index) => (
                        <span
                            style={{cursor: 'pointer'}}
                            key={index}
                            className={`emoji ${selectedEmoji ===emoji ? "selected" : ""}`}
                            onClick={() => {
                                if (selectedEmojis.includes(emoji)) {
                                    setSelectedEmojis(selectedEmojis.filter((item) => item !== emoji));
                                } else {
                                    setSelectedEmojis([...selectedEmojis, emoji]);
                                }
                            }}
                        >
                    {emoji}
                            </span>
                    ))}
                </div>
            )}
        </div>
    );
}

export default TextArea;
