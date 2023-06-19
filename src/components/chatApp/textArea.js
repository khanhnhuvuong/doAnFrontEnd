import React, {useRef, useState} from "react";
import {MDBIcon, MDBTextArea} from "mdb-react-ui-kit";
import {getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";
import {initializeApp} from "firebase/app";

function TextArea({handleSendMessage, selectedUser}) {
    const [message, setMessage] = useState("");
    const fileInputImage = useRef();
    const [showPopup, setShowPopup] = useState(false);
    const [searchResults, setSearchResults] = useState([]);

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

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

    if (!selectedUser) {
        return null; // Ẩn trang TextArea khi không có selectedMess
    }

    function handleClickSend() {
        const messageWithEmojis = selectedEmojis.length > 0 ? `${message}${selectedEmojis.join('')}` : message;
        const messageToSend = imagePreview ? `${messageWithEmojis} ${imagePreview}` : messageWithEmojis;
        if (messageToSend !== '') {
            handleSendMessage(messageToSend);
            setMessage('');
            setSelectedEmojis([]);
            setImagePreview(null);
        }
    }

    function handleKeyPress(e) {
        if (e.key === 'Enter') {
            handleClickSend();
            // handleSendIcon();
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
        const storageRef = ref(storage, "images/" + file.name);

        uploadBytes(storageRef, file)
            .then((snapshot) => {
                console.log("Upload complete");
                // Lấy đường dẫn tải xuống
                return getDownloadURL(snapshot.ref);

            })
            .then((downloadURL) => {
                console.log("Download URL:", downloadURL);

                // Gửi đường dẫn tải xuống đến hàm handleSendMessage để hiển thị trong chatBox
                handleSendMessage(downloadURL);
                setImagePreview(downloadURL); // Hiển thị hình ảnh đã tải lên

            })
            .catch((error) => {
                console.error("Upload error:", error);
                // Xử lý lỗi nếu cần
            });
    }

    return (
        <div style={{width: '810px', display: 'flex'}}>
            <input
                style={{width: "810px", height: '35px'}}
                label="Message"
                id="textAreaExample"
                value={selectedEmojis.length > 0 ? `${message}${selectedEmojis.join('')}` : message}
                onChange={(e) => setMessage(e.target.value)}
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
            <a className="ms-3 text-muted"
               style={{marginTop: '5px'}}>
                <MDBIcon fas icon="plus-circle" onClick={togglePopup} />
            </a>
            {showPopup && (
                <div className="popup">
                    <a className="popup-item">
                        <MDBIcon fas icon="phone" />
                    </a>
                    <a className="popup-item">
                        <MDBIcon fas icon="video" />
                    </a>
                    <a className="popup-item">
                        <MDBIcon fas icon="microphone" />
                    </a>
                    <a className="popup-item">
                        <MDBIcon fas icon="camera" />
                    </a>
                </div>
            )}
            <a className="ms-3" onClick={handleClickSend}
               style={{marginTop: '5px', color: '#3b71ca'}}
            >
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

export default TextArea;
