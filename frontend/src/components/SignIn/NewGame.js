import React from "react";
import { useForm } from "react-hook-form";
import "../../index.css";
import { TextField, Button, Stack, Box } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NewGame() {
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    const createGame = (e) => {
        e.preventDefault();
        const dataToPost = { username };

        fetch('/api/create_game', {
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
    }

    return (
        <>
            <Stack direction="row" spacing={2} sx={{ margin: 2 }}>
                <Box sx={{ flex: 1.5 }}>
                    <TextField
                        required
                        id="username"
                        label="Username"
                        fullWidth
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Box>
                <Button variant="outlined" onClick={e => createGame(e)} >Create Game</Button>
            </Stack>
        </>
    );
}