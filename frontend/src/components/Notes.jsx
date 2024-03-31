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
                
                <div className="grid text-center" style={{display:'flex',gap:'2rem'}}>
                {uniqueDept.map(dept=>{
                                    return(
                                        <div class="g-col-6" onClick={()=>handleClick(dept.up_dept)} style={{cursor:'pointer'}}>
                                            <div class="card text-bg-dark mb-3" style={{maxWidth:'18rem'}}>
                                                {/* <div class="card-header">Header</div> */}
                                                <div class="card-body">
                                                    <h5 class="card-title">{dept.up_dept}</h5>
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