import React  from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Header from "./Header";

export default function Home(){

    const nav=useNavigate();
    const loc=useLocation();
    const usn=loc.state;

    const sems=[1,2,3,4,5,6,7,8];

    function handleClick(sem){
        nav('/notes/'+sem,{state:usn})
    }

    return(
        <div className="flex min-h-screen w-screen w-full bg-gray-300">
            <NavBar usn={usn}/>
                <div class="flex h-full w-full flex-col">
                    <Header usn={usn}/>
                    <div class="h-full overflow-hidden pl-10">
                        <main id="dashboard-main" class="h-[calc(100vh-10rem)] ml-[calc(100vh-24rem)] mt-[calc(100vh-38rem)] overflow-auto px-4 py-10">
                            <p class="mb-6 text-3xl font-black text-center text-violet-900">ENGINEERING MADE EFFORTLESS</p>
                            <p class="mb-12 text-2xl font-black text-violet-900">Explore Resources and Collaborate</p>
                            <div class="flex flex-wrap gap-x-20 gap-y-12 ">
                                {sems.map(sem=>{
                                    return(
                                        <div class="rounded-xl text-2xl bg-gradient-to-l from-slate-800 to-violet-900 p-10 text-gray-300 hover:shadow-xl hover:shadow-violet-900  mr-4" 
                                            onClick={()=>handleClick(sem)} 
                                            style={{cursor:'pointer'}}>
                                            
                                            Semester {sem}
                                        
                                        </div>
                                    )
                                })}
                            </div>
                        </main>
                    </div>
                </div>
        </div>
        )
}