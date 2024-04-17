import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import Axios from "axios";

export default function AdminLogin(){

    const [authUser,setUser]=useState({
        email:"",
        pswd:""
    })
    const [admins,setAdmins]=useState([])
    const nav=useNavigate(); 

    async function allAdmins(){
        const response=await Axios.get("http://localhost:3001/allAdmin")
        setAdmins(response.data)
    }
    useEffect(()=>{
        allAdmins()
    },[]);

    function handleChange(event){
        const {name,value}=event.target;
        setUser(prevUser => {
            return {...prevUser,
                [name]:value
            };
        });
    }

    async function handleLogIn(event){
        event.preventDefault();
        if(!admins.map(admin=>{
            if(admin.a_email===authUser.email){
                if(admin.a_pswd===authUser.pswd){
                    return "logged"
                }
                else return "wrongPassword"
            }
            else return "invalidId"}).includes("logged")) {alert("invalid")}
        else{
            nav('/admin',{state:authUser.email})
        }
    }

    return(
        <div>
            <div className="flex min-h-screen w-screen w-full items-center justify-center flex-col bg-gradient-to-l from-slate-800 to-violet-900">

            <div className="relative">
                
            <div className="hidden sm:block h-56 w-56 text-indigo-300 absolute a-z-10 -left-20 -top-20">
            <svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='a' patternUnits='userSpaceOnUse' width='40' height='40' patternTransform='scale(0.6) rotate(0)'><rect x='0' y='0' width='100%' height='100%' fill='none'/><path d='M11 6a5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5 5 5 0 015 5'  stroke-width='1' stroke='none' fill='currentColor'/></pattern></defs><rect width='800%' height='800%' transform='translate(0,0)' fill='url(#a)'/></svg>
            </div>
            <div className="hidden sm:block h-28 w-28 text-indigo-300 absolute a-z-10 -right-20 -bottom-20">
            <svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='b' patternUnits='userSpaceOnUse' width='40' height='40' patternTransform='scale(0.5) rotate(0)'><rect x='0' y='0' width='100%' height='100%' fill='none'/><path d='M11 6a5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5 5 5 0 015 5'  stroke-width='1' stroke='none' fill='currentColor'/></pattern></defs><rect width='800%' height='800%' transform='translate(0,0)' fill='url(#b)'/></svg>
            </div>
                <div className="relative flex flex-col sm:w-[30rem] rounded-lg border-gray-400 bg-gray-300 shadow-lg px-4">
                <div className="flex-auto p-6">
                    <div className="mb-10 flex flex-shrink-0 flex-grow-0 items-center justify-center overflow-hidden">
                    <div onClick={()=>nav('/')} className="flex cursor-pointer items-center gap-2 text-indigo-500 no-underline hover:text-indigo-500">
                        <span className="flex-shrink-0 text-3xl font-black tracking-tight opacity-100  text-violet-900">EngineerEase</span>
                    </div>
                    </div>
                    <h4 className="mb-2 font-medium text-violet-900 xl:text-xl text-center">Admin Login</h4>

                    <form className="mb-4" onSubmit={handleLogIn} autoComplete="off">
                    <div className="mb-4">
                        <label for="email" className="mb-2 inline-block text-sm font-medium uppercase text-violet-950">Email</label>
                        <input className="block w-full cursor-text appearance-none rounded-md border bg-gradient-to-l from-slate-800 to-violet-900 text-white border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-white focus:shadow" 
                            id="email" 
                            type="text" 
                            placeholder="email" 
                            onChange={handleChange} 
                            name="email" 
                            value={authUser.email}
                            autofocus="" />
                    </div>
                    <div className="mb-4">
                        <div className="flex justify-between">
                        <label className="mb-2 inline-block text-sm font-medium uppercase text-violet-950" for="password">Password</label>
                        </div>
                        <div className="relative flex w-full flex-wrap items-stretch">
                        <input className="relative block flex-auto cursor-text appearance-none rounded-md border border-gray-400 bg-gradient-to-l from-slate-800 to-violet-900 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-white focus:shadow" 
                            type="password" 
                            id="password" 
                            onChange={handleChange} 
                            name="pswd" 
                            value={authUser.pswd}
                            placeholder="············" />
                        </div>
                    </div>
                    <div className="flex items-center" >
                        <div style={{display:'flex', flexDirection:'column'}}>
                            <button className="grid w-full cursor-pointer select-none rounded-md border border-indigo-500 bg-gradient-to-l from-slate-800 to-violet-900 py-2 px-5 text-center align-middle text-md text-white shadow hover:border-indigo-600 hover:bg-indigo-600 hover:text-white focus:border-indigo-600 focus:bg-indigo-600 focus:text-white focus:shadow-none"
                                        type="submit">Login</button>
                        </div>
                    </div>
                    </form>
                </div>
                </div>
            </div>
            </div>

        </div>
    )
}