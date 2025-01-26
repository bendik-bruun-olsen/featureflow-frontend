import { useState } from "react";

export default function usePost() {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const post = async (url, data = {}) => {
		console.log("Posting");

		setIsLoading(true);
		setError(null);

		try {
			const token = localStorage.getItem("token");
			const headers = { "Content-Type": "application/json" };
			if (token) headers.Authorization = `Bearer ${token}`;

			const res = await fetch(url, {
				method: "POST",
				headers: headers,
				body: JSON.stringify(data),
			});
			console.log("res: ", res);

			if (!res.ok) {
				throw new Error(res.statusText);
			}

			const json = await res.json();
			return json;
		} catch (err) {
			setError(err.message);
			console.error(err);
		} finally {
			setIsLoading(false);
		}
	};

	return { post, isLoading, error };
}
