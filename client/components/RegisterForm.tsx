import React, { Dispatch, SetStateAction } from 'react'
import FormWrapper from './FormWrapper'
import {useForm} from "react-hook-form";
import { generateVaultKey, hashPassword } from '../crypto';
import { registerUser } from '../api';
import { useMutation } from 'react-query';
import { Button, FormControl, FormErrorMessage, FormLabel, Heading, Input } from '@chakra-ui/react';

export default function RegisterForm({
  setVaultKey, 
  setStep
}:{
  setVaultKey:Dispatch<SetStateAction<string>>;
  setStep:Dispatch<SetStateAction<"login" | "register" | "vault">>;
}) {
  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    formState:{errors, isSubmitting},
  }=useForm<{email:string;password:string; hashedPassword:string}>();
  const mutation=useMutation(registerUser,{
    onSuccess:({salt, vault}) => {
      const hashedPassword =getValues("hashedPassword");
      const email=getValues("email");
      const vaultKey=generateVaultKey({hashedPassword, email, salt});
      window.sessionStorage.setItem("vaultKey", vaultKey);
      setVaultKey(vaultKey);
       window.sessionStorage.setItem("vault", "");
       setStep("vault");
    }
  })
  const submitHandler=()=>{
    const password = getValues("password");
    const email = getValues("email");
    const hashedPassword=hashPassword(password);
    setValue("hashedPassword", hashedPassword);
    mutation.mutate({
      email, password,
    });
  }
  return (
    <FormWrapper onSubmit={handleSubmit(submitHandler)}>
      <Heading>Register</Heading>
      <FormControl mt="4">
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input 
          id="email"
          placeholder="Email"
          {...register("email", {
            required:"Email is required",
            minLength:{
              value:4,
              message: "Email must be 6 characters long",
            },
          })}
        />
         <FormErrorMessage>
        {errors.email && errors.email.message}
      </FormErrorMessage>
      </FormControl>
       <FormControl mt="4">
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input 
          id="password"
          placeholder="Password"
          {...register("password", {
            required:"Password is required",
            minLength:{
              value:4,
              message: "Password must be 6 characters long",
            },
          })}
        />
         <FormErrorMessage>
        {errors.password && errors.password.message}
      </FormErrorMessage>
      </FormControl>
      <Button type="submit">Register</Button>
    </FormWrapper>
  )
}
