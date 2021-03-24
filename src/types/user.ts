export type User = {
    uid:string;
    displayName:string;
    email:string;
    photoURL:string;
}

export type DBUser = {
    uid?:string;
    status?:string;
    image:string;
    name:string;
}