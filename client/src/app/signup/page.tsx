"use client"
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { handleSignUp } from "../lib/actions";
import NavBar from "../components/NavBar";

export default function SignUp() {
    const [loading, setLoading] = useState(false)


    return (
        <div className="min-h-screen flex items-center justify-center px-4">

            <div className="w-full max-w-md p-14 bg-blue-800 backdrop-blur-md border border-muted rounded-xl shadow-2xl">
                <div className="flex flex-col items-center mb-8">
                    <h2 className="text-center text-2xl font-extrabold text-foreground">
                        SignUp
                    </h2>
                </div>
                <form
                    action={async (formData) => {
                        const name = formData.get("username")
                        const password = formData.get("password")
                        const email = formData.get("email")
                        const profile_image = formData.get("profile_image")
                        const confirmPassword = formData.get("confirmPassword")

                        if (!email || !password || !confirmPassword || !profile_image) {
                            window.alert("All fields are mandatory!")
                            return
                        }
                        if (password !== confirmPassword) {
                            window.alert("Please verify Passwords!")
                            return
                        }

                        setLoading(true);
                        formData.delete("confirmPassword")

                        const response = await handleSignUp(formData);

                        window.alert(response)
                        setLoading(false);
                    }}
                    className="space-y-6 my-2"
                >
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-muted-foreground">
                            Email address
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="you@example.com"
                            className="mt-1 block w-full"
                            required
                            autoComplete="email"
                            pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                            title="Please enter a valid email address"
                        />
                    </div>
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-muted-foreground">
                            username
                        </label>
                        <input
                            id="username"
                            type="text"
                            name="username"
                            placeholder="john devil"
                            className="mt-1 block w-full"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-muted-foreground">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            placeholder="********"
                            className="mt-1 block w-full"
                            required
                            pattern=".{8,}" title="Eight or more characters"
                        />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-muted-foreground">
                            Confirm Password
                        </label>
                        <input
                            id="confirmPassword"
                            type="password"
                            name="confirmPassword"
                            placeholder="********"
                            className="mt-1 block w-full"
                            pattern=".{8,}" title="Eight or more characters"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="profile_image" className="block text-sm font-medium text-muted-foreground">
                            Profile Picture
                        </label>
                        <input
                            id="profile_image"
                            type="file"
                            name="profile_image"
                            className="mt-1 block w-full"
                            required
                        />
                    </div>
                    <button
                        className="w-full py-2 bg-blue-400 hover:bg-blue-300 disabled:opacity-75"
                    >
                        {loading ? < p className="">Loading...</p> : "SignUp"}
                    </button>
                </form>
            </div>
        </div >
    );
}
