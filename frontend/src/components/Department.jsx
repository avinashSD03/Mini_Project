import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Axios from "axios";
import NavBar from "./NavBar";

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
            <div>
                <NavBar usn={usn}/>
                Department {dept}
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <button className="breadcrumb-item" onClick={()=>{nav('/home',{state:usn})}}>Semester</button>
                        <button className="breadcrumb-item" onClick={()=>{nav('/notes/'+sem,{state:usn})}}>Department</button>
                        <li className="breadcrumb-item active" aria-current="page">Subject</li>
                    </ol>
                </nav>
                <div className="grid text-center" style={{display:'flex',gap:'2rem'}}>
                {uniqueSub.map(sub=>{
                                    return(
                                        <div class="g-col-6" onClick={()=>handleClick(sub.up_sub)} style={{cursor:'pointer'}}>
                                            <div class="card text-bg-dark mb-3" style={{maxWidth:'18rem'}}>
                                                {/* <div class="card-header">Header</div> */}
                                                <div class="card-body">
                                                    <h5 class="card-title">{sub.up_sub}</h5>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                    })
                }
                </div>
    
            </div>
        )
    
}