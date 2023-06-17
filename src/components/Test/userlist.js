import { useLocation } from 'react-router-dom';
import React, {useEffect} from "react";
import axios from 'axios';

function UserListPage() {
    const location = useLocation();
    const userList = location.state?.userList || [];
    const apiKey = '645f9baa9ada4f18c05d90c2526108a7';

    useEffect(() => {
        const getLinkPreview = async (url) => {
            try {
                const response = await axios.get(`https://api.linkpreview.net/?key=${apiKey}&q=${encodeURIComponent(url)}`);
                return response.data;
            } catch (error) {
                console.error('Error fetching link preview:', error);
                return null;
            }
        };

// Sử dụng hàm getLinkPreview để kiểm tra thông tin trả về của link
        const testLinkPreview = async () => {
            const url = 'https://www.youtube.com/';
            const preview = await getLinkPreview(url);
            console.log('Web Preview:', preview);
        };
        testLinkPreview();
        // console.log(userList); // Đảm bảo danh sách người dùng được cập nhật
    }, [userList]);

    return (
        <div>
            <h1>Danh sách người dùng</h1>
            <ul>
                {userList.map((user, index) => (
                    <li key={index} className="list-group-item">
                        <a href="src/components/chatApp#!" className="d-flex justify-content-between">
                            <div className="d-flex flex-row">
                                <img
                                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-8.webp"
                                    alt="avatar"
                                    className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                                    width="60"
                                />
                                <div className="pt-1">
                                    <p className="fw-bold mb-0">{user.name}</p>
                                    <p className="small text-muted">
                                    </p>
                                </div>
                            </div>
                            <div className="pt-1">
                                <p className="small text-muted mb-1">{user.actionTime}</p>
                            </div>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UserListPage;
// const getLinkPreview = async (url) => {
//     try {
//         const response = await axios.get(`https://api.linkpreview.net/?key=${apiKey}&q=${encodeURIComponent(url)}`);
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching link preview:', error);
//         return null;
//     }
// };
//
// // Kiểm tra và lấy thông tin web preview
// const messagesWithLinks = sortedChatContent.filter(mess => {
//     return mess.mes.includes('http://') || mess.mes.includes('https://');
// });
//
// const getWebPreviews = async () => {
//     if (messagesWithLinks.length === 0) {
//         return;
//     }
//
//     const previews = [];
//     for (const message of messagesWithLinks) {
//         const link = message.mes.match(/(http:\/\/|https:\/\/\S+)/gi)[0];
//         const preview = await getLinkPreview(link);
//         previews.push(preview);
//     }
//     setWebPreview(previews);
// };
// getWebPreviews();