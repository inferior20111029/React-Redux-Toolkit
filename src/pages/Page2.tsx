import React, { useEffect, useState } from 'react';
import { useSocket } from '../SocketContext'; // 確保導入的路徑正確
import { FaBell } from 'react-icons/fa'; // 使用react-icons來顯示小鈴鐺
import NotificationList from '../NotificationList'; // 導入通知列表組件

interface Notification {
    id: string;
    author: string;
    avatar: string;
    createdAt: number;
    job: string;
    read: boolean;
    type: string;
    message: string;
}

const Page2: React.FC = () => {
    const socket = useSocket();
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [isListVisible, setIsListVisible] = useState(false);

    useEffect(() => {
        if (!socket) return;

        socket.on('notifyPage2', (notification: Notification) => {
            setNotifications((prevNotifications) => [...prevNotifications, notification]);
        });

        return () => {
            socket.off('notifyPage2');
        };
    }, [socket]);

    const handleBellClick = () => {
        setIsListVisible(!isListVisible);
    };

    const handleNotificationClose = (id: string) => { // 修改這裡為 string
        setNotifications((prevNotifications) => prevNotifications.filter(n => n.id !== id));
    };

    return (
        <div>
            <h1>Page 2</h1>
            <div style={{ position: 'relative', display: 'inline-block' }} onClick={handleBellClick}>
                <FaBell size={24} />
                {notifications.length > 0 && <span style={{
                    position: 'absolute',
                    top: '-5px',
                    right: '-5px',
                    width: '15px',
                    height: '15px',
                    borderRadius: '50%',
                    background: 'red',
                    color: 'white',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '10px'
                }}>{notifications.length}</span>}
            </div>
            {isListVisible && <NotificationList notifications={notifications} onClose={handleNotificationClose} />}
        </div>
    );
};

export default Page2;
