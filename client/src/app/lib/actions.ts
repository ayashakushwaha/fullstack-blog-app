"use server"
export async function handleSignUp(data: FormData) {
    let resMessage = ""
    try {
        const response = await fetch("http://localhost:4000/api/auth/signup", {
            method: "POST",
            body: data
        })
        const resJson = await response.json()

        resMessage = resJson?.message || resJson?.error || "error occured!"
    } catch (error) {
        resMessage = "error occured!"
    }

    console.log(resMessage)
    return resMessage;
}

export async function handleLogIn(data: any) {
    let token = null;
    try {
      
        const response = await fetch("http://localhost:4000/api/auth/login", {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        })

        if (!response.ok) {
            throw new Error("Not valid credentials.")
        }
        const resJson = await response.json()
        token = resJson.token
    } catch (error) {
        console.log(error)
    }


    return token;
}


export async function CreateNewBlog(data: FormData, token: string) {
    try {
        const response = await fetch("http://localhost:4000/api/blogs", {
            method: "POST",
            body: data,
            headers: { Authorization: "Bearer " + token }
        })
        console.log(response, "resss")
        const resJson = await response.json()


    } catch (error) {
        console.log(error)
    }
}



export async function getBlogs(token: string) {
    try {
        const response = await fetch("http://localhost:4000/api/blogs", {
            headers: { Authorization: "Bearer " + token }
        })

        console.log(response, "resss")
        const resJson = await response.json()

        return resJson


    } catch (error) {
        console.log(error)
    }
}

export async function getBlogById(id: number, token: string) {
    try {
        const response = await fetch(`http://localhost:4000/api/blogs/${id}`, {
            headers: { Authorization: "Bearer " + token }
        })

        console.log(response, "resss")
        const resJson = await response.json()

        return resJson


    } catch (error) {
        console.log(error)
    }
}

export async function deleteBlog(id: number, token: string) {
    try {
        const response = await fetch(`http://localhost:4000/api/blogs/${id}`, {
            headers: { Authorization: "Bearer " + token },
            method: "DELETE"
        })

        if (!response.ok) {
            throw new Error("Error deleting blog.")
        }
        console.log((await response.json()).message)
    } catch (error) {
        console.log(error)
    }
}

export async function EditBlogById(id: string, token: string, data: FormData) {
    try {
        const response = await fetch(`http://localhost:4000/api/blogs/${id}`, {
            headers: { Authorization: "Bearer " + token },
            method: "PATCH",
            body: data
        })

        if (!response.ok) {
            throw new Error("Error editing blog.")
        }

        console.log((await response.json()))
    } catch (error) {
        console.log(error)
    }
}

export async function getUser(token: string) {
    try {
        const response = await fetch(`http://localhost:4000/api/users/me`, {
            headers: { Authorization: "Bearer " + token },
        })

        if (!response.ok) {
            throw new Error("Error getting user.")
        }
        const resJson = (await response.json())
        console.log(resJson)
        return resJson
    } catch (error) {
        console.log(error)
    }
}