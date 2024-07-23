import React, { useEffect } from 'react';
import { useSocket } from '../SocketContext';

const Page3: React.FC = () => {
    const socket = useSocket();

    useEffect(() => {
        if (!socket) return;

        socket.on('message', (message: string) => {
            console.log(message);
        });

        return () => {
            socket.off('message');
        };
    }, [socket]);

    return (
        <div>
            <h1>Page 3</h1>
        </div>
    );
};

export default Page3;