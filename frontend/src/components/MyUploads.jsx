import React, { useEffect, useState } from "react";
import { useLocation, useNavigate} from "react-router-dom";
import Axios from "axios";
import NavBar from "./NavBar";

export default function My_Uploads(){

    const loc=useLocation();
    const usn=loc.state;

    const nav=useNavigate()

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

    const [editNotes,setNotes]=useState({
        up_dept:"",
        up_sem:"",
        up_sub:"",
        up_unit:"",
        up_other:"",
    });

    // const [editfile,setFile]=useState("")

    function handleChange(event){
        const {name,value}=event.target;
        console.log(event.target)
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
            
            // setFile("")
        }catch(err){
            console.log(err)
        }

    }
    async function handleEdit(fileName){
        const response=await Axios.get(`http://localhost:3001/getEditUploads/${usn}-${fileName}`)
        setNotes(response.data[0])
        console.log(response.data[0])
    }

    async function getMyUploads(){
        const response=await Axios.get(`http://localhost:3001/getMyUploads/${usn}`)
        setUpload(response.data)
    }
    useEffect(()=>{
        getMyUploads();
    },[])

    return (
        <div>
            <NavBar usn={usn}/>
        
        <div>
            My Upload {usn}
            <div className="grid text-center" style={{display:'flex',gap:'2rem'}}>
                {myupload.map(upload=>{
                    const name_with_extension=upload.up_filename.split('_')[1]
                    const name=name_with_extension.split(".")[0]
                    return(
                        <div class="g-col-6" style={{cursor:'pointer'}}>
                            <div class="card text-bg-dark mb-3" style={{maxWidth:'18rem'}}>
                                <div class="card-body">
                                    <h5 class="card-title">{name}</h5>
                                </div>
                                <div style={{display:'flex'}}>
                                    <button type="button" class="card-header btn btn-primary" onClick={()=>handleDelete(upload.up_filename)} style={{width:'50%'}}>Del</button>
                                    <button type="button" class="card-header btn btn-primary" onClick={()=>handleEdit(upload.up_filename)} style={{width:'50%'}} data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button>
                                </div>
                            </div>
                        </div>
                    )
                    })
                }
            </div>


            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form onSubmit={handleSubmit}>
                        
                        <div class="dropdown">
                            <select class="form-control" name="up_dept" value={editNotes.up_dept} onChange={handleChange}>
                                <option>Department</option>
                                <option value="CS">Computer Science</option>
                                <option value="EC">Electronics and Communication</option>
                                <option value="EE">Electrical and Electronics</option>
                            </select> 
                        </div>
        
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" id="floatingInput2" placeholder="Semester" onChange={handleChange} name="up_sem" value={editNotes.up_sem}/>
                            <label for="floatingInput2">Semester</label>
                        </div>
        
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" id="floatingInput1" placeholder="Subject" onChange={handleChange} name="up_sub" value={editNotes.up_sub}/>
                            <label for="floatingInput1">Subject</label>
                        </div>
        
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" id="floatingInput1" placeholder="Unit" onChange={handleChange} name="up_unit" value={editNotes.up_unit}/>
                            <label for="floatingInput1">Unit</label>
                        </div>
                        
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" id="floatingInput3" placeholder="Other Resources" onChange={handleChange} name="up_other" value={editNotes.up_other}/>
                            <label for="floatingInput3">Other Resources</label>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-success" type="submit" data-bs-dismiss="modal">Save</button>
                        </div>
                    </form>
                </div>
                {/* <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div> */}
                </div>
            </div>
            </div>

        </div>
        </div>
    )
}