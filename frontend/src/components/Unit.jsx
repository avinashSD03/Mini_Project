import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Axios from "axios";
import NavBar from "./NavBar";
import Header from "./Header";


export default function Unit(){

    const nav=useNavigate();
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
                        <button className="breadcrumb-item" onClick={()=>{nav('/notes/dept/subject/'+unit,{state:{sem:sem,dept:dept,sub:sub,usn:usn}})}}>Unit</button>
                        <li className="breadcrumb-item active" aria-current="page">Notes</li>
                    </ol>
                </nav>
                <button className="btn btn-sm btn-secondary" >
                    Filter
                </button>
                <button type="button" className="btn btn-sm btn-secondary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                    <span className="visually-hidden">Toggle Dropdown</span>
                </button>
                <ul className="dropdown-menu">
                        
                        <li><button className="dropdown-item" onClick={()=> handleType('pdf')} >PDF</button></li>
                        <li><button className="dropdown-item" onClick={()=> handleType('presentation')} >PPT</button></li>
                        <li><button className="dropdown-item" onClick={()=> handleType('word')} >Doc</button></li>
                        <li><button className="dropdown-item" onClick={()=> handleType('other')} >Other</button></li>
                </ul>
                <div class="flex flex-wrap gap-x-20 gap-y-12">
                {!isFilter?
                    pdf.map(pdf=>{
                        const path="/files/"+pdf.up_filename
                        const name_with_extension=pdf.up_filename.split('_')[1]
                        const name=name_with_extension.split(".")[0]
        
                        return(
                            <div class="rounded-xl text-2xl bg-gradient-to-l from-slate-800 to-violet-900 p-10 text-gray-300 hover:shadow-xl hover:shadow-violet-900  mr-4" 
                                style={{cursor:'pointer'}}>
                                
                                    <a href={path} target="_blank"><p>{name}</p></a>
                                   
                            </div>
        
                        )
                        })
                    :
                    filterDoc.map(pdf=>{
                        const path="/files/"+pdf.up_filename
                        const name_with_extension=pdf.up_filename.split('_')[1]
                        const name=name_with_extension.split(".")[0]
        
                        return(
        
                            <div class="rounded-xl text-2xl bg-gradient-to-l from-slate-800 to-violet-900 p-10 text-gray-300 hover:shadow-xl hover:shadow-violet-900  mr-4" 
                                style={{cursor:'pointer'}}>
                                
                                    <a href={path} target="_blank"><p>{name}</p></a>
                                   
                            </div>
        
                        )
                        })
                }
                </div>
                </div>
            </div>
        )
    
}