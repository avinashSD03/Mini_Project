import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Axios from "axios";
import NavBar from "./NavBar";
import Header from "./Header";

export default function Notes() {

    const param = useParams();
    const sem = param.semId;
    const nav = useNavigate();
    const [uniqueDept, setUniqueDept] = useState([]);
    const loc = useLocation();
    const usn = loc.state;

    function handleClick(dept) {
        nav('/notes/dept/' + dept, { state: { sem: sem, usn: usn } })
    }

    async function getUnique_Dept() {
        const response = await Axios.get(`http://localhost:3001/getUniqueDept/${sem}`)
        setUniqueDept(response.data)
    }
    useEffect(() => {
        getUnique_Dept();
    }, [])

    return (
        <div className="flex min-h-screen w-screen w-full bg-gray-300">
            <NavBar usn={usn} />
            <div class="flex h-full w-full flex-col">
                <Header usn={usn} />
                <main id="dashboard-main" class="md:h-[calc(100vh-10rem)] md:ml-[calc(100vh-26rem)] md:mt-[calc(100vh-40rem)] sm:h-[calc(100vh-10rem)] sm:ml-[calc(100vh-42rem)] sm:mt-[calc(100vh-40rem)] overflow-auto px-4 py-10">
                    <nav aria-label="breadcrumb" className="flex w-fit m-4 p-2 border rounded-2xl bg-gradient-to-l from-slate-800 to-violet-900">
                        <ol className="breadcrumb my-2">
                            <button className="breadcrumb-item text-gray-300" onClick={() => { nav('/home', { state: usn }) }}>Semester &gt;</button>
                            <li className="!text-gray-400" aria-current="page">Department</li>
                        </ol>
                    </nav>
                    <div class="flex flex-wrap gap-x-20 gap-y-12 p-4">
                        {uniqueDept.map(dept => {
                            return (
                                <div class="rounded-xl text-2xl bg-gradient-to-l from-slate-800 to-violet-900 p-10 text-gray-300 hover:shadow-xl hover:shadow-violet-900  mr-4"
                                    onClick={() => handleClick(dept.up_dept)} style={{ cursor: 'pointer' }}>

                                    {dept.up_dept}

                                </div>
                            )
                        })
                        }
                    </div>
                </main>
            </div>
        </div>
    )
}