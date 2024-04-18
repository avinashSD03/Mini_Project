import React, { useEffect, useState } from "react";
import { useLocation} from "react-router-dom";
import Axios from "axios";
import NavBar from "./NavBar";
import Header from "./Header";

export default function My_Uploads(){

    const loc=useLocation();
    const usn=loc.state;

    const [editNotes,setNotes]=useState({
        up_dept:"",
        up_sem:"",
        up_sub:"",
        up_unit:"",
        up_other:"",
    });
    const [myupload,setUpload]=useState([]);

    async function handleDelete(fileName){
        const response=await Axios.post(`http://localhost:3001/delMyUploads`,{
            usn:usn,
            file:fileName
        })
        if(response.data==="Deletion Successful") alert(response.data)
        else{
            alert("Error")
        }
    }

    function handleChange(event){
        const {name,value}=event.target;
        setNotes(prevNote => {
            return {...prevNote,
                [name]:value
            };
        });
    }
    
    async function handleSubmit(event){
        event.preventDefault();
        try{
                await Axios.put("http://localhost:3001/updateUpload",{
                    usn:usn,
                    dept:editNotes.up_dept,
                    sem:editNotes.up_sem,
                    subject:editNotes.up_sub,
                    unit:editNotes.up_unit,
                    rsc:editNotes.up_other,
            })
            .then((response)=>{
                if(response.data==="edit successful") alert(response.data)
                else alert("invalid upload")
            })
            
        }catch(err){
            console.log(err)
        }
    }

    async function handleEdit(fileName){
        const response=await Axios.get(`http://localhost:3001/getEditUploads/${usn}-${fileName}`)
        setNotes(response.data[0])
    }

    async function getMyUploads(){
        const response=await Axios.get(`http://localhost:3001/getMyUploads/${usn}`)
        setUpload(response.data)
    }
    useEffect(()=>{
        getMyUploads();
    },[])

    return (
        <div className="flex min-h-screen w-screen w-full bg-gray-300">
        <NavBar usn={usn}/>

        <div class="flex h-full w-full flex-col">
            
            <Header usn={usn} />
            <main id="dashboard-main" class="h-[calc(100vh-10rem)] ml-[calc(100vh-24rem)] mt-[calc(100vh-38rem)] overflow-auto px-4 py-10">
            <div class="flex flex-wrap gap-x-20 gap-y-12 p-4">
                {myupload.map(upload=>{
                    const name_with_extension=upload.up_filename.split('_')[1]
                    const name=name_with_extension.split(".")[0]
                    return(
                        <div className="flex justify-between rounded-xl text-2xl bg-gradient-to-l from-slate-800 to-violet-900 p-8 text-gray-300 hover:shadow-xl hover:shadow-violet-900 sm:w-1/2 md:w-1/4" >
                            <div className="text-gray-300">{name}</div>
                            <div className="flex justify-between w-2/5">
                                <button type="button" class="fa fa-pencil text-gray-300" onClick={()=>handleEdit(upload.up_filename)} style={{width:'50%'}} data-bs-toggle="modal" data-bs-target="#exampleModal"></button>
                                <button type="button" class="fa fa-trash-o text-gray-300" onClick={()=>handleDelete(upload.up_filename)} style={{width:'50%'}}></button>
                            </div>
                        </div>
                    )
                    })
                }
            </div>
            
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content bg-gray-300">
                <div class="modal-header">
                    <h1 class="modal-title fs-5 text-violet-950 font-bold" id="exampleModalLabel">Edit Your Resource</h1>
                    <button type="button" class="btn-close text-violet-950" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form onSubmit={handleSubmit}>
                        
                        <div class="dropdown">
                            <label className="mb-2 inline-block text-sm font-medium uppercase text-violet-950" for="floatingInput5">Department</label>
                            <select id="flotingInput5" class="bg-gradient-to-l from-slate-800 to-violet-900 text-gray-300 border cursor-pointer text-sm rounded-md outline-none block w-full py-2 px-3 dark:bg-violet-950" name="up_dept" value={editNotes.up_dept} onChange={handleChange}>
                                <option value="CS">Computer Science</option>
                                <option value="EC">Electronics and Communication</option>
                                <option value="EE">Electrical and Electronics</option>
                            </select> 
                        </div>
        
                        <div class="mb-2 mt-2">
                            <label className="mb-2 inline-block text-sm font-medium uppercase text-violet-950" for="floatingInput2">Semester</label>
                            <input type="text" class="block w-full cursor-text appearance-none rounded-md border bg-gradient-to-l from-slate-800 to-violet-900 text-white border-gray-400 bg--100 py-2 px-3 text-sm outline-none" id="floatingInput2" placeholder="Semester" onChange={handleChange} name="up_sem" value={editNotes.up_sem}/>
                        </div>
        
                        <div class="mb-2 mt-2">
                            <label className="mb-2 inline-block text-sm font-medium uppercase text-violet-950" for="floatingInput1">Subject</label>
                            <input type="text" class="block w-full cursor-text appearance-none rounded-md border bg-gradient-to-l from-slate-800 to-violet-900 text-white border-gray-400 bg--100 py-2 px-3 text-sm outline-none" id="floatingInput1" placeholder="Subject" onChange={handleChange} name="up_sub" value={editNotes.up_sub}/>
                        </div>
        
                        <div class="mb-2 mt-2">
                            <label className="mb-2 inline-block text-sm font-medium uppercase text-violet-950" for="floatingInput4">Unit</label>
                            <input type="text" class="block w-full cursor-text appearance-none rounded-md border bg-gradient-to-l from-slate-800 to-violet-900 text-white border-gray-400 bg--100 py-2 px-3 text-sm outline-none" id="floatingInput4" placeholder="Unit" onChange={handleChange} name="up_unit" value={editNotes.up_unit}/>
                        </div>
                        
                        <div class="mb-2 mt-2">
                            <label className="mb-2 inline-block text-sm font-medium uppercase text-violet-950" for="floatingInput3">Other Resources</label>
                            <input type="text" class="block w-full cursor-text appearance-none rounded-md border bg-gradient-to-l from-slate-800 to-violet-900 text-white border-gray-400 bg--100 py-2 px-3 text-sm outline-none" id="floatingInput3" placeholder="Other Resources" onChange={handleChange} name="up_other" value={editNotes.up_other}/>                        </div>
                        <div className="modal-footer">
                            <button className="border rounded-2xl bg-gradient-to-l from-slate-800 to-violet-900 text-gray-300 px-4 py-2 hover:shadow-lg hover:shadow-violet-900" type="submit" data-bs-dismiss="modal">Save</button>
                        </div>
                    </form>
                </div>
                </div>
            </div>
            </div>
                </main>
        </div>
        </div>
    )
}