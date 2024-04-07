import React, { useEffect, useState } from "react";
import Axios from "axios";

export default function Admin(){
    const [allPdf,setPdf]=useState([]);

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
        window.location.reload();
        alert(response.data)
    }

    return(
        <div>
            Admin
            {allPdf.map(pdf=>{
                        const path="/files/"+pdf.up_filename
                        const name_with_extension=pdf.up_filename.split('_')[1]
                        const name=name_with_extension.split(".")[0]
                        return(
        
                            <div className="g-col-6" style={{cursor:'pointer'}}>
                                <div className="card mb-3" style={pdf.up_isvalid?{backgroundColor:"green",maxWidth:'18rem'}:{backgroundColor:"red",maxWidth:'18rem'}}>
                                    <div className="card-body" style={{display:'flex',justifyContent:'space-between'}}>
                                        <h5 className="card-title"><a href={path} target="_blank"><p>{name}</p></a></h5>
                                        <button onClick={()=>validate(pdf.up_filename,!pdf.up_isvalid)}>
                                            {pdf.up_isvalid?<span>&#10060;</span>:<span>&#9989;</span>}
                                        </button>
                                    </div>
                                </div>
                            </div>
        
                        )
                        })
            }
        </div>
    )
}