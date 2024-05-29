import React, { useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {

    const [newUser, setNewUser] = useState({
        stu_name: "",
        usn: "",
        sem: "",
        dept: "",
        pswd: ""
    });
    const nav = useNavigate();

    function handleChange(event) {
        const { name, value } = event.target;
        setNewUser(prevUser => {
            return {
                ...prevUser,
                [name]: value
            };
        });
    }

    function handleRegister(event) {
        console.log(newUser)
        event.preventDefault();
        try {
            Axios.post("http://localhost:3001/register", {
                name: newUser.stu_name,
                usn: newUser.usn,
                sem: newUser.sem,
                dept: newUser.dept,
                pswd: newUser.pswd
            })
                .then((response) => {
                    if (response.data === "registered") nav('/login')
                    else {
                        alert("user already registered")
                    }
                })
                .catch(e => {
                    console.log(e)
                })
            setNewUser({
                stu_name: "",
                usn: "",
                sem: "",
                dept: "",
                pswd: ""
            });
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <div className="flex min-h-screen w-screen w-full items-center justify-center flex-col bg-gradient-to-l from-slate-800 to-violet-900">
                <div className="relative">

                    <div className="hidden sm:block h-56 w-56 text-indigo-300 absolute a-z-10 -left-20 -top-10">
                        <svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='a' patternUnits='userSpaceOnUse' width='40' height='40' patternTransform='scale(0.6) rotate(0)'><rect x='0' y='0' width='100%' height='100%' fill='none' /><path d='M11 6a5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5 5 5 0 015 5' stroke-width='1' stroke='none' fill='currentColor' /></pattern></defs><rect width='800%' height='800%' transform='translate(0,0)' fill='url(#a)' /></svg>
                    </div>
                    <div className="hidden sm:block h-28 w-28 text-indigo-300 absolute a-z-10 -right-20 -bottom-5" >
                        <svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='b' patternUnits='userSpaceOnUse' width='40' height='40' patternTransform='scale(0.5) rotate(0)'><rect x='0' y='0' width='100%' height='100%' fill='none' /><path d='M11 6a5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5 5 5 0 015 5' stroke-width='1' stroke='none' fill='currentColor' /></pattern></defs><rect width='800%' height='800%' transform='translate(0,0)' fill='url(#b)' /></svg>
                    </div>
                    <div className="relative flex flex-col sm:w-[40rem] rounded-lg border-gray-400 bg-gray-300 shadow-lg px-4">
                        <div className="flex-auto p-6">
                            <div className="mb-10 flex flex-shrink-0 flex-grow-0 items-center justify-center overflow-hidden">
                                <div className="flex cursor-pointer items-center gap-2 text-indigo-500 no-underline hover:text-indigo-500">
                                    <span className="flex-shrink-0 text-3xl font-black tracking-tight opacity-100 text-violet-900">EngineerEase</span>
                                </div>
                            </div>
                            <h4 className="mb-2 font-medium text-violet-900 xl:text-xl text-center">Welcome to EngineerEase!</h4>

                            <form className="mb-4" onSubmit={handleRegister} autoComplete="off">
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <div className="mb-4" style={{ flex: '1 1 auto', width: '50%' }}>
                                        <label for="email" className="mb-2 inline-block text-sm font-medium uppercase text-violet-950">Student Name</label>
                                        <input className="block w-full cursor-text appearance-none rounded-md border bg-gradient-to-l from-slate-800 to-violet-900 text-white border-gray-400 bg--100 py-2 px-3 text-sm outline-none"
                                            id="email"
                                            type="text"
                                            placeholder="Student Name"
                                            onChange={handleChange}
                                            name="stu_name"
                                            value={newUser.stu_name}
                                            required />
                                        <span className="my-2 block"></span>
                                    </div>
                                    <div className="mb-4" style={{ flex: '1 1 auto', width: '50%' }}>
                                        <label for="email" className="mb-2 inline-block text-sm font-medium uppercase text-violet-950">USN</label>
                                        <input className="block w-full cursor-text appearance-none rounded-md border bg-gradient-to-l from-slate-800 to-violet-900 text-white border-gray-400 bg--100 py-2 px-3 text-sm outline-none"
                                            id="email"
                                            type="text"
                                            placeholder="USN"
                                            onChange={handleChange}
                                            name="usn"
                                            value={newUser.usn}
                                            required />
                                        <span className="my-2 block"></span>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <div className="mb-4" style={{ flex: '1 1 auto', width: '50%' }}>
                                        <label for="email" className="mb-2 inline-block text-sm font-medium uppercase text-violet-950">Semester</label>
                                        <input className="block w-full cursor-text appearance-none rounded-md border bg-gradient-to-l from-slate-800 to-violet-900 text-white border-gray-400 bg--100 py-2 px-3 text-sm outline-none"
                                            id="email"
                                            type="number"
                                            min="1"
                                            max="8"
                                            placeholder="Semester"
                                            onChange={handleChange}
                                            name="sem"
                                            value={newUser.sem}
                                            required />
                                        <span className="my-2 block"></span>
                                    </div>
                                    <div className="mb-4" style={{ flex: '1 1 auto', width: '50%' }}>
                                        <label for="email" className="mb-2 inline-block text-sm font-medium uppercase text-violet-950">Department</label>
                                        <select id="email" name="dept" value={newUser.dept} onChange={handleChange} class="bg-gradient-to-l from-slate-800 to-violet-900 text-gray-300 border cursor-pointer text-sm rounded-md outline-none block w-full py-2 px-3 dark:bg-violet-950" required>
                                            <option >Select</option>
                                            <option value="CS">Computer Science</option>
                                            <option value="EC">Electronics and Communication</option>
                                            <option value="EE">Electrical and Electronics</option>
                                        </select>
                                        <span className="my-2 block"></span>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label for="email" className="mb-2 inline-block text-sm font-medium uppercase text-violet-950">Set Password</label>
                                    <input className="block w-full cursor-text appearance-none rounded-md border bg-gradient-to-l from-slate-800 to-violet-900 text-white border-gray-400 bg--100 py-2 px-3 text-sm outline-none"
                                        id="email"
                                        type="password"
                                        placeholder="**********"
                                        onChange={handleChange}
                                        name="pswd"
                                        value={newUser.pswd}
                                        required />
                                    <span className="my-2 block"></span>
                                </div>
                                <div className="flex items-center" >
                                    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                        <button className="grid w-full cursor-pointer select-none rounded-md border border-indigo-500 bg-gradient-to-l from-slate-800 to-violet-900 py-2 px-5 text-center align-middle text-md text-white shadow hover:border-indigo-600 hover:bg-indigo-600 hover:text-white focus:border-indigo-600 focus:bg-indigo-600 focus:text-white focus:shadow-none"
                                            type="submit">Register</button>
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2rem' }}>
                                            <div className="mb-4 text-xl font-black leading-4 sm:text-xl xl:text-xl">Already Have an Account?</div>
                                            <Link className="grid w-full cursor-pointer select-none rounded-md border border-indigo-500 bg-gradient-to-l from-slate-800 to-violet-900 py-2 px-5 text-center align-middle text-md text-white shadow hover:border-indigo-600 hover:bg-indigo-600 hover:text-white focus:border-indigo-600 focus:bg-indigo-600 focus:text-white focus:shadow-none"
                                                style={{ width: '50%' }} to={'/login'}>LOGIN</Link>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}