import type {NextPage} from "next";
import React from "react";
import {useForm, SubmitHandler} from "react-hook-form";
import axios from "axios"
import { useYupValidationResolver } from "../validations/useYupValidationResolver"
import { EmailSchema } from "../validations/EmailValidator"

type Inputs = {
  email: string;
};

const Home: NextPage = () => {
  const resolver = useYupValidationResolver(EmailSchema);
	const {
		register,
		handleSubmit,
		formState: {errors},
	} = useForm<Inputs>({ resolver });

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { email } = data
    const res = await axios.post("/api/users", { email })
    console.log("res", res)
  };

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<input {...register("email")} />
			{errors.email && <span>{errors.email.message}</span>}
			<input type='submit' />
		</form>
	);
};

export default Home;
