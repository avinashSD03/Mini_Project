import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Axios from "axios";
import NavBar from "./NavBar";


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
            <div>
                <NavBar usn={usn}/>
                Semester {sem}
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <button className="breadcrumb-item" onClick={()=>{nav('/home',{state:usn})}}>Semester</button>
                        <li className="breadcrumb-item active" aria-current="page">Department</li>
                    </ol>
                </nav>
                <div classNameName="grid text-center" style={{display:'flex',gap:'2rem'}}>
                {uniqueDept.map(dept=>{
                                    return(
                                        <div className="g-col-6" onClick={()=>handleClick(dept.up_dept)} style={{cursor:'pointer'}}>
                                            <div className="card text-bg-dark mb-3" style={{maxWidth:'18rem'}}>
                                                {/* <div className="card-header">Header</div> */}
                                                <div className="card-body">
                                                    <h5 className="card-title">{dept.up_dept}</h5>
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