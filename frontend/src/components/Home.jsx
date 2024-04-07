import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Axios from "axios";
export default function Home(){

    const nav=useNavigate();
    const loc=useLocation();
    const usn=loc.state;

    const sems=[1,2,3,4,5,6,7,8];
    const [currUser,setUser]=useState([])


    function handleClick(sem){
        nav('/notes/'+sem,{state:usn})
    }

    async function getLoggedUser(){
        const response=await Axios.get(`http://localhost:3001/currentUser/${usn}`)
        setUser(response.data)
    }
    useEffect(()=>{
        getLoggedUser();
    },[])

        return(
            
            <div className="flex min-h-screen w-screen w-full bg-slate-400">
            <NavBar usn={usn}/>

            <div class="flex h-full w-full flex-col">
                <header class="relative flex flex-col bg-gradient-to-l from-violet-900 to-slate-800 items-center justify-end gap-x-4 px-4 py-4 sm:flex-row md:h-20">
                    <div className="text-white">{currUser.u_name}</div>
                    <div>
                        <button class="flex h-8 w-8 items-center justify-center rounded-xl border text-gray-300" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
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

                <div class="h-full overflow-hidden pl-10">
                <main id="dashboard-main" class="h-[calc(100vh-10rem)] overflow-auto px-4 py-10">
                    <h1 class="text-2xl font-black text-violet-900">Welcome back {currUser.u_name}</h1>
                    <p class="mb-6 text-2xl text-violet-900 mb-20">Ignite Your Ingenuity</p>
                    <div class="flex flex-wrap gap-x-20 gap-y-12">
                        {sems.map(sem=>{
                            return(
                                
                                <div class="rounded-xl text-2xl bg-gradient-to-l from-slate-800 to-violet-900 p-10 text-gray-300 hover:shadow-xl hover:shadow-violet-900  mr-4" onClick={()=>handleClick(sem)} style={{cursor:'pointer'}}>
                                    Semester {sem}
                                </div>
                            )
                        })}
                    </div>
                </main>
                </div>
            </div>

            {/* <div className="flex min-h-screen w-screen w-full items-center justify-center flex-col bg-gradient-to-l from-slate-800 to-violet-900">
            <NavBar usn={usn}/>
            <div className="grid text-center" style={{display:'flex',gap:'2rem',flexWrap:'wrap',width:'50%'}}>
                {sems.map(sem=>{
                    return(
                        
                            <div onClick={()=>handleClick(sem)} style={{cursor:'pointer'}}>
                                <div class="card text-bg-dark mb-3">
                                    <div class="card-header">Header</div>
                                    <div class="card-body">
                                        <h5 class="card-title">Semester {sem}</h5>
                                    </div>
                                </div>
                            </div>
        
                           
                    )
                })}
            </div>  */}

            </div>
        )
}