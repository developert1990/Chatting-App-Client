import { useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

export const useSocket = (url?: string) => {
    let socket: Socket = io(url || "http://localhost:9003");
    useEffect(() => {
        console.log("useSocket 커스텀 훅 들어옴")
        return () => {
            socket.off();
            socket.emit('disconnected');
        }
    }, [socket]); // 이거 원래 없었음 socket 
    return { socket };
}
