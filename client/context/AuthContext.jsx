import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import toast from "react-hot-toast";
import {io} from "socket.io-client";
const backedUrl=import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL=backedUrl;

export const AuthContext = createContext();
export const AuthProvider = ({children})=>{
    const [token,setToken] = useState(localStorage.getItem("token"));
    const [authUser,setAuthUser] = useState(null);
    const [onlineUser,setOnlineUser] = useState([]);
    const [socket,setSocket] = useState(null);

    const checkAuth = async()=>{
        try{
            const {data} = await axios.get("/api/auth/check");
            if(data.success)
            {
                setAuthUser(data.user)
                connectSocket(data.user)
            }
        }
        catch(error)
        {
            toast.error(error.message)

        }
    }


    //login function to handle user authentication and socket connection
const login = async(startTransition,credetials)=>{
    try{
        const {data}= await axios.post(`/api/auth/${state}`,credetials);
        if(data.success)
        {
            setAuthUser(data.userData);
            connectSocket(data.userData);
            axios.defaults.headers.common["token"] = data.token;
            setToken(data.token);
            localStorage.setItem("token",data.token);
            toast.success(data.message);
        }
        else{
            toast.error(data.message)
        }
        
    }
    catch(error)
    {
     toast.error(error.message);
    }
}

    //connect socket function to handle socket connection and online users updates 
    const connectSocket = (userData)=>{
        if(!userData||socket?.connected) return;
        const newSocket=io(backedUrl,{
            query:{
                userId: userData._id,
            }
        });
        newSocket.connect();
        setSocket(newSocket);
        newSocket.on("getOnlineUsers",(userIds)=>{
            setOnlineUser(userIds);
        })
    } 
    useEffect(()=>{
        if(token)
        {
            axios.defaults.headers.common["token"]=token;
        }
        checkAuth();
    })
    const value={
        axios,
        authUser,
        onlineUser,
        socket
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}