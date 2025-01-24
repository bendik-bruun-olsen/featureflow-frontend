import { useState } from "react";

export default function usePost() {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [response, setResponse] = useState(null);

	const post = async (url, data = {}) => {
		setIsLoading(true);
		setError(null);

		try {
			const res = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});
			console.log("res: ", res);

			if (!res.ok) {
				console.log("Not okay");
				throw new Error(res.statusText);
			}

			const json = await res.json();
			setResponse(json);
			return json;
		} catch (err) {
			setError(err.message);
			console.error(err);
		} finally {
			setIsLoading(false);
		}
	};

	return { post, isLoading, error, response };
}
