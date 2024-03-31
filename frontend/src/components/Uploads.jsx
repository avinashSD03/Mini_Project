import React, { useState } from "react";
import { useLocation} from 'react-router-dom';
import Axios from "axios";
import NavBar from "./NavBar";
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
            <div>
            <NavBar usn={usn}/>
            <div>
                Upload Page {usn}
                <form onSubmit={handleSubmit}>
                    
                    <div class="dropdown">
                        <select class="form-control" name="dept" value={newNotes.dept} onChange={handleChange}>
                            <option>Department</option>
                            <option value="CS">Computer Science</option>
                            <option value="EC">Electronics and Communication</option>
                            <option value="EE">Electrical and Electronics</option>
                        </select> 
                    </div>
    
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="floatingInput2" placeholder="Semester" onChange={handleChange} name="sem" value={newNotes.sem}/>
                        <label for="floatingInput2">Semester</label>
                    </div>
    
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="floatingInput1" placeholder="Subject" onChange={handleChange} name="subject" value={newNotes.subject}/>
                        <label for="floatingInput1">Subject</label>
                    </div>
    
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="floatingInput1" placeholder="Unit" onChange={handleChange} name="unit" value={newNotes.unit}/>
                        <label for="floatingInput1">Unit</label>
                    </div>
                    
                    <div>
                        <input type="file" class="form-control" name="files" onChange={(event)=>setFile(event.target.files[0])}/>
                    </div>
    
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="floatingInput3" placeholder="Other Resources" onChange={handleChange} name="rsc" value={newNotes.rsc}/>
                        <label for="floatingInput3">Other Resources</label>
                    </div>
    
                    <button className="btn btn-success" type="submit">Upload</button>
                </form>
                {/* <button className="btn btn-primary" onClick={()=>nav('/home',{state:usn})}>Back to Home</button> */}
            </div>
            </div>
        )
}