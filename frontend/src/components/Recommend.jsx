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
        width: "40%",
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
                    <div className="border rounded-3xl shadow-xl shadow-violet-900" style={containerStyle}>
                        <h1 className="text-violet-900 text-center text-3xl pb-4">Book Recommendation System</h1>
                        <form style={{textAlign:'center'}} onSubmit={handleRecommend}>
                            <label className="mb-4 block text-violet-900 text-center text-2xl" for="partial_input">Enter part of a book title:</label>
                            <input className="py-2 px-3 border rounded-2xl" type="text" onChange={handleChange} style={textInputStyle} id="partial_input" name="partial_input" required />
                            <button className="mt-2 block w-1/5 border rounded-2xl bg-gradient-to-l from-slate-800 to-violet-900 text-gray-300 px-4 py-2 hover:shadow-lg hover:shadow-violet-900 ml-64" type="submit">Submit</button>
                        </form>
                        <h2 className="text-violet-900 text-center text-xl my-4">Recommended Books:</h2>
                        <ul style={ulStyle}>
                            {allBooks.map(book=>{
                                return(
                                    <li style={liStyle}><strong>{book.idbook}</strong> {book.title}</li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
        </div>
    )
}