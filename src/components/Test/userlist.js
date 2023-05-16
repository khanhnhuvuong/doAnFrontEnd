import { useLocation } from 'react-router-dom';
import React, {useEffect} from "react";

function UserListPage() {
    const location = useLocation();
    const userList = location.state?.userList || [];

    useEffect(() => {
        console.log(userList); // Đảm bảo danh sách người dùng được cập nhật
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
