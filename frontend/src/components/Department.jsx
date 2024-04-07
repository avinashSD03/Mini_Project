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
            <div className="flex min-h-screen w-screen w-full bg-slate-400">
                <NavBar usn={usn}/>
                    <div class="flex h-full w-full flex-col">
                    <Header usn={usn}
                            isHome={false}
                    />
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <button className="breadcrumb-item" onClick={()=>{nav('/home',{state:usn})}}>Semester</button>
                        <button className="breadcrumb-item" onClick={()=>{nav('/notes/'+sem,{state:usn})}}>Department</button>
                        <li className="breadcrumb-item active" aria-current="page">Subject</li>
                    </ol>
                </nav>
                <div class="flex flex-wrap gap-x-20 gap-y-12">
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
                </div>
            </div>
        )
    
}