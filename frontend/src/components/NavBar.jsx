import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
        usn===null?handleLogin()
        :
        <div>
            <aside class="fixed z-50 md:fixed">
                <input type="checkbox" class="peer hidden" id="sidebar-open" />
                <label class="peer-checked:rounded-full peer-checked:left peer-checked:text-gray-300 peer-checked:top-8 absolute top-8 z-20 mx-3 cursor-pointer md:hidden" for="sidebar-open">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                </label>
                <nav aria-label="Sidebar Navigation" class="peer-checked:w-64 left-0 z-10 flex h-screen w-0 flex-col overflow-hidden bg-gradient-to-l from-slate-800 to-violet-900 text-white transition-all md:h-screen md:w-64 lg:w-72">
                    <span className="mr-2 text-4xl text-violet-500">
                        {/* <img src={logo} alt='logo'/> */}
                    </span>
                    <div onClick={()=> !usn.includes("@")?nav('/home',{state:usn}):null} class="mt-16 cursor-pointer text-3xl text-gray-300 py-8 pl-10">
                        EngineerEase
                    </div>
                    {!usn.includes("@")?
                        <ul>
                            <li class="relative">
                                <button onClick={()=>nav('/myUpload',{state:usn})} class="focus:bg-gray-300 focus:text-violet-900 hover:bg-gray-300 hover:text-violet-900 hover:font-bold flex w-full space-x-2 rounded-md px-10 py-4 text-gray-300 focus:outline-none">
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                        </svg>
                                    </span>
                                    <span class="text-lg">My Uploads</span>
                                </button>
                                </li>
                            <li class="relative">
                                <button onClick={()=>nav('/upload',{state:usn})} class="focus:bg-gray-300 hover:bg-gray-300 hover:text-violet-900 hover:font-bold flex w-full space-x-2 rounded-md px-10 py-4 text-gray-300 focus:outline-none">
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                        </svg>
                                    </span>
                                    <span class="text-lg">Upload</span>
                                </button>
                            </li>
                            <li class="relative">
                                <button onClick={()=>nav('/recommend',{state:usn})} class="focus:bg-gray-300 hover:bg-gray-300 hover:text-violet-900 hover:font-bold flex w-full space-x-2 rounded-md px-10 py-4 text-gray-300 focus:outline-none">
                                    <span class="text-2xl">
                                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 36 36">
                                            <path fill="currentColor" d="M32 15h-1V9a1 1 0 0 0-1-1H6a1 1 0 0 1-1-.82v-.36A1 1 0 0 1 6 6h23.58a1 1 0 0 0 0-2H6a3 3 0 0 0-3 3a3.08 3.08 0 0 0 0 .36v20.57A4.1 4.1 0 0 0 7.13 32H30a1 1 0 0 0 1-1v-6h1a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1Zm-3 15H7.13A2.11 2.11 0 0 1 5 27.93V9.88A3.11 3.11 0 0 0 6 10h23v5h-7a5 5 0 0 0 0 10h7Zm2-7h-9a3 3 0 0 1 0-6h9Z" class="clr-i-outline clr-i-outline-path-1" />
                                            <circle cx="23.01" cy="20" r="1.5" fill="currentColor" class="clr-i-outline clr-i-outline-path-2" />
                                            <path fill="none" d="M0 0h36v36H0z" />
                                        </svg>
                                    </span>
                                    <span class="text-lg">Recommend</span>
                                </button>
                            </li>
                            <li class="relative">
                                <button onClick={()=>nav('/starred',{state:usn})} class="focus:bg-gray-300 hover:bg-gray-300 hover:text-violet-900 hover:font-bold flex w-full space-x-2 rounded-md px-10 py-4 text-gray-300 focus:outline-none">
                                    <div className="flex justify-center items-center gap-2">
                                        <span className="h-7 w-6 fa fa-star-o text-xl"></span>
                                    <span class="text-lg">Starred</span>
                                    </div>
                                </button>
                            </li>
                        </ul>

                        :

                        <ul>
                            <li class="relative">
                                <button onClick={()=>nav('/admin',{state:usn})}class="focus:bg-gray-300 focus:text-violet-900 hover:bg-gray-300 hover:text-violet-900 hover:font-bold flex w-full space-x-2 rounded-md px-10 py-4 text-gray-300 focus:outline-none">
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                        </svg>
                                    </span>
                                    <span class="text-lg">New Uploads</span>
                                </button>
                                </li>
                            <li class="relative">
                                <button onClick={()=>nav('/adminValid',{state:usn})}class="focus:bg-gray-300 hover:bg-gray-300 hover:text-violet-900 hover:font-bold flex w-full space-x-2 rounded-md px-10 py-4 text-gray-300 focus:outline-none">
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                        </svg>
                                    </span>
                                    <span class="text-lg">Valid Upload</span>
                                </button>
                            </li>
                            <li class="relative">
                                <button onClick={()=>nav('/adminInvalid',{state:usn})}class="focus:bg-gray-300 hover:bg-gray-300 hover:text-violet-900 hover:font-bold flex w-full space-x-2 rounded-md px-10 py-4 text-gray-300 focus:outline-none">
                                    <span class="text-2xl">
                                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 36 36">
                                            <path fill="currentColor" d="M32 15h-1V9a1 1 0 0 0-1-1H6a1 1 0 0 1-1-.82v-.36A1 1 0 0 1 6 6h23.58a1 1 0 0 0 0-2H6a3 3 0 0 0-3 3a3.08 3.08 0 0 0 0 .36v20.57A4.1 4.1 0 0 0 7.13 32H30a1 1 0 0 0 1-1v-6h1a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1Zm-3 15H7.13A2.11 2.11 0 0 1 5 27.93V9.88A3.11 3.11 0 0 0 6 10h23v5h-7a5 5 0 0 0 0 10h7Zm2-7h-9a3 3 0 0 1 0-6h9Z" class="clr-i-outline clr-i-outline-path-1" />
                                            <circle cx="23.01" cy="20" r="1.5" fill="currentColor" class="clr-i-outline clr-i-outline-path-2" />
                                            <path fill="none" d="M0 0h36v36H0z" />
                                        </svg>
                                    </span>
                                    <span class="text-lg">Invalid Upload</span>
                                </button>
                            </li>
                            {/* <li class="relative">
                                <button onClick={()=>nav('/adminLogin')} class="focus:bg-gray-300 hover:bg-gray-300 hover:text-violet-900 hover:font-bold flex w-full space-x-2 rounded-md px-10 py-4 text-gray-300 focus:outline-none">
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                        </svg>
                                    </span>
                                    <span class="text-lg">Logout</span>
                                </button>
                            </li> */}
                        </ul>
                    }
                </nav>
            </aside>
        </div> 
    )
}