export interface User{
    name: string,
    email: string,
}

export interface SingleChat{
    _id: string,
    chatName: string,
    isGroupChat:boolean,
    users:User[]
}