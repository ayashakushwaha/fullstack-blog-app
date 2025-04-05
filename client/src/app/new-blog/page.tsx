"use client"
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { redirect } from 'next/navigation'
import { CreateNewBlog } from "../lib/actions";
import NavBar from "../components/NavBar";

export default function NewBlogForm() {
    const [loading, setLoading] = useState(false)
    return (
        <>
            <NavBar />
            <div className="min-h-screen flex items-center justify-center px-4">
                <div className="w-full max-w-md p-14 bg-blue-800 backdrop-blur-md border border-muted rounded-xl shadow-2xl">
                    <div className="flex flex-col items-center mb-8">
                        <h2 className="text-center text-2xl font-extrabold text-foreground">
                            Add Blog
                        </h2>
                    </div>
                    <form
                        action={async (formData) => {
                            const title = formData.get("title")
                            const content = formData.get("content")
                            const image = formData.get("image")

                            if (!title || !content || !image) {
                                window.alert("All fields are mandatory!")
                                return
                            }

                            setLoading(true);
                            await CreateNewBlog(formData, sessionStorage.getItem("token") || "");
                            setLoading(false);
                            redirect("/dashboard")
                        }}
                        className="space-y-6 my-2"
                    >
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-muted-foreground">
                                Title
                            </label>
                            <input
                                id="title"
                                type="text"
                                name="title"
                                placeholder="enter title..."
                                className="mt-1 block w-full"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="content" className="block text-sm font-medium text-muted-foreground">
                                Content
                            </label>
                            <textarea
                                id="content"
                                name="content"
                                placeholder="enter content..."
                                className="mt-1 block w-full"
                                rows={4}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="image" className="block text-sm font-medium text-muted-foreground">
                                Blog Image
                            </label>
                            <input
                                id="image"
                                type="file"
                                name="image"
                                className="mt-1 block w-full"
                                required
                            />
                        </div>
                        <button
                            className="w-full py-2 bg-blue-400 hover:bg-blue-300 disabled:opacity-75"
                        >
                            {loading ? < p className="">Loading...</p> : "Post"}
                        </button>
                    </form>

                </div>
            </div >
        </>

    );
}
