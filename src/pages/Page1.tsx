import React, { useEffect, useState } from 'react';
import { useSocket } from '../SocketContext'; // 確保導入的路徑正確

const now = new Date();

const Page1: React.FC = () => {
    const socket = useSocket();
    const [clickCount, setClickCount] = useState(0);

    useEffect(() => {
        if (!socket) return;

        socket.on('message', (message: string) => {
            console.log(message);
        });

        return () => {
            socket.off('message');
        };
    }, [socket]);

    const handleClick = () => {
        const newClickCount = clickCount + 1;
        setClickCount(newClickCount);
        if (socket) {
            const notification = {
                id: `id-${newClickCount}`,
                author: '小周',
                avatar: '/assets/avatars/avatar-carson-darrin.png',
                createdAt:  new Date().toLocaleString(),
                job: '美甲',
                read: false,
                type: 'job_add',
                message: `通知 ${newClickCount}`
            };
            socket.emit('notifyPage2', notification);
        }
    };

    return (
        <div>
            <h1>Page 1</h1>
            <button onClick={handleClick}>Notify Page 2</button>
        </div>
    );
};

export default Page1;
