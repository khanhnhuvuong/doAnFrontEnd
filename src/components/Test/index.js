import React, { useState, useEffect } from 'react';

const UserList = () => {
    const [userList, setUserList] = useState([]);
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const [socket, setSocket] = useState(null);
    const [mess, setMess] = useState('');

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
        console.log('login thanh cong');
    };

    const handleGetUserList = () => {
        // Gửi yêu cầu lấy danh sách user tới WebSocket Server
        const loginData = {
            action: 'onchat',
            data: {
                event: 'SEND_CHAT',
                data: {
                    type: 'people',
                    to: '20130350',
                    mes: 'hom nay troi mua',
                }
            },
        };
        socket.send(JSON.stringify(loginData));
        console.log("Đã gửi tin nhắn lên cho server")
        socket.onmessage = (event) => {
            const response = JSON.parse(event.data);
            if (response.status === 'success' && response.event === 'SEND_CHAT') {
                const users = response.data.mes;
                setUserList(users);
                console.log(users);
            }
        }
    }

    // const currentUser = sessionStorage.getItem('user');

    return (
        <div>
            <h2>User List</h2>
            <ul>
                {userList.map((user, index) => (
                    <li key={index}>
                        {user.name}<br/>
                        {user.mes}<br/>
                    </li>
                )
                )}
            </ul>
            <input
                type="text"
                value={mess}
                onChange={(e) => setMess(e.target.value)}
                placeholder="Nhập tên người dùng"/>
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
            <button onClick={handleGetUserList}>Gửi</button>
        </div>
    );
}

export default UserList;
