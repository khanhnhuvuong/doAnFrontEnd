import React, { useState } from "react";
import { FaPaperPlane } from 'react-icons/fa';

function TextArea({ handleSendMessageClick, selectedMess }) {
    const [message, setMessage] = useState("");

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };

    const handleSendMessage = () => {
        handleSendMessageClick(message);
        setMessage("");
    };

    if (!selectedMess) {
        return null; // Ẩn trang TextArea khi không có selectedMess
    }

    return (
        <div className="text-area" style={{width: '800px', display: 'flex'}}>
      <textarea
          style={{width: '732px', height: '90px'}}
          className="form-control"
          rows="1"
          placeholder="Enter your message..."
          value={message}
          onChange={handleMessageChange}
      ></textarea>
            <button
                style={{marginLeft:'10px',height:'45px', width:'40px' }}
                className="btn btn-primary  text-right "
                onClick={handleSendMessage}
                disabled={!selectedMess || !message}>
                <FaPaperPlane
                style={{fontSize: '20px',margin: '-15 px'}}/>

            </button>
        </div>
    );
}

export default TextArea;
