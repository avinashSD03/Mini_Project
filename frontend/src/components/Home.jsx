import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

export default function Home(){

    const nav=useNavigate();
    const loc=useLocation();
    const usn=loc.state;

    const sems=[1,2,3,4,5,6,7,8];

    function handleClick(sem){
        nav('/notes/'+sem,{state:usn})
    }

        return(
            <div>
            <NavBar usn={usn}/>
            <div className="grid text-center" style={{display:'flex',gap:'2rem',flexWrap:'wrap',width:'50%'}}>
                {sems.map(sem=>{
                    return(
                        
                            <div onClick={()=>handleClick(sem)} style={{cursor:'pointer'}}>
                                <div class="card text-bg-dark mb-3">
                                    {/* <div class="card-header">Header</div> */}
                                    <div class="card-body">
                                        <h5 class="card-title">Semester {sem}</h5>
                                    </div>
                                </div>
                            </div>
        
                           
                    )
                })}
            </div>

            </div>
        )
}