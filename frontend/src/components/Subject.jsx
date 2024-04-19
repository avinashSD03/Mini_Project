import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import NavBar from "./NavBar";
import Header from "./Header";

export default function Subject(){

    const param=useParams();
    const sub=param.subId;
    const nav=useNavigate();
    const loc=useLocation();
    const {sem,dept,usn}= loc.state;
    const units=[1,2,3,4,5];

    function handleClick(unit){
        nav('/notes/dept/subject/unit/'+unit,{state:{sem:sem,dept:dept,sub:sub,usn:usn}})
    }

    return(
        <div className="flex min-h-screen w-screen w-full bg-gray-300">
            <NavBar usn={usn}/>
                <div class="flex h-full w-full flex-col">
                    <Header usn={usn}/>
                    <main id="dashboard-main" class="md:h-[calc(100vh-10rem)] md:ml-[calc(100vh-26rem)] md:mt-[calc(100vh-40rem)] sm:h-[calc(100vh-10rem)] sm:ml-[calc(100vh-42rem)] sm:mt-[calc(100vh-40rem)] overflow-auto px-4 py-10">
                    <nav aria-label="breadcrumb" className="flex w-fit m-4 p-2 border rounded-2xl bg-gradient-to-l from-slate-800 to-violet-900">
                        <ol className="breadcrumb my-2">
                            <button className="text-gray-300" onClick={()=>{nav('/home',{state:usn})}}>Semester &gt;</button>
                            <button className="text-gray-300" onClick={()=>{nav('/notes/'+sem,{state:usn})}}>Department &gt;</button>
                            <button className="text-gray-300" onClick={()=>{nav('/notes/dept/'+dept,{state:{sem:sem,usn:usn}})}}>Subject &gt;</button>
                            <li className="!text-gray-400" aria-current="page">Unit</li>
                        </ol>
                    </nav>
                    <div class="flex flex-wrap gap-x-20 gap-y-12 p-4">
                    {units.map(unit=>{
                        return(
                            <div class="rounded-xl text-2xl bg-gradient-to-l from-slate-800 to-violet-900 p-10 text-gray-300 hover:shadow-xl hover:shadow-violet-900  mr-4" 
                                onClick={()=>handleClick(unit)} style={{cursor:'pointer'}}>
                            
                                    {unit}
                                    
                            </div>
                        )
                        })
                    }
                    </div>
                    </main>
                </div>
        </div>
    )
}