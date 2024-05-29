import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Axios from 'axios';
import NavBar from "./NavBar";
import Header from "./Header";

export default function Recommend(){

    const nav=useNavigate();
    const loc=useLocation();
    const usn=loc.state;
    const [book,setBook]=useState("")
    const [allBooks,setAll]=useState([]);

    const containerStyle={
        margin: "50px ",
        padding: "20px",
    }
    const textInputStyle={
        width: "25%",
        // padding: "10px",
        // fontSize: "16px",
        // borderRadius: "5px",
        border: "1px solid #ccc"
    }
    // const submitInputStyle={
    //     width: "auto",
    //     padding: "10px 20px",
    //     fontSize: "16px",
    //     borderRadius: "5px",
    //     border: "none",
    //     backgroundColor: "#007bff",
    //     color: "#fff",
    //     cursor: "pointer",
    //     transition: "backgroundColor 0.3s ease",
    // }
    const ulStyle={
        listStyleType: "none",
        padding: "0"
    }
    const liStyle={
        marginBottom: "10px",
        backgroundColor: "#f9f9f9",
        padding: "10px",
        borderRadius: "5px",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    }

    function handleChange(event){
        const {value}=event.target;
        setBook(value)
    }
    async function handleRecommend(event){
        event.preventDefault()
        const api = Axios.create({
            baseURL: 'http://localhost:5000',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000'  // Allow requests only from http://localhost:3000
            }
        });
        
        // Make POST request
        const response = await api.post('/recommend', {
            partial_input: book
        });
        // const response = await Axios.post('http://localhost:5000/recommend', {
        //     partial_input: book
        // });
        const recommendations = response.data.recommendations;
        console.log(recommendations);
        setAll(recommendations)
    }

    return(
        <div className="flex min-h-screen w-screen w-full bg-gray-300">
            <NavBar usn={usn}/>
                <div class="flex h-full w-full flex-col">
                    <Header usn={usn}/>
                    <main id="dashboard-main" class="md:h-[calc(100vh-10rem)] md:ml-[calc(100vh-26rem)] md:mt-[calc(100vh-38rem)] sm:h-[calc(100vh-10rem)] sm:ml-[calc(100vh-42rem)] sm:mt-[calc(100vh-40rem)] overflow-auto px-4">
                    <div className="border rounded-3xl shadow-xl shadow-violet-900" style={containerStyle}>
                        <h1 className="text-violet-900 text-center text-3xl pb-4">Book Recommendation System</h1>
                        <form style={{textAlign:'center'}} onSubmit={handleRecommend}>
                            <label className="mb-2 block text-violet-900 text-2xl" for="partial_input">Enter Search Key</label>
                            <div className="relative">
                                <input className="py-2 px-3 border rounded-2xl text-center" type="text" onChange={handleChange} style={textInputStyle} id="partial_input" name="partial_input" required autoComplete="off"/>
                                <button className="absolute top-12 right-56 md:mr-40 sm:mr-2 w-1/8 border rounded-2xl bg-gradient-to-l from-slate-800 to-violet-900 text-gray-300 px-4 py-2 hover:shadow-lg hover:shadow-violet-900 ml-64" type="submit">Submit</button>
                            </div>
                        </form>
                        <h2 className="text-violet-900 text-2xl mt-16 mb-6">Recommended Books</h2>
                        <ul style={ulStyle}>
                            {allBooks.map(book=>{
                                return(
                                    <li style={liStyle}>{book.title}</li>
                                )
                            })}
                        </ul>
                    </div>
                    </main>
                </div>
        </div>
    )
}