import React, { useState, useEffect } from 'react';

const UserList = () => {
    const [userList, setUserList] = useState([]);
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const [socket, setSocket] = useState(null);


    // Gọi hàm API hoặc WebSocket để lấy danh sách người dùng


    useEffect(() => {
        const newSocket = new WebSocket("ws://140.238.54.136:8080/chat/chat");

        newSocket.addEventListener("open", (event) => {
            console.log("Kết nối WebSocket đã được thiết lập", event);
            setSocket(newSocket);
        });


        return () => {
            // Đóng kết nối WebSocket khi component bị hủy
            newSocket.close();
        };
    }, []);

    const handleLogin = () => {
        //Gửi yêu cầu đăng nhập đến server WebSocket
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const requestData = {
            action: "onchat",
            data: {
                event: "LOGIN",
                data: {
                    user: user,
                    pass: pass,
                },
            },
        };

        socket.send(JSON.stringify(requestData));

    };


    const handleGetUserList = () => {
        // Gửi yêu cầu lấy danh sách user tới WebSocket Server
        const loginData = {
            action: 'onchat',
            data: {
                event: 'GET_USER_LIST',
            },
        };
        socket.send(JSON.stringify(loginData));
        console.log("Đã gửi yêu cầu lấy danh sách cho server")
        socket.onmessage = (event) => {
            const response = JSON.parse(event.data);
            if (response.status === 'success' && response.event === 'GET_USER_LIST') {
                const users = response.data;
                setUserList(users);
            }
        }
    }

    return (
        <div>
            <h2>User List</h2>
            <ul>
                {userList.map((user, index) => (
                    <li key={index}>{user.name}</li>
                ))}
            </ul>
            <input
                type="text"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                placeholder="Nhập tên người dùng"/>
            <input
                type="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                placeholder="Nhập mật khẩu"/>
            <button onClick={handleLogin}>Đăng nhập</button>
            <button onClick={handleGetUserList}>Lấy danh sách user từ server</button>
        </div>
    );
}

export default UserList;
