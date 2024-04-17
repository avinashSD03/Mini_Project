import React, { useEffect, useState } from "react";
import {useLocation} from 'react-router-dom';
import Axios from "axios";
import Header from "./Header";
import NavBar from "./NavBar";

export default function Admin(){

    const [allPdf,setPdf]=useState([]);
    const loc=useLocation();
    const email=loc.state;

    async function getPDFs(){
        const response=await Axios.get("http://localhost:3001/adminView")
        setPdf(response.data)
    }
    useEffect(()=>{
        getPDFs();
    },[])

    async function validate(file,clicked){
        const response=await Axios.post("http://localhost:3001/adminValidate",{
            target:file,
            status:clicked
        })
        window.location.reload()
    }

    return(
        
        <div>
            <div className="flex min-h-screen w-screen w-full bg-gray-300">
                <NavBar usn={email}/>

                <div class="flex h-full w-full flex-col">
            
                    <Header usn={email}/>
                    {allPdf.length===0?<p className="text-violet-900 text-2xl">No New Uploads</p>
                    :
                    <div class="flex flex-wrap gap-x-20 gap-y-12 p-4">
                    {allPdf.map(pdf=>{
                        const path="/files/"+pdf.up_filename
                        const name_with_extension=pdf.up_filename.split('_')[1]
                        const name=name_with_extension.split(".")[0]
                        return(
                            <div class="card rounded-xl text-2xl bg-gradient-to-l from-slate-800 to-violet-900 text-gray-300 hover:shadow-xl hover:shadow-violet-900  mr-4">
                                <div class="card-header text-center p-4">
                                    <a href={path} target="_blank"><p>{name}</p></a>
                                </div>
                                <div class="card-body flex gap-x-4">
                                    <div>
                                        <p className="pb-4">Student Details</p>
                                        <p class="card-text text-lg">USN: {pdf.up_usn}</p>
                                        <p class="card-text text-lg">Name: {pdf.u_name}</p>
                                        <p class="card-text text-lg">Dept: {pdf.u_dept}</p>
                                        <p class="card-text text-lg">Sem: {pdf.u_sem}</p>
                                    </div>
                                    <div>
                                        <p className="pb-4">Upload Details</p>
                                        <p class="card-text text-lg">Dept: {pdf.up_dept}</p>
                                        <p class="card-text text-lg">Sem: {pdf.up_sem}</p>
                                        <p class="card-text text-lg">Subject: {pdf.up_sub}</p>
                                        <p class="card-text text-lg">Unit: {pdf.up_unit}</p>
                                    </div>
                                </div>
                                <div class="card-footer flex justify-end">
                                    <div>
                                        <button onClick={()=>validate(pdf.up_filename,false)}>
                                            <span>&#10060;</span>                              
                                        </button>
                                        <button onClick={()=>validate(pdf.up_filename,true)}>
                                            <span>&#9989;</span>                              
                                        </button>
                                    </div>
                                </div>
                            </div>
                            
                        )
                        })
                    }
                    </div>
                    }
                </div>
            </div>
        </div>
    )
}