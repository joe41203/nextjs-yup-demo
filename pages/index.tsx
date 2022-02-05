import type {NextPage} from "next";
import React from "react";
import {useForm, SubmitHandler} from "react-hook-form";

const Home: NextPage = () => {
	type Inputs = {
		email: string;
	};

	const {
		register,
		handleSubmit,
		watch,
		formState: {errors},
	} = useForm<Inputs>();
	const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

	console.log(watch("email"));

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<input {...register("email", {required: true})} />
			{errors.email && <span>Email is required</span>}
			<input type='submit' />
		</form>
	);
};

export default Home;
