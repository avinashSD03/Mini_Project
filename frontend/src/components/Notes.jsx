import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Axios from "axios";
import NavBar from "./NavBar";
import Header from "./Header";

export default function Notes(){

    const param=useParams();
    const sem=param.semId;
    const nav=useNavigate();
    const [uniqueDept,setUniqueDept]=useState([]);
    const loc=useLocation();
    const usn=loc.state;

    function handleClick(dept){
        nav('/notes/dept/'+dept,{state:{sem:sem,usn:usn}})
    }

    async function getUnique_Dept(){
        const response=await Axios.get(`http://localhost:3001/getUniqueDept/${sem}`)
        setUniqueDept(response.data)
    }

    useEffect(()=>{
        getUnique_Dept();
    },[])
    
        return(
                <div className="flex min-h-screen w-screen w-full bg-slate-400">
                <NavBar usn={usn}/>
                    <div class="flex h-full w-full flex-col">
                    <Header usn={usn}
                            isHome={false}
                    />
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <button className="breadcrumb-item" onClick={()=>{nav('/home',{state:usn})}}>Semester</button>
                        <li className="breadcrumb-item active" aria-current="page">Department</li>
                    </ol>
                </nav>
                <div class="flex flex-wrap gap-x-20 gap-y-12">
                {uniqueDept.map(dept=>{
                                    return(
                                        <div class="rounded-xl text-2xl bg-gradient-to-l from-slate-800 to-violet-900 p-10 text-gray-300 hover:shadow-xl hover:shadow-violet-900  mr-4" 
                                                onClick={()=>handleClick(dept.up_dept)} style={{cursor:'pointer'}}>
                                                    
                                            {dept.up_dept}
                                        
                                        </div>
                                    )
                                    })
                }
                </div>
                </div>
            </div>
            
        )

   
}