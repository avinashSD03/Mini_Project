import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from '../logoG.jpeg';

export default function Home(){

    const nav=useNavigate();

    return(
        <div style={{display:'flex',flexDirection:'column'}}>
                <div className="flex min-h-screen w-screen flex-col bg-gradient-to-l from-slate-800 to-violet-900">
                <header className="relative flex w-screen items-center max-w-screen-9xl flex-col overflow-hidden px-0 py-4 text-gray-300 md:flex-row md:items-center md:mt-4">
                    <div className="flex cursor-pointer items-center whitespace-nowrap text-2xl font-black sm:gap-20 md:gap-12">
                        <img src={Logo} alt="Logo" className="md:h-26 md:w-50 md:rounded-3xl md:ml-16 sm:h-20 sm:w-30 sm:rounded-full sm:ml-6" />                    
                       <p className="text-gray-300 font-bold md:text-6xl lg:text-6xl">EngineerEase</p>
                    </div>
                <input type="checkbox" className="peer hidden" id="navbar-open" />
                <label className="absolute top-5 right-7 cursor-pointer md:hidden" for="navbar-open">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                </label>
                <nav aria-label="Header Navigation" className="flex max-h-0 w-full flex-col items-center justify-between overflow-hidden transition-all peer-checked:mt-8 peer-checked:max-h-56 md:ml-24 md:max-h-full md:flex-row md:items-start">
                <ul className="flex flex-col items-center space-y-2 md:ml-64 md:pl-28 md:flex-row md:space-y-0 md:mt-4">
                    <li className="md:mr-12">
                    <button onClick={()=>{nav('/adminLogin')}} className="rounded-full border-2 border-white px-6 py-1 text-gray-300 transition-colors hover:shadow-xl hover:shadow-gray-200 hover:font-bold">Admin Login</button>
                    </li>
                    <li className="md:mr-12">
                    <button onClick={()=>{nav('/login')}} className="rounded-full border-2 border-white px-6 py-1 text-gray-300 transition-colors hover:shadow-xl hover:shadow-gray-200 hover:font-bold">Login</button>
                    </li>
                    <li className="md:mr-12">
                    <button onClick={()=>{nav('/register')}} className="rounded-full border-2 border-white px-6 py-1 text-gray-300 transition-colors hover:shadow-xl hover:shadow-gray-200 hover:font-bold">Register</button>
                    </li>
                </ul>
                </nav>
            </header>
            <section class="mx-auto flex max-w-lg flex-col px-4 py-10 lg:max-w-screen-xl lg:flex-row" style={{marginBottom:'5rem'}}>
                <div class="max-w-md pr-20 lg:pt-28">
                    <img src="https://assets-global.website-files.com/6009ec8cda7f305645c9d91b/601074ed0f05cd25097215a4_6002086f72b7277e1f01d682_ryan-morrison-illustration-1.png" alt="" />
                </div>
                <div class="">
                    <div class="mb-5 flex h-16 w-16 items-center justify-center">
                    </div>
                    <h2 class="mb-10 max-w-lg text-4xl font-bold leading-snug lg:text-5xl text-gray-300 lg:leading-snug">a <span className="text-violet-500">collaborative</span> platform designed for engineering peers</h2>
                    <div class="grid gap-y-12 gap-x-8 lg:grid-cols-2">
                    <div>
                        <p class="mb-6 border-l-4 text-gray-300 pl-4 text-2xl leading-10">Resource Hub</p>
                        <p class="text-lg text-gray-300">Access a vast collection of study materials, lecture notes shared by peer group</p>
                    </div>
                    <div>
                        <p class="mb-6 border-l-4 text-gray-300 pl-4 text-2xl leading-10">Community Interaction</p>
                        <p class="text-lg text-gray-300">Foster a sense of community among students by encouraging them to contribute to and benefit from a shared pool of resources</p>
                    </div>
                    <div>
                        <p class="mb-6 border-l-4 text-gray-300 pl-4 text-2xl leading-10">Textbook Recommendation</p>
                        <p class="text-lg text-gray-300">Find comprehensive textbook recommendations tailored to your specific courses and subjects, helping you excel in your studies</p>
                    </div>
                    <div>
                        <p class="mb-6 border-l-4 text-gray-300 pl-4 text-2xl leading-10">Collaboration</p>
                        <p class="text-lg text-gray-300">Facilitate peer-to-peer learning opportunities where students can exchange ideas, discuss concepts, and support each other's academic progress</p>
                    </div>
                    </div>
                </div>
            </section>
            </div>
            <hr ></hr>
            <footer class="relative bg-gradient-to-l from-slate-800 to-violet-900 px-4 pt-20">
                <div class="absolute -top-7 left-1/2 h-16 w-16 -translate-x-1/2 rounded-xl border-1"><img className="h-full object-contain rounded-xl" src={Logo} alt="" /></div>
                {/* <nav aria-label="Footer Navigation" class="mx-auto mb-10 flex max-w-lg flex-col gap-10 text-center sm:flex-row sm:text-left">
                    <a href="#" class="font-medium text-gray-300">Demo</a>
                    <a href="#" class="font-medium text-gray-300">Support</a>
                    <a href="#" class="font-medium text-gray-300">Privacy Policy</a>
                    <a href="#" class="font-medium text-gray-300">Terms & Conditions</a>
                </nav> */}
                <p class="py-10 text-center text-gray-300">© 2024 EngineerEase | All Rights Reserved</p>
            </footer>
        </div>
    )
}