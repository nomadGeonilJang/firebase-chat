type Message = {
    image:string|null;
    timestamp:number;
    user:{
        id:string;
        image:string;
        name:string
    },
    content?:string;
}
export default Message;