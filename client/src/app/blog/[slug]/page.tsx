"use client"
import NavBar from "@/app/components/NavBar";
import { getBlogById } from "@/app/lib/actions";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function blogById() {
    const [loading, setLoading] = useState(false)
    const [blog, setBlog] = useState({} as {
        id: string;
        title: string;
        content: string;
        image: string;
        user_id: number;
        created_at: string;
    })

    const params = useParams()
    const slug = params?.slug || ""
    const sessionToken = sessionStorage.getItem("token")!

    if (!sessionToken) {
        redirect("/login")
    }

    useEffect(() => {
        const getInfo = async () => {
            const blog = await getBlogById(Number(slug), sessionToken)
            setBlog(blog)
        }

        getInfo()
    }, [])
    return (<>
        <NavBar />
        <div className="w-3xl mx-auto rounded-lg bg-blue-900">
            <a href="#">
                <img className="rounded-t-lg w-full max-h-90" src={blog.image} alt="" />
            </a>
            <div className="p-5">
                <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{blog.title}</h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{blog.content}</p>

            </div>
        </div>
    </>
    )

}