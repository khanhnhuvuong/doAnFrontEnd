import React, {useRef, useState} from "react";
import './chatApp.css';

import {
    MDBTextArea,
    MDBBtn, MDBCardBody, MDBIcon,
} from "mdb-react-ui-kit";
import {getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";
import {initializeApp} from "firebase/app";

export default function TextArea({handleSendMessage}) {
    const [mess, setMess] = useState('');
    const fileInputImage = useRef();
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [selectedEmoji, setSelectedEmoji] = useState('');
    const [selectedEmojis, setSelectedEmojis] = useState([]);
    const [imagePreview, setImagePreview] = useState(null);
    const firebaseConfig = {
        apiKey: "AIzaSyCaOLY5fIOYCW2NBSZkkaY9Dt3QJhp7J8Y",
        authDomain: "appchat-efb9e.firebaseapp.com",
        projectId: "appchat-efb9e",
        storageBucket: "appchat-efb9e.appspot.com",
        messagingSenderId: "809554332860",
        appId: "1:809554332860:web:667caf7cfd4c41021d94b9"
    };

    //Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const storage = getStorage(app);

    const emojiList = [
        "😊", "😄", "😃", "😉", "😍", "🥰", "😘", "😎", "😜", "😂", "🤣", "😇", "😴", "🤫", "🙄", "😷", "🤔",
        "🙂", "🙃", "😋", "😚", "😐", "😑", "😮", "😯", "😪", "😫", "😴", "😝", "😛", "🤪", "🤨", "😕", "😟",
        "🙁", "😤", "😠", "😡", "🤬", "😓", "🤥", "🤢", "🤮", "🤧", "🥵", "🥶", "😱", "😨", "😰", "😥", "😭",
        "😢", "😓", "😤", "😩", "🤯", "😳", "🥴", "😬", "🤭", "🤫", "🤔", "🤐", "🙄", "😷", "🤒", "🤕", "🤑",
        "🤠", "😇", "🥳", "🥺", "🤡", "🤓", "😎", "🤖", "👽", "👾", "🤡", "💩", "👻", "💀", "👺", "👹", "👿"
    ];


    function handleClickSend() {
        if (mess !== '') {
            const messageWithEmojis = selectedEmojis.length > 0 ? `${mess}${selectedEmojis.join('')}` : mess;
            handleSendMessage(messageWithEmojis);
            setMess('');
            setSelectedEmojis([]);
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
        const storage = getStorage();
        const storageRef = ref(storage, "images/" + file.name); // Sử dụng child() để tạo thư mục con

        uploadBytes(storageRef, file)
            .then((snapshot) => {
                console.log("Upload complete");
                // Lấy đường dẫn tải xuống
                return getDownloadURL(snapshot.ref);

            })
            .then((downloadURL) => {
                // Handle việc hiển thị hình ảnh trong chatBox
                console.log("Download URL:", downloadURL);

                // Gửi đường dẫn tải xuống đến hàm handleSendMessage để hiển thị trong chatBox
                handleSendMessage(downloadURL);
                setImagePreview(downloadURL); // Hiển thị hình ảnh đã tải lên

                // Cập nhật giá trị của mess (nếu cần)
                // setMess(downloadURL);
            })
            .catch((error) => {
                console.error("Upload error:", error);
                // Xử lý lỗi nếu cần
            });
    }

    return (
        <div style={{width: '800px', display: 'flex'}}>
            <input
                style={{width: "800px", height: '40px'}}
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
            <a className="ms-3" onClick={handleClickSend}
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