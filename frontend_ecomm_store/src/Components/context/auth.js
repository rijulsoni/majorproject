import { useState,useEffect,useContext,createContext, Children } from "react";
import { json } from "react-router-dom";
const AuthContext=createContext()

const AuthProvider=({children})=>{
    const [auth,setAuth]=useState({
        message:"",
        data:null,
        token:"",alert:"",
    })
    useEffect(()=>{
const data=localStorage.getItem("auth")
if(data){
    const parseData=JSON.parse(data)
    setAuth({
        ...auth,data:parseData.data,
        token:parseData.token,
        alert:parseData.alert,
        message:parseData.message,
    })
}
    },[])
    return(
        <AuthContext.Provider value={[auth,setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}
const useAuth=()=>useContext(AuthContext)
export {useAuth,AuthProvider}