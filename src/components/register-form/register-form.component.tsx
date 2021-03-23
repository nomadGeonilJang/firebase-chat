import React, { useRef, useState } from 'react';
import { RegisterContainer } from "./register-form.styles";

import md5 from "md5";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import myFirebase from 'utils/firebase/myFirebase';


type FormState = {
    email:string;
    name:string;
    password:string;
    passwordConfirm:string;
}

function RegisterForm() {

  const { register, handleSubmit, watch, errors } = useForm();
  const password = useRef<any>( null );
  password.current = watch( "password" );

  
  const [ loading, setLoading ] = useState( false );
  const [ errorsFromSubmit, setErrorsFromSubmit ] = useState( "" );


  const onSignUp = async ( { email, password, name: displayName }:FormState ) => {
    try {
      setLoading( true );
      const createdUser = await myFirebase.auth
        .createUserWithEmailAndPassword( email, password );

      if( createdUser ){
        await createdUser.user?.updateProfile( {
          displayName,
          photoURL: `http://gravatar.com/avatar/${md5( createdUser.user.email as string )}?d=identicon`
        } );
  
        await myFirebase.database
          .ref( "users" )
          .child( createdUser.user!.uid )
          .set( {
            name: createdUser.user?.displayName,
            image: createdUser.user?.photoURL
          } );
      }
    } catch ( error ) {
      setLoading( false );
      setErrorsFromSubmit( error.message );
    }
  };



  return (
    <RegisterContainer >
      <h2>Register G-Chat</h2>
      <form onSubmit={handleSubmit( onSignUp )} >
        <label>Email</label>
        <input 
          name="email"
          placeholder="Email"
          required
          ref={register( { required: true, pattern: /^\S+@\S+$/i } )}
        />
        {errors.email && <p>This email field is required</p>}
        <label>Name</label>
        <input
          name="name"
          placeholder="Name"
          autoComplete="username"
          required
          ref={register( { required: true, maxLength: 10 } )}
        />
        {errors.name && errors.name.type === "required" && <p> This name field is required</p>}
        {errors.name && errors.name.type === "maxLength" && <p> Your input exceed maximum length</p>}
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
        <label>Password Confirm</label>
        <input
          type="password"
          name="passwordConfirm"
          placeholder="Password Confirm"
          required
          autoComplete="new-password"
          ref={register( {
            required: true,
            validate: ( value ) =>
              value === password.current
          } )}
        />
        {errors.password_confirm && errors.password_confirm.type === "required" && <p> This password confirm field is required</p>}
        {errors.password_confirm &&  errors.password_confirm.type === "validate" &&  <p>The passwords do not match</p>}
        {errorsFromSubmit && <p>{errorsFromSubmit}</p>}
        <input type="submit" value="Register" disabled={loading}/>
      </form>
      <Link style={{ color: 'gray', textDecoration: 'none' }} to="/login">already have an id ...</Link>
    </RegisterContainer>
  );
}

export default RegisterForm;
