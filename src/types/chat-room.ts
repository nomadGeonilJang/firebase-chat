type ChatRoom = {
    id: string;
    description: string;
    name: string;
    createdBy: {
        name: string;
        image: string;
    };
}

export default ChatRoom;