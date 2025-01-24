import { useState } from "react";

export default function DashboardPage() {
    // const [inputValue, setInputValue] = useState("")
    const [postValue, setPostValue] = useState({
        username: "",
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

    const postData = async () => {
        try {
            const response = await fetch(`${baseUrl}/api/users`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(postValue)
            });
            const result = await response.json();
            console.log("POST result: ", result);
            
        } catch (err) {
            console.error("An error happened posting: ", err);
            
        }
    }

    const handlePostChange = (e) => {
        const { name, value } = e.target;
        setPostValue((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handlePostSubmit = (e) => {
        e.preventDefault();
        postData();
    };
    // O60\$"C5Jq7b

    return (
        <>
        
        {/* <form onSubmit={handleSubmit}>
            <input type="number" value={inputValue} onChange={handleChange} placeholder="Submit your query here"/>
            <button type="submit">Submit Query</button>
        </form> */}
        <h2>Create user</h2>
        <form onSubmit={handlePostSubmit}>
        <input
            type="text"
            name="username"
            value={postValue.username}
            onChange={handlePostChange}
            placeholder="Username"
        />
        <input
            type="email"
            name="email"
            value={postValue.email}
            onChange={handlePostChange}
            placeholder="Email"
        />
        <input
            type="password"
            name="password"
            value={postValue.password}
            onChange={handlePostChange}
            placeholder="Password"
        />
        <button type="submit">Create</button>
    </form>
        </>
    )
}