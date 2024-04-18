import React, { useEffect, useState } from "react";
import { useLocation} from "react-router-dom";
import NavBar from "./NavBar";
import Header from "./Header";
import Axios from 'axios';

export default function Starred(){

    const loc=useLocation();
    const usn=loc.state;
    const [pdf,setPdf]=useState([]);

    async function getPDFs(){
        const response=await Axios.get(`http://localhost:3001/getStar/${usn}`)
        setPdf(response.data)
    }
    useEffect(()=>{
        getPDFs();
    },[])

    async function handleUnstar(id){
        await Axios.get(`http://localhost:3001/unstarDocument/${id}-${usn}`)
        window.location.reload()
    }

    return(
        <div className="flex min-h-screen w-screen w-full bg-gray-300">
            <NavBar usn={usn}/>
            <div class="flex h-full w-full flex-col">
                <Header usn={usn}/>
                <main id="dashboard-main" class="h-[calc(100vh-10rem)] ml-[calc(100vh-24rem)] mt-[calc(100vh-38rem)] overflow-auto px-4 py-10">
                <div class="flex flex-wrap gap-x-20 gap-y-12 p-4">
                    {pdf.map(pdf=>{
                        const path="/files/"+pdf.up_filename
                        const name_with_extension=pdf.up_filename.split('_')[1]
                        const name=name_with_extension.split(".")[0]
        
                        return(
                            <div class="relative rounded-xl text-2xl bg-gradient-to-l from-slate-800 to-violet-900 p-8 text-gray-300 hover:shadow-xl hover:shadow-violet-900  mr-4">
                                
                                    <a className="cursor-pointer" href={path} target="_blank"><p>{name}</p></a>
                                    <div className="cursor-pointer flex justify-end absolute bottom-2 right-2">
                                    <span className="strikethrough"> <button class="fa fa-star" onClick={()=>handleUnstar(pdf.up_id)}></button></span>
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