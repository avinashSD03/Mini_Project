import React from "react";
import { useNavigate } from "react-router-dom";


export default function Home(){
    const nav=useNavigate();
    return(
        <div style={{display:'flex',flexDirection:'column'}}>
                <div className="flex min-h-screen w-screen flex-col bg-gradient-to-l from-slate-800 to-violet-900">
                <header className="relative flex w-screen max-w-screen-xl flex-col overflow-hidden px-4 py-4 text-gray-300 md:mx-auto md:flex-row md:items-center">
                    <div className="flex cursor-pointer items-center whitespace-nowrap text-2xl font-black">
                    {/* <span className="mr-2 text-4xl text-violet-500">
                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M6.925 16.875Q5.2 16.225 4.1 14.713Q3 13.2 3 11.25q0-1.975.938-3.513Q4.875 6.2 6 5.15q1.125-1.05 2.062-1.6L9 3v2.475q0 .625.45 1.062q.45.438 1.075.438q.35 0 .65-.15q.3-.15.5-.425L12 6q.95.55 1.625 1.35t1.025 1.8l-1.675 1.675q-.05-.6-.287-1.175q-.238-.575-.638-1.05q-.35.2-.738.287q-.387.088-.787.088q-1.1 0-1.987-.612Q7.65 7.75 7.25 6.725q-.95.925-1.6 2.062Q5 9.925 5 11.25q0 .775.275 1.462q.275.688.75 1.213q.05-.5.287-.938q.238-.437.588-.787L9 10.1l2.15 2.1q.05.05.1.125t.1.125l-1.425 1.425q-.05-.075-.087-.125q-.038-.05-.088-.1L9 12.925l-.7.7q-.125.125-.212.287q-.088.163-.088.363q0 .3.175.537q.175.238.45.363ZM9 10.1Zm0 0ZM7.4 22L6 20.6L19.6 7L21 8.4L17.4 12H21v2h-5.6l-.5.5l1.5 1.5H21v2h-2.6l2.1 2.1l-1.4 1.4l-2.1-2.1V22h-2v-4.6l-1.5-1.5l-.5.5V22h-2v-3.6Z" /></svg>
                    </span> */}
                       <p className="text-xl text-gray-300 font-bold md:text-2xl lg:text-4xl">EngineerEase</p>
                    </div>
                <input type="checkbox" className="peer hidden" id="navbar-open" />
                <label className="absolute top-5 right-7 cursor-pointer md:hidden" for="navbar-open">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                </label>
                <nav aria-label="Header Navigation" className="flex max-h-0 w-full flex-col items-center justify-between overflow-hidden transition-all peer-checked:mt-8 peer-checked:max-h-56 md:ml-24 md:max-h-full md:flex-row md:items-start">
                <ul className="flex flex-col items-center space-y-2 md:ml-auto md:flex-row md:space-y-0">
                    {/* <li className="font-bold md:mr-12"><a href="#">Pricing</a></li>
                    <li className="md:mr-12"><a href="#">Features</a></li>
                    <li className="md:mr-12"><a href="#">Support</a></li> */}
                    <li className="md:mr-12">
                    <button onClick={()=>{nav('/login')}} className="rounded-full border-2 border-white px-6 py-1 text-gray-300 transition-colors hover:bg-violet-800 hover:text-gray-300">Login</button>
                    </li>
                    <li className="md:mr-12">
                    <button onClick={()=>{nav('/register')}} className="rounded-full border-2 border-white px-6 py-1 text-gray-300 transition-colors hover:bg-violet-800 hover:text-gray-300">Register</button>
                    </li>
                </ul>
                </nav>
            </header>
            <section class="mx-auto flex max-w-lg flex-col px-4 py-10 lg:max-w-screen-xl lg:flex-row" style={{marginBottom:'5rem'}}>
                <div class="max-w-md pr-20 lg:pt-28">
                    <img src="https://assets-global.website-files.com/6009ec8cda7f305645c9d91b/601074ed0f05cd25097215a4_6002086f72b7277e1f01d682_ryan-morrison-illustration-1.png" alt="" />
                </div>
                <div class="">
                    <div class="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-l from-slate-800 to-violet-900 text-gray-300 shadow-lg shadow-indigo-600/20">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z" />
                    </svg>
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
                <div class="absolute -top-7 left-1/2 h-16 w-16 -translate-x-1/2 rounded-xl border-1 p-2"><img class="h-full object-contain" src="/images/favicon.png" alt="" /></div>
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