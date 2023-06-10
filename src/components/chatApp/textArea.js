import React, { useState } from "react";

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
        <div className="text-area">
      <textarea
          className="form-control"
          rows="3"
          placeholder="Enter your message..."
          value={message}
          onChange={handleMessageChange}
      ></textarea>
            <button
                className="btn btn-primary  text-right "
                onClick={handleSendMessage}
                disabled={!selectedMess || !message}
            >
                Send
            </button>
        </div>
    );
}

export default TextArea;
