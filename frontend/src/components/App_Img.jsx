import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';


function App(){
    const [file, setFile] = useState("")
    const [allFile,setAllFiles]=useState([])

    function handleChange(event) {
        setFile(event.target.files[0])
    }


    function handleSubmit(event){
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        }
        Axios.post("http://localhost:3001/upload",{
            file_info:file,
        },config)
        event.preventDefault()
        setFile("")
        // const url = 'http://localhost:3001/image';
        // const formData = new FormData();
        // formData.append('file', file);
        // formData.append('fileName', file.name);
        // const config = {
        // headers: {
        //     'content-type': 'multipart/form-data',
        // },
        // };
        // Axios.post(url, formData, config).then((response) => {
        // console.log(response.data)});
        
    }

    async function getImages(){
        const response=await Axios.get("http://localhost:3001/getImg")
        console.log(response.data)
        setAllFiles(response.data)
    }

    useEffect(()=>{
        getImages();
    },[])

    return(
        <div>
            <form encType="multipart/form-data">
                <input type="file" name="pic" onChange={handleChange}/>
                <button type="submit" onClick={handleSubmit} className="btn btn-success">
                    Upload
                </button>
            </form>
            <div style={{backgroundColor:'red'}}>
                {
                    Array.from(allFile).map(file=>{
                        const path='/public/images/'+file.up_filename
                        return(
                            // <div key={index}>
                                <a href={path} target="_blank"><p>Open PDF</p></a>
                            // </div>
                        )
                    })
                }
            </div>    
            {/* <Link to={'/next'}>Next Page</Link> */}
            {/* <a href="images/<%= filenames %>" target="_blank"><p>Open PDF</p></a> */}

        </div>
    )
}

export default App;