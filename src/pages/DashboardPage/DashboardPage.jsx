import { useState } from "react";

export default function DashboardPage() {
    // const [inputValue, setInputValue] = useState("")
    const [postValue, setPostValue] = useState({
        username: "",
        email: "",
        password: ""
    })
    const [loginValue, setLoginValue] = useState({
        email: "",
        password: ""
    })
    // const [data, setData] = useState("")
    const baseUrl = "http://localhost:3001"

    // const fetchData = async () => {
    //     try {
    //         const response = await fetch(`${baseUrl}/api/users/${inputValue}`)
    //         const result = await response.json();
    //         console.log("result: ", result); 
    //     } catch (e) {
    //         console.error("An error happened fetching: ", e);
    //     }
    // }

    const signupUser = async () => {
        try {
            const response = await fetch(`${baseUrl}/api/user/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(postValue)
            });
            const result = await response.json();
            console.log("Signup result: ", result);
            
        } catch (err) {
            console.error("An error happened signing up: ", err);
            
        }
    }
    
    const loginUser = async () => {
        try {
            const response = await fetch(`${baseUrl}/api/user/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginValue)
            });
            const result = await response.json();
            if (!response.ok) {
                throw new Error(response.message)
            }
            console.log("Login result: ", result);
            localStorage.setItem("token", result.token)
            
            
        } catch (err) {
            console.error("An error happened logging in: ", err);
            
        }
    }

    const handleSignupChange = (e) => {
        const { name, value } = e.target;
        setPostValue((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginValue((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    const handlePostSubmit = (e) => {
        e.preventDefault();
        signupUser();
    };
    
    const handleLogin = (e) => {
        e.preventDefault();
        loginUser();
    }

    return (
        <>
        
        {/* <form onSubmit={handleSubmit}>
            <input type="number" value={inputValue} onChange={handleChange} placeholder="Submit your query here"/>
            <button type="submit">Submit Query</button>
        </form> */}
        <div>
        <h2>Create user</h2>
        <form onSubmit={handlePostSubmit}>
        <input
            type="text"
            name="username"
            value={postValue.username}
            onChange={handleSignupChange}
            placeholder="Username"
        />
        <input
            type="email"
            name="email"
            value={postValue.email}
            onChange={handleSignupChange}
            placeholder="Email"
        />
        <input
            type="password"
            name="password"
            value={postValue.password}
            onChange={handleSignupChange}
            placeholder="Password"
            minLength={8}
            maxLength={255}
        />
        <button type="submit">Create</button>
    </form>
    <div>
        <h2>Log user in</h2>
        <form onSubmit={handleLogin}>
        <input
            type="email"
            name="email"
            value={loginValue.email}
            onChange={handleLoginChange}
            placeholder="Email"
            maxLength={320}
        />
        <input
            type="password"
            name="password"
            value={loginValue.password}
            onChange={handleLoginChange}
            placeholder="Password"
            minLength={8}
            maxLength={255}
        />
        <button type="submit">Log in</button>
        </form>
    </div>
            
        </div>
        </>
    )
}