"use client"
import Image from "next/image"
import { redirect } from "next/navigation"
import NavBar from "../components/NavBar"
import Blog from "../components/Blog"
import { useEffect, useState } from "react"
import { deleteBlog, getBlogById, getBlogs, getUser } from "../lib/actions"
import Link from "next/link"




export default function BlogList() {
    const [blogList, setBlogList] = useState([] as { id: number; title: string; content: string; image: string, user_id: number, created_at: string }[])
    const [user, setUser] = useState({} as {
        id: string
        username: string;
        email: string;
        password: string;
        profile_image: string;
        created_at: string
    })

    const sessionToken = sessionStorage.getItem("token")!
    if (!sessionToken) {
        redirect("/")
    }

    useEffect(() => {
        const getInfo = async () => {
            const blogs = await getBlogs(sessionToken)
            const user = await getUser(sessionToken)
            setBlogList(blogs)
            setUser(user)
            localStorage.setItem("userid", user.id)
        }

        getInfo()
    }, [])

    return (
        <div className="space-y-10 mb-20 ">
            <NavBar />
            {blogList.length > 0 ?
                <div className="space-y-8 justify-items-center">
                    <div className="my-8 text-4xl font-extrabold leading-none text-blue-100">Blog List</div>
                    {blogList.map((blog) =>
                        <div className="flex w-2xl bg-blue-900 rounded-lg  p-6">
                            <img className="w-50" src={blog.image} alt="" />
                            <div className="mx-15 flex flex-col ">
                                <div className="flex-auto space-y-3">
                                    <h5 className=" text-2xl font-bold tracking-tight text-white ">{blog.title}</h5>
                                    <p className="font-normal text-gray-400 ">{blog.content}</p>
                                    <Link href={`/blog/${blog.id}`} className="text-sm font-medium text-white underline hover:text-blue-300">
                                        Read more...
                                    </Link>
                                </div>
                                <div className="space-x-5 ">
                                    <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700" onClick={
                                        async () => {
                                            const myBlog = await getBlogById(blog.id, sessionToken)
                                            const user_id = localStorage?.getItem("userid") || ""

                                            if (user_id != myBlog.user_id) {
                                                window.alert("You can not edit this Blog.")
                                                return
                                            }

                                            redirect(`/edit-blog/${myBlog.id}`)
                                        }
                                    } >
                                        Edit
                                    </button>

                                    <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-red-800 rounded-lg hover:bg-red-900" onClick={async () => {
                                        await deleteBlog(blog.id, sessionToken)
                                        const blogs = await getBlogs(sessionToken);
                                        setBlogList(blogs)
                                    }}>
                                        Delete
                                    </button>
                                </div>

                            </div>
                        </div>
                    )}
                </div> : <p className="text-center">No blogs yet.</p>}
        </div>
    )
}
