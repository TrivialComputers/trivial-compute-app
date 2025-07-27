import React from "react";
import { useState } from "react";
import "../../index.css";

export default function JoinGame() {
    const [formData, setFormData] = useState({game_id: '', username: ''});

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
        ...formData,
        [name]: value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Include gameId in the data to be sent
        const dataToPost = { ...formData, "host": false };

        fetch('/api/game', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToPost),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch(error => console.error('Error posting data:', error));
    };

    return (
        <>
            <h2>Join Game</h2>

            <form className="join-game-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    placeholder="Username"
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="game_id"
                    value={formData.game_id}
                    placeholder="Game ID"
                    onChange={handleChange}
                />
                <input type="submit" style={{ backgroundColor: "#a1eafb" }} />
            </form>
        </>
    );
}