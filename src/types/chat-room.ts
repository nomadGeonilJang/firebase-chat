type ChatRoom = {
    id: string;
    name: string;
    description?: string;
    createdBy?: {
        name: string;
        image: string;
    };
}

export default ChatRoom;