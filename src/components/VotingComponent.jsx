import { useEffect, useState } from 'react';

const VotingComponent = ({ featureId, initialVoteCount, userVote }) => {
    const [voteCount, setVoteCount] = useState(initialVoteCount);
    const [userVoteState, setUserVoteState] = useState(userVote);
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
    useEffect(() => {
        console.log("voteCount: ", voteCount);
        console.log("userVoteState:", userVoteState);
        
    }, [voteCount, userVoteState])
    
    const postVote = async (vote) => {
        try {
            const token = localStorage.getItem("token")
            if (!token) {
                throw new Error("Unable to retrieve token")
            }
            const response = await fetch(`${apiBaseUrl}/feature-vote`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ featureId, vote }),
            });
            if (!response.ok) return false;
            await response.json();
            console.log("Response: ", response);
            return true;
        } catch {
            console.error("Unable to process vote")
            return false;
        }
    }

    const handleVote = async (vote) => {
        if (!await postVote(vote)) return;
        console.log("past");
        
        if (userVoteState === vote) {
            // User cancels their current vote
            setVoteCount(voteCount - vote);
            setUserVoteState(0);
        } else if (userVoteState === 0) {
            // User adds a new vote
            setVoteCount(voteCount + vote);
            setUserVoteState(vote);
        } else {
            // User switches their vote (e.g., upvote to downvote or vice versa)
            setVoteCount(voteCount + 2 * vote);
            setUserVoteState(vote);
        }
        

    };

    

    return (
        <div>
            <button onClick={() => handleVote(1)} style={{ backgroundColor: userVoteState === 1 ? "green" : "gray"}}>
                Upvote
            </button>
            <span>{voteCount}</span>
            <button onClick={() => handleVote(-1)} style={{ backgroundColor: userVoteState === -1 ? "red" : "gray"}}>
                Downvote
            </button>
        </div>
    );
};

export default VotingComponent;