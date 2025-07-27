import React from "react";
import { useState } from "react";
import "../../index.css";
import { TextField, Button, Stack, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function JoinGame() {
    const [username, setUsername] = useState("");
    const [gameCode, setGameCode] = useState("");
    const navigate = useNavigate();

    const joinExistingGame = (e) => {
        e.preventDefault();
        // Include gameId in the data to be sent
        const dataToPost = { username, gameCode };

        fetch('/api/join_game', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToPost),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            navigate(data.redirect_url);
        })
        .catch(error => console.error('Error posting data:', error));
    };

    return (
        <>
            <Stack direction="row" spacing={2} sx={{ margin: 2 }}>
                <Box sx={{ flex: 1 }}>
                    <TextField
                    required
                    id="username"
                    label="Username"
                    fullWidth
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    />
                </Box>
                <Box sx={{ flex: 1 }}>
                    <TextField
                    required
                    id="gameCode"
                    label="Game Code"
                    fullWidth
                    value={gameCode}
                    onChange={(e) => setGameCode(e.target.value)}
                    />
                </Box>
                <Button variant="outlined" onClick={e => joinExistingGame(e)} >Submit</Button>
            </Stack>
        </>
    );
}