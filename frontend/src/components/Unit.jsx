import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Axios from "axios";
import NavBar from "./NavBar";

export default function Unit(){

    const param=useParams();
    const unit=param.unitId;
    const loc=useLocation();
    const {sem,dept,sub,usn}=loc.state;
    const [pdf,setPdf]=useState([]);
    const [filterDoc,setDoc]=useState([]);
    const [isFilter,setFilter]=useState(false);

    async function getPDFs(){
        const response=await Axios.get(`http://localhost:3001/getPdf/${sem}-${dept}-${sub}-${unit}`)
        setPdf(response.data)
    }
    useEffect(()=>{
        getPDFs();
    },[])

    async function handleType(filter){
        setFilter(true)
        const response=await Axios.get(`http://localhost:3001/filterDocument/${sem}-${dept}-${sub}-${unit}-${filter}`)
        setDoc(response.data)
    }

        return(
            <div>
                <NavBar usn={usn}/>
                Unit {unit}
                <button className="btn btn-sm btn-secondary" >
                    Filter
                </button>
                <button type="button" className="btn btn-sm btn-secondary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                    <span className="visually-hidden">Toggle Dropdown</span>
                </button>
                <ul className="dropdown-menu">

                        <input type="hidden" id="me" /> {/* common input tag to take inputs of sortby and filter by month*/}
                        
                        <li><button className="dropdown-item" onClick={()=> handleType('pdf')} >PDF</button></li>
                        <li><button className="dropdown-item" onClick={()=> handleType('presentation')} >PPT</button></li>
                        <li><button className="dropdown-item" onClick={()=> handleType('word')} >Doc</button></li>
                        <li><button className="dropdown-item" onClick={()=> handleType('other')} >Other</button></li>
                </ul>
                <div className="grid text-center" style={{display:'flex',gap:'2rem'}}>
                {!isFilter?
                    pdf.map(pdf=>{
                        const path="/files/"+pdf.up_filename
                        const name_with_extension=pdf.up_filename.split('_')[1]
                        const name=name_with_extension.split(".")[0]
        
                        return(
        
                            <div class="g-col-6" style={{cursor:'pointer'}}>
                                <div class="card text-bg-dark mb-3" style={{maxWidth:'18rem'}}>
                                    <div class="card-body">
                                        <h5 class="card-title"><a href={path} target="_blank"><p>{name}</p></a></h5>
                                    </div>
                                </div>
                            </div>
        
                        )
                        })
                    :
                    filterDoc.map(pdf=>{
                        const path="/files/"+pdf.up_filename
                        const name_with_extension=pdf.up_filename.split('_')[1]
                        const name=name_with_extension.split(".")[0]
        
                        return(
        
                            <div class="g-col-6" style={{cursor:'pointer'}}>
                                <div class="card text-bg-dark mb-3" style={{maxWidth:'18rem'}}>
                                    <div class="card-body">
                                        <h5 class="card-title"><a href={path} target="_blank"><p>{name}</p></a></h5>
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