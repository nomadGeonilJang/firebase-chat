type Message = {
    timestamp:number;
    user:{
        id:string;
        image:string;
        name:string
    },
    content?:string;
    image?:string;
}
export default Message;