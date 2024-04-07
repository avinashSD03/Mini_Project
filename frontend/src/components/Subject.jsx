import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import NavBar from "./NavBar";
import Header from "./Header";


export default function Subject(){

    const param=useParams();
    const sub=param.subId;
    const nav=useNavigate();
    const loc=useLocation();
    // const sem=loc.state.sem;
    // const dept=loc.state.dept;
    const {sem,dept,usn}= loc.state;
    const units=[1,2,3,4,5];

    function handleClick(unit){
        nav('/notes/dept/subject/unit/'+unit,{state:{sem:sem,dept:dept,sub:sub,usn:usn}})
    }

    
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
                        <button className="breadcrumb-item" onClick={()=>{nav('/notes/dept/'+dept,{state:{sem:sem,usn:usn}})}}>Subject</button>
                        <li className="breadcrumb-item active" aria-current="page">Unit</li>
                    </ol>
                </nav>
                <div class="flex flex-wrap gap-x-20 gap-y-12">
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
                </div>
            </div>
        )
    
}