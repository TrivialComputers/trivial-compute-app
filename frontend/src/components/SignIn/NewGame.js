import React from "react";
import { useForm } from "react-hook-form";
import "../../index.css";

function Register() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        const existingUser = JSON.parse(localStorage.getItem(data.username));
        if (existingUser) {
            console.log("Username is already registered!");
        } else {
            const userData = {
                name: data.name,
                username: data.username,
                password: data.password,
            };
            localStorage.setItem(data.username, JSON.stringify(userData));
            console.log(data.name + " has been successfully registered");
        }
    };

    return (
        <>
            <h2>Registration Form</h2>

            <form className="sign-in-form" onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="text"
                    {...register("name", { required: true })}
                    placeholder="Name"
                />
                {errors.name && <span style={{ color: "red" }}>*Name* is mandatory</span>}

                <input
                    type="username"
                    {...register("username", { required: true })}
                    placeholder="Username"
                />
                {errors.username && <span style={{ color: "red" }}>*Username* is mandatory</span>}

                <input
                    type="password"
                    {...register("password", { required: true })}
                    placeholder="Password"
                />
                {errors.password && <span style={{ color: "red" }}>*Password* is mandatory</span>}

                <input type="submit" style={{ backgroundColor: "#a1eafb" }} />
            </form>
        </>
    );
}

export default Register;