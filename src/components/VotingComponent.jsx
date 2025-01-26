import { useState } from 'react';

const VotingComponent = ({ featureId, initialVoteCount, userVote }) => {
    const [voteCount, setVoteCount] = useState(initialVoteCount);
    const [userVoteState, setUserVoteState] = useState(userVote);
    const [isProcessingVote, setIsProcessingVote] = useState(false);
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
    
    const postVote = async (vote) => {
        setIsProcessingVote(true)
        try {
            const token = localStorage.getItem("token")
            if (!token) {
                throw new Error("Unable to retrieve token. Please log in again")
            }
            const response = await fetch(`${apiBaseUrl}/feature-vote`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ featureId, vote }),
            });
            const responseData = await response.json()
            if (!response.ok) {
                throw new Error(responseData);
              }
            return true;
        } catch (err){
            console.error(err)
            return false;
        } finally {
            setIsProcessingVote(false);
        }
    }

    const handleVote = async (vote) => {
        if (isProcessingVote) return;
        const voteSuccess = await postVote(vote);
        if (!voteSuccess) return;

        if (userVoteState === vote) {
            setVoteCount(voteCount - vote);
            setUserVoteState(0);
        } else if (userVoteState === 0) {
            setVoteCount(voteCount + vote);
            setUserVoteState(vote);
        } else {
            setVoteCount(voteCount + 2 * vote);
            setUserVoteState(vote);
        }
    };

    return (
        <div className="d-flex flex-column align-items-center px-2">
            <i className="bi bi-caret-up-fill fs-4" onClick={() => handleVote(1)} style={{ cursor: "pointer", color: userVoteState === 1 ? "green" : "gray"}} />
            <span className="fs-4">{voteCount}</span>
            <i className="bi bi-caret-down-fill fs-4" onClick={() => handleVote(-1)} style={{ cursor: "pointer", color: userVoteState === -1 ? "red" : "gray"}} />
        </div>
    );
};

export default VotingComponent;