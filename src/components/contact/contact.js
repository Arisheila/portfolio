"use client"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
// import Head from "next/head"
// emailjs
// import emailjs from "@emailjs/browser"; 

import emailjs from "emailjs-com";// Import the emailjs library
// react toast for alert message
// import { toast, ToastContainer } from 'react-toastify';
import {toast, ToastContainer} from "react-toastify";


import 'react-toastify/dist/ReactToastify.css';



import {
	TextField,
	Button,
	Grid,
	Typography,
	Card,
	CardContent,
	CircularProgress,
} from "@mui/material"



export default function Contact() {
	const { register, handleSubmit, reset,formState: { errors ,isValid }}= useForm({
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			message: "",
			subject: "",
		},
	})

	// loading state
	const [isLoading, setIsLoading] = useState(false)

	// messagestate
	
	const [message, setMessage] = useState(" ");

	// onsubmit fnctionality

	const onSubmit = async (data) => {
		try {
		  setIsLoading(true);
		  console.log(data);
	
		  // Simulating an asynchronous action (e.g., sending an email)
		  await new Promise((resolve) => setTimeout(resolve, 2000));
	
		  // Sending email using emailjs
		  await emailjs.send('service_09tfzns', 'template_ajfjj3m', data, 'gzLG0jWnp_SpxeUJd');
	
		  // Show a success toast
		  toast.success('Email successfully sent!', { autoClose: 3000 });
	
		  // Reset the form after submission
		  reset();
		} catch (error) {
		  console.error('Error submitting form:', error);
		  // Show an error toast
		  toast.error('Error submitting form. Please try again later.', { autoClose: 3000 });
		} finally {
		  setIsLoading(false);
		}
	  };


	return (
		<>
 <ToastContainer />

			<Card style={{ maxWidth: 450, margin: "0 auto", padding: "20px 5px" }}>
				<CardContent>
					<Typography variant="h5" gutterBottom>
						Contact Me!
					</Typography>
					<Typography
						gutterBottom
						variant="body2"
						color="textSecondary"
						component="p"
					>
						Please fill in the form I will get back to you within 24hrs!
					</Typography>
					<form onSubmit={handleSubmit(onSubmit)} noValidate>
						<Grid container spacing={2}>
							<Grid xs={12} sm={6} item>
								<TextField
									label="First Name"
									placeholder="Enter first name"
									variant="outlined"
									fullWidth
									id="firstName"
									type="text"
									{...register("firstName", {
										required: "First Name is required ",
									})}
									error={Boolean(errors.firstName)}
									helperText={errors.firstName?.message}
								/>
							</Grid>
							<Grid xs={12} sm={6} item>
								<TextField
									label="Last Name"
									placeholder="Enter Last Name"
									variant="outlined"
									fullWidth
									id="lastName"
									{...register("lastName", {
										required: "Last Name is required ",
									})}
									error={Boolean(errors.lastName)}
									helperText={errors.lastName?.message}
								/>
							</Grid>
							<Grid xs={12} item>
								<TextField
									label="Email"
									type="email"
									placeholder="Enter your Email address"
									variant="outlined"
									fullWidth
									id="email"
									{...register("email", {
										required: "Email is required",
										pattern: {
											value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
											message: "Please enter a valid email address",
										},
									})}
									error={Boolean(errors.email)}
									helperText={errors.email?.message}
								/>
							</Grid>
							<Grid xs={12} item>
								<TextField
									label="Subject"
									type="text"
									placeholder="Type your subject here"
									variant="outlined"
									fullWidth
									id="subject"
									{...register("subject", {
										required: "Subject  is required ",
									})}
									error={Boolean(errors.subject)}
									helperText={errors.subject?.message}
								/>
							</Grid>

							<Grid xs={12} item>
								<TextField
									label="Message"
									type="text"
									placeholder="Type your Message here"
									variant="outlined"
									multiline
									rows={3}
									fullWidth
									id="subject"
									{...register("message", {
										required: "message  is required ",
									})}
									error={Boolean(errors.message)}
									helperText={errors.message?.message}
								/>
							</Grid>
							<Grid xs={12} item>
								<Button
									variant="contained"
									fullWidth
									color="primary"
									type="submit"
									// disabled={!isValid || isLoading}
								>
									{isLoading ? (
										<CircularProgress size={24} color="inherit" />
									) : (
										"Send Email"
									)}
								</Button>

								{/* message handling after form submission */}
								{!errors.firstName && !errors.email && !errors.lastName && !errors.subject && !errors.message && <span style={{color: "green", margin: "1rem", fontSize: "2rem"}}>{message}</span>}
							</Grid>
						</Grid>
					</form>
				</CardContent>
			</Card>
			{/* <Head>
		 	<title>Contact Page</title>
		 	<meta name="contact page" content="Email me through this form"/>
		 </Head> */}
		</>
	)
}
 