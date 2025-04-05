"use client"
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { handleLogIn } from "./lib/actions";
import { redirect } from 'next/navigation'

export default function Home() {
  const [loading, setLoading] = useState(false)
  const sessionToken = sessionStorage?.getItem("token")!
  if (sessionToken) {
    redirect("/dashboard")
  }
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md p-14 bg-blue-800 backdrop-blur-md border border-muted rounded-xl shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          <h2 className="text-center text-2xl font-extrabold text-foreground">
            Login
          </h2>
        </div>
        <form
          action={async (formData) => {
            const password = formData.get("password")
            const email = formData.get("email")
            var data: any = {};

            formData.forEach((value, key) => data[key] = value);


            if (!email || !password) {
              window.alert("All fields are mandatory!")
              return
            }

            setLoading(true);
            const token = await handleLogIn(data);
            sessionStorage.setItem("token", token)
            redirect("/dashboard")

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
          <button
            className="w-full py-2 bg-blue-400 hover:bg-blue-300 disabled:opacity-75"
          >
            {loading ? < p className="">Loading...</p> : "LogIn"}
          </button>
        </form>
        <p>Don't have an account? Click here to {" "}
          <Link
            className="w-full text-yellow-400 underline hover:text-yellow-300"
            href="/signup"
          >
            SignUp
          </Link></p>
      </div>
    </div >
  );
}
