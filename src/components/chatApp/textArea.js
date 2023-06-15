import React, {useRef, useState} from "react";
import './chatApp.css';
import { Picker } from 'emoji-mart';
// import 'emoji-mart/css/emoji-mart.css';

import {
    MDBTextArea,
    MDBBtn, MDBCardBody, MDBIcon,
} from "mdb-react-ui-kit";
export default function TextArea({handleSendMessage}) {
    const [mess, setMess] = useState('');
    const fileInputImage = useRef();
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [selectedEmoji, setSelectedEmoji] = useState('');
    const [selectedEmojis, setSelectedEmojis] = useState([]);
    const emojiList = [
        "😊", "😄", "😃", "😉", "😍", "🥰", "😘", "😎", "😜", "😂", "🤣", "😇", "😴", "🤫", "🙄", "😷", "🤔",
        "🙂", "🙃", "😋", "😚", "😐", "😑", "😮", "😯", "😪", "😫", "😴", "😝", "😛", "🤪", "🤨", "😕", "😟",
        "🙁", "😤", "😠", "😡", "🤬", "😓", "🤥", "🤢", "🤮", "🤧", "🥵", "🥶", "😱", "😨", "😰", "😥", "😭",
        "😢", "😓", "😤", "😩", "🤯", "😳", "🥴", "😬", "🤭", "🤫", "🤔", "🤐", "🙄", "😷", "🤒", "🤕", "🤑",
        "🤠", "😇", "🥳", "🥺", "🤡", "🤓", "😎", "🤖", "👽", "👾", "🤡", "💩", "👻", "💀", "👺", "👹", "👿"
    ];


    function handleClickSend() {
        if (mess !== '') {
            handleSendMessage(mess);
            setMess('');
        }
    }

    function handleSendIcon() {
        if (selectedEmojis.length > 0) {
            handleSendMessage(selectedEmojis.join(''));
            setSelectedEmojis([]);
            setShowEmojiPicker(false);
        }
    }

    function handleRemoveIcon(emoji) {
        setSelectedEmojis(selectedEmojis.filter((item) => item !== emoji));
    }


    function handleKeyPress(e) {
        if (e.key === 'Enter') {
            handleClickSend();
            handleSendIcon();
        }
    }

    function handleKeyDown(e) {
        if (e.key === 'Backspace' && selectedEmojis.length > 0) {
            const updatedEmojis = [...selectedEmojis];
            updatedEmojis.pop(); // Xóa biểu tượng cuối cùng
            setSelectedEmojis(updatedEmojis);
        }
    }

    function handleUploadImage(img) {
        const file = img.target.files[0];
        const reader = new FileReader();

        reader.onload = function (e) {
            const base64Image = e.target.result;

            handleSendMessage(base64Image);

            setMess(base64Image); // Cập nhật giá trị của mess sau khi gửi tin nhắn
        };
        reader.readAsDataURL(file);
    }

    return (
        <div style={{width: '800px', display: 'flex'}}>
            <input
                style={{ width: "800px", height: '40px'}}
                label="Message"
                id="textAreaExample"
                value={selectedEmojis.length > 0 ? `${mess}${selectedEmojis.join('')}` : mess}
                onChange={(e) => setMess(e.target.value)}
                onKeyPress={handleKeyPress}
                onKeyDown={handleKeyDown}
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
                            className={`emoji ${selectedEmoji === emoji ? "selected" : ""}`}
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