"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import { getUser } from "../lib/actions";
import { redirect } from "next/navigation";


export default function NavBar() {
    const [user, setUser] = useState({} as {
        id: string
        username: string;
        email: string;
        password: string;
        profile_image: string;
        created_at: string
    })

    const sessionToken = sessionStorage.getItem("token")!


    useEffect(() => {
        const getInfo = async () => {

            const user = await getUser(sessionToken)

            setUser(user)
            localStorage.setItem("userid", user.id)
        }

        getInfo()
    }, [])

    return (
        <>
            <nav className="bg-blue-900 border-gray-200 mb-5">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
                    <Link href="/dashboard" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <span className="self-center text-2xl font-semibold whitespace-nowrap ">Blogger</span>
                    </Link>
                    <div className="flex items-center space-x-6 rtl:space-x-reverse">
                        <Link href="/new-blog" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2 text-center ">Add Blog</Link>
                        <img src={user?.profile_image} className="w-10 h-10 rounded-full" alt="blogger Logo" />
                    </div>
                </div>
            </nav>
        </>



    )
}