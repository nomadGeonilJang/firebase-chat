import React, { useState } from 'react';
import { LogInContainer } from "./log-in-form.styles";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import myFirebase from 'utils/firebase/myFirebase';

type FormState = {
    email:string;
    name:string;
    password:string;
    passwordConfirm:string;
}

function LogInForm() {

  const { register, handleSubmit, errors } = useForm();
  
  const [ loading, setLoading ] = useState( false );
  const [ errorsFromSubmit, setErrorsFromSubmit ] = useState( "" );

  const onLogIn = async ( { email, password }:FormState ) => {
    try {
      setLoading( true );
      await myFirebase.auth.signInWithEmailAndPassword( email, password );
    } catch ( error ) {
      setErrorsFromSubmit( error.message );
    }finally{
      setLoading( false );
    }
  };

 
  return (
    <LogInContainer >
      <h2>Register G-Chat</h2>
      <form onSubmit={handleSubmit( onLogIn )} >
        <label>Email</label>
        <input 
          name="email"
          placeholder="Email"
          autoComplete="username"
          required
          ref={register( { required: true, pattern: /^\S+@\S+$/i } )}
        />
        {errors.email && <p>This email field is required</p>}
        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          autoComplete="new-password"
          ref={register( { required: true, minLength: 6 } )}
        />
        {errors.password && errors.password.type === "required" && <p> This password field is required</p>}
        {errors.password && errors.password.type === "minLength" && <p> Password must have at least 6 characters</p>}
       
        {errorsFromSubmit && <p>{errorsFromSubmit}</p>}
        <input type="submit" value="login" disabled={loading}/>
      </form>
      <Link style={{ color: 'gray', textDecoration: 'none' }} to="/register">if you don&apos;t have id...</Link>
    </LogInContainer>
  );
}

export default LogInForm;
