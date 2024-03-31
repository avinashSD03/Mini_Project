import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function NavBar(props){
    const nav=useNavigate();
    const usn=props.usn;
    function handleLogin(){
        nav('/login')
    }
    useEffect(()=>{
        if(usn===null) handleLogin();
    },[usn])
    return(
        usn===null?handleLogin():
        <div style={{display:'flex',flexDirection:'column'}}>
            <div>{usn}</div>
            <div style={{display:'flex',gap:'2rem'}}>
                <button className="btn btn-primary" onClick={()=>nav('/home',{state:usn})}>Home</button>
                <button className="btn btn-primary" onClick={()=>nav('/myUpload',{state:usn})}>My Uploads</button>
                <button className="btn btn-primary" onClick={()=>nav('/upload',{state:usn})} >Upload</button>
                <button className="btn btn-primary">Recommend</button>
                <button className="btn btn-primary" onClick={()=>nav('/')}>Logout</button>
            </div>
        </div>
    )
}