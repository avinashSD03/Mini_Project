import React, { useState } from "react";
import { useLocation} from 'react-router-dom';
import Axios from "axios";
import NavBar from "./NavBar";
import Header from "./Header";


export default function Upload(){

    const [newNotes,setNotes]=useState({
        dept:"",
        sem:"",
        subject:"",
        unit:"",
        rsc:"",
    });

    const [file,setFile]=useState("")
    const loc=useLocation();
    const usn=loc.state;

    function handleChange(event){
        const {name,value}=event.target;
        console.log(event.target)
        setNotes(prevNote => {
            return {...prevNote,
                [name]:value
            };
        });

    }
    
    function handleSubmit(event){
        event.preventDefault();
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        }
        try{
                Axios.post("http://localhost:3001/upload",{
                    file_info:file,
                    usn:usn,
                    dept:newNotes.dept,
                    sem:newNotes.sem,
                    subject:newNotes.subject,
                    unit:newNotes.unit,
                    rsc:newNotes.rsc,
            },config)
            .then((response)=>{
                if(response.data==="upload successful") alert(response.data)
                else alert("invalid upload")
            })
            setNotes({
                dept:"",
                sem:"",
                subject:"",
                unit:"",
                rsc:"",
            });
            setFile("")
        }catch(err){
            console.log(err)
        }
    }
        return(
            <div className="flex min-h-screen w-screen w-full bg-gray-300">
                <NavBar usn={usn}/>

                <div class="flex h-full w-full flex-col">
            
                    <Header usn={usn} />
                    <p className="mt-1 mb-1 text-center text-2xl font-black text-violet-900">Contribute Your Resource</p>
                    <form onSubmit={handleSubmit} className="relative mt-3 flex flex-col px-60 pb-10" autoComplete="off">
                        
                        <div class="dropdown mb-3">
                            <label for="email" className="mb-2 inline-block text-sm font-medium uppercase text-violet-950">Department</label>
                            <select id="email" class="bg-gradient-to-l from-slate-800 to-violet-900 text-gray-300 border cursor-pointer text-sm rounded-md outline-none block w-full py-2 px-3 dark:bg-violet-950"
                                    name="dept" value={newNotes.dept} onChange={handleChange} required>
                                <option>Select</option>
                                <option value="CS">Computer Science</option>
                                <option value="EC">Electronics and Communication</option>
                                <option value="EE">Electrical and Electronics</option>
                            </select> 
                        </div>
        
                        <div class="mb-3">
                            <label for="email" className="mb-2 inline-block text-sm font-medium uppercase text-violet-950">Semester</label>
                            <input className="!block w-full cursor-text appearance-none rounded-md border bg-gradient-to-l from-slate-800 to-violet-900 text-white border-gray-400 py-2 px-3 text-sm outline-none" 
                                    type="text" id="email" placeholder="Semester" onChange={handleChange} name="sem" value={newNotes.sem} required/>
                        </div>
        
                        <div class="mb-3">
                            <label for="email" className="mb-2 inline-block text-sm font-medium uppercase text-violet-950">Subject</label>
                            <input className="!block w-full cursor-text appearance-none rounded-md border bg-gradient-to-l from-slate-800 to-violet-900 text-white border-gray-400 py-2 px-3 text-sm outline-none" 
                                    type="text" id="email" placeholder="Subject" onChange={handleChange} name="subject" value={newNotes.subject} required/>
                        </div>
        
                        <div class="mb-3">
                            <label for="email" className="mb-2 inline-block text-sm font-medium uppercase text-violet-950">Unit</label>
                            <input className="block w-full cursor-text appearance-none rounded-md border bg-gradient-to-l from-slate-800 to-violet-900 text-white border-gray-400 py-2 px-3 text-sm outline-none" 
                                    type="text" id="email" placeholder="Unit" onChange={handleChange} name="unit" value={newNotes.unit} required/>
                        </div>
                        
                        <div className="mb-3">
                            <label for="email" className="mb-2 inline-block text-sm font-medium uppercase text-violet-950">Select File</label>
                            <input type="file" id ='email' className="block w-full cursor-pointer appearance-none rounded-md border bg-gradient-to-l from-slate-800 to-violet-900 text-white border-gray-400 py-2 px-3 text-sm outline-none" 
                                name="files" onChange={(event)=>setFile(event.target.files[0])} required/>
                        </div>
        
                        <div class="mb-3">
                            <label for="email" className="mb-2 inline-block text-sm font-medium uppercase text-violet-950">Other Resources</label>
                            <input className="!block w-full cursor-text appearance-none rounded-md border bg-gradient-to-l from-slate-800 to-violet-900 text-white border-gray-400 py-2 px-3 text-sm outline-none" 
                                    type="text" id="email" placeholder="Others" onChange={handleChange} name="rsc" value={newNotes.rsc} required/>
                        </div>
        
                        <button className="absolute bottom-0 right-60 w-1/5 border rounded-2xl bg-gradient-to-l from-slate-800 to-violet-900 text-gray-300 px-4 py-2 hover:shadow-lg hover:shadow-violet-900" type="submit">Upload</button>
                    </form>
            </div>
            </div>
        )
}