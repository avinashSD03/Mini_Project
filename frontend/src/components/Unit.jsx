import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Axios from "axios";
import NavBar from "./NavBar";
import Header from "./Header";

export default function Unit(){

    const nav=useNavigate();
    const param=useParams();
    const unit=param.unitId;
    console.log(unit)
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
    async function handleStar(id){
        const response=await Axios.get(`http://localhost:3001/starDocument/${id}-${usn}`)
        alert(response.data)
    }

    return(
        <div className="flex min-h-screen w-screen w-full bg-gray-300">
            <NavBar usn={usn}/>
                <div class="flex h-full w-full flex-col">
                    <Header usn={usn}/>
                    <main id="dashboard-main" class="h-[calc(100vh-10rem)] ml-[calc(100vh-24rem)] mt-[calc(100vh-38rem)] overflow-auto px-4 py-10">
                    <nav aria-label="breadcrumb" className="flex w-fit m-4 p-2 border rounded-2xl bg-gradient-to-l from-slate-800 to-violet-900">
                        <ol className="breadcrumb my-2">
                            <button className="text-gray-300" onClick={()=>{nav('/home',{state:usn})}}>Semester &gt;</button>
                            <button className="text-gray-300" onClick={()=>{nav('/notes/'+sem,{state:usn})}}>Department &gt;</button>
                            <button className="text-gray-300" onClick={()=>{nav('/notes/dept/'+dept,{state:{sem:sem,usn:usn}})}}>Subject &gt;</button>
                            <button className="text-gray-300" onClick={()=>{nav('/notes/dept/subject/'+sub,{state:{sem:sem,dept:dept,usn:usn}})}}>Unit &gt;</button>
                            <li className="!text-gray-400" aria-current="page">Notes</li>
                        </ol>
                    </nav>
                    <div class="dropdown">
                        <button class="bg-gradient-to-l from-slate-800 to-violet-900 text-gray-300 flex w-fit m-4 p-2 items-center border rounded-2xl dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Filter
                        </button>
                        <ul className="dropdown-menu bg-gradient-to-l from-slate-800 to-violet-900">
                            <li><button className="dropdown-item bg-gradient-to-l from-slate-800 to-violet-900 text-gray-300 hover:text-gray-300 hover:font-bold" onClick={()=> handleType('pdf')} >PDF</button></li>
                            <li><button className="dropdown-item bg-gradient-to-l from-slate-800 to-violet-900 text-gray-300 hover:text-gray-300 hover:font-bold" onClick={()=> handleType('presentation')} >PPT</button></li>
                            <li><button className="dropdown-item bg-gradient-to-l from-slate-800 to-violet-900 text-gray-300 hover:text-gray-300 hover:font-bold" onClick={()=> handleType('word')} >Doc</button></li>
                            <li><button className="dropdown-item bg-gradient-to-l from-slate-800 to-violet-900 text-gray-300 hover:text-gray-300 hover:font-bold" onClick={()=> handleType('other')} >Other</button></li>
                        </ul>
                    </div>
                    <div class="flex flex-wrap gap-x-20 gap-y-12 p-4">
                        {!isFilter?
                            pdf.map(pdf=>{
                                const path="/files/"+pdf.up_filename
                                const name_with_extension=pdf.up_filename.split('_')[1]
                                const name=name_with_extension.split(".")[0]
                
                                return(
                                    <div class="relative rounded-xl text-2xl bg-gradient-to-l from-slate-800 to-violet-900 p-8 text-gray-300 hover:shadow-xl hover:shadow-violet-900  mr-4">
                                        <a className="cursor-pointer" href={path} target="_blank"><p>{name}</p></a>
                                        <div className="cursor-pointer flex justify-end absolute bottom-2 right-2">
                                            <button class="fa fa-star" onClick={()=>handleStar(pdf.up_id)}></button>
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
                                    <div class="relative rounded-xl text-2xl bg-gradient-to-l from-slate-800 to-violet-900 p-8 text-gray-300 hover:shadow-xl hover:shadow-violet-900  mr-4">
                                        <a className="cursor-pointer" href={path} target="_blank"><p>{name}</p></a>
                                        <div className="cursor-pointer flex justify-end absolute bottom-2 right-2">
                                            <button class="fa fa-star" onClick={()=>handleStar(pdf.up_id)}></button>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    </main>
                </div>
        </div>
    )
}