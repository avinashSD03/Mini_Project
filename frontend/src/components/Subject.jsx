import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import NavBar from "./NavBar";

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
            <div>
                <NavBar usn={usn}/>
                Subject {sub}
    
                <div className="grid text-center" style={{display:'flex',gap:'2rem'}}>
                {units.map(unit=>{
                                    return(
                                        <div class="g-col-6" onClick={()=>handleClick(unit)} style={{cursor:'pointer'}}>
                                            <div class="card text-bg-dark mb-3" style={{maxWidth:'18rem'}}>
                                                {/* <div class="card-header">Header</div> */}
                                                <div class="card-body">
                                                    <h5 class="card-title">{unit}</h5>
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