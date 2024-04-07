import React, { useEffect, useState } from "react";
import Axios from'axios';


export default function Header(props){
    const [currUser,setUser]=useState([])

    async function getLoggedUser(){
        if(props.isHome) props.userName(currUser.u_name)
        const response=await Axios.get(`http://localhost:3001/currentUser/${props.usn}`)
        setUser(response.data)
    }
    useEffect(()=>{
        getLoggedUser();
    },[])

    return(
        <header class="relative flex flex-col bg-gradient-to-l from-violet-900 to-slate-800 items-center justify-end gap-x-4 px-4 py-4 sm:flex-row md:h-20">
            <div className="text-white">{currUser.u_name}</div>
            <div>
                <button class="flex h-10 w-10 items-center justify-center rounded-xl border text-gray-300" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                </button>
                <ul class="dropdown-menu bg-slate-400">
                    <li class="dropdown-item cursor-pointer hover:bg-violet-900 hover:text-gray-300">Name: {currUser.u_name}</li>
                    <li class="dropdown-item cursor-pointer hover:bg-violet-900 hover:text-gray-300">USN: {currUser.u_usn}</li>
                    <li class="dropdown-item cursor-pointer hover:bg-violet-900 hover:text-gray-300">Sem: {currUser.u_sem}</li>
                    <li class="dropdown-item cursor-pointer hover:bg-violet-900 hover:text-gray-300">Dept: {currUser.u_dept}</li>
                </ul>
            </div>
        </header>
    )
}