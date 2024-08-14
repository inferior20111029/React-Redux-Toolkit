import React, { useEffect, useState } from 'react';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import axios from 'axios';
import { FaBell } from 'react-icons/fa';

declare global {
    interface Window {
        Pusher: any;
        Echo: any;
    }
}

interface MessageEvent {
    message: string;
}

interface Notification {
    id: number;
    title: string;
    body: string;
}

const NotificationBell = () => {
    const [messages, setMessages] = useState<string[]>([]);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        if (Notification.permission !== "granted") {
            Notification.requestPermission();
        }

        try {
            window.Pusher = Pusher;

            window.Echo = new Echo({
                broadcaster: 'pusher',
                key: process.env.REACT_APP_PUSHER_KEY,
                cluster: process.env.REACT_APP_PUSHER_CLUSTER,
                forceTLS: true
            });

            window.Echo.channel('messages')
                .listen('.message.sent', (e: MessageEvent) => {
                    setMessages(prevMessages => [...prevMessages, e.message]);
                    showWebNotification("New Message", e.message);
                });
        } catch (err) {
            console.error("Error setting up WebSocket:", err);
            setError("Error setting up WebSocket.");
        }

        axios.get<Notification[]>('http://localhost:8000/api/notifications')
            .then(response => {
                setNotifications(response.data);
            })
            .catch(err => {
                console.error("Error fetching notifications:", err);
                setError("Error fetching notifications.");
            });

        return () => {
            if (window.Echo) {
                window.Echo.leaveChannel('messages');
            }
        };
    }, []);

    const showWebNotification = (title: string, body: string) => {
        if (Notification.permission === "granted") {
            new Notification(title, { body });
        }
    };

    const totalNotifications = messages.length + notifications.length;

    const triggerNotification = () => {
        const newNotification = {
            title: 'New Notification',
            body: 'This is a manually triggered notification.'
        };

        axios.post('http://localhost:8000/api/notifications', newNotification)
            .then(response => {
                const savedNotification = response.data.notification;
                setNotifications(prevNotifications => [...prevNotifications, savedNotification]);
                showWebNotification(newNotification.title, newNotification.body);
            })
            .catch(err => {
                console.error("Error sending notification:", err);
                setError("Error sending notification.");
            });
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <div style={{ marginBottom: '10px', color: 'red', fontWeight: 'bold' }}>
                {error && <p>{error}</p>}
            </div>

            <div style={{ display: 'inline-block', position: 'relative', marginRight: '20px' }}>
                <div onClick={toggleDropdown} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                    <FaBell size={36} />
                    {totalNotifications > 0 && (
                        <span style={{
                            position: 'absolute',
                            top: '-5px',
                            right: '-5px',
                            backgroundColor: 'red',
                            color: 'white',
                            borderRadius: '50%',
                            padding: '5px 10px',
                            fontSize: '12px',
                            fontWeight: 'bold',
                        }}>
                            {totalNotifications}
                        </span>
                    )}
                </div>

                {isDropdownOpen && (
                    <div style={{
                        position: 'absolute',
                        top: '40px',
                        right: '0',
                        backgroundColor: 'white',
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                        width: '320px',
                        zIndex: 1000,
                        maxHeight: '400px',
                        overflowY: 'auto'
                    }}>
                        <div style={{ padding: '10px', borderBottom: '1px solid #e0e0e0', backgroundColor: '#f9f9f9', fontWeight: 'bold', fontSize: '16px' }}>
                            Notifications
                        </div>
                        {notifications.length === 0 && messages.length === 0 ? (
                            <div style={{ padding: '20px', textAlign: 'center', color: '#888' }}>No notifications</div>
                        ) : (
                            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                                {notifications.map(notification => (
                                    <li key={notification.id} style={{ padding: '15px', borderBottom: '1px solid #e0e0e0', cursor: 'pointer' }}>
                                        <strong style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>{notification.title}</strong>
                                        <p style={{ margin: 0, fontSize: '13px', color: '#555' }}>{notification.body}</p>
                                    </li>
                                ))}
                                {messages.map((message, index) => (
                                    <li key={index} style={{ padding: '15px', borderBottom: '1px solid #e0e0e0', cursor: 'pointer' }}>
                                        <strong style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>New Message</strong>
                                        <p style={{ margin: 0, fontSize: '13px', color: '#555' }}>{message}</p>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}
            </div>

            <button onClick={triggerNotification} style={{
                padding: '10px 20px',
                fontSize: '16px',
                border: 'none',
                borderRadius: '4px',
                backgroundColor: '#007bff',
                color: 'white',
                cursor: 'pointer',
                transition: 'background-color 0.3s',
            }}>
                Trigger Notification
            </button>
        </div>
    );
};

export default NotificationBell;