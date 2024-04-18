import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Axios from "axios";
import NavBar from "./NavBar";
import Header from "./Header";

export default function Department(){

    const param=useParams();
    const dept=param.deptId;
    const nav=useNavigate();
    const loc=useLocation();
    const {sem,usn}=loc.state;
    const [uniqueSub,setUniqueSub]=useState([]);

    function handleClick(sub){
        nav('/notes/dept/subject/'+sub,{state:{sem:sem,dept:dept,usn:usn}})
    }

    async function getUnique_Subject(){
        const response=await Axios.get(`http://localhost:3001/getUniqueSubject/${sem}-${dept}`)
        setUniqueSub(response.data)
    }
    useEffect(()=>{
        getUnique_Subject();
    },[])

    return(
        <div className="flex min-h-screen w-screen w-full bg-gray-300">
            <NavBar usn={usn}/>
                <div class="flex h-full w-full flex-col">
                    <Header usn={usn}/>
                    <main id="dashboard-main" class="h-[calc(100vh-10rem)] ml-[calc(100vh-24rem)] mt-[calc(100vh-38rem)] overflow-auto px-4 py-10">
                    <nav aria-label="breadcrumb" className="flex w-fit m-4 p-2 border rounded-2xl bg-gradient-to-l from-slate-800 to-violet-900">
                        <ol className="breadcrumb my-2">
                            <button className="text-gray-300" onClick={()=>{nav('/home',{state:usn})}}>Semester &gt;</button>
                            <button className="text-gray-300" onClick={()=>{nav('/notes/'+sem,{state:usn})}}>Department &gt;</button>
                            <li className="!text-gray-400" aria-current="page">Subject</li>
                        </ol>
                    </nav>
                    <div class="flex flex-wrap gap-x-20 gap-y-12 p-4">
                    {uniqueSub.map(sub=>{
                        return(
                            <div class="rounded-xl text-2xl bg-gradient-to-l from-slate-800 to-violet-900 p-10 text-gray-300 hover:shadow-xl hover:shadow-violet-900  mr-4" 
                                    onClick={()=>handleClick(sub.up_sub)} style={{cursor:'pointer'}}>
                                    
                                    {sub.up_sub}
                            
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