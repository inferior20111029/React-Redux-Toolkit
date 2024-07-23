import React from 'react';
import './NotificationList.css'; // 你可以在這裡自定義樣式

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

interface NotificationListProps {
    notifications: Notification[];
    onClose: (id: string) => void; // 修改這裡為 string
}

const NotificationList: React.FC<NotificationListProps> = ({ notifications, onClose }) => {
    return (
        <div className="notification-list">
            <h3>通知</h3>
            {notifications.map((notification) => (
                <div key={notification.id} className="notification-item">
                    <div className="notification-content">
                        <img src={notification.avatar} alt={notification.author} className="notification-avatar" />
                        <div className="notification-text">
                            <span className="notification-message">{notification.author} {notification.job} {notification.message}</span>
                            <span className="notification-time">{new Date(notification.createdAt).toLocaleString()}</span>
                        </div>
                    </div>
                    <button className="notification-close" onClick={() => onClose(notification.id)}>×</button>
                </div>
            ))}
        </div>
    );
};

export default NotificationList;
