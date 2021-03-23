import React, { useRef, useState } from 'react';
import { useForm } from "react-hook-form";
import firebase from "../../firebase";
import md5 from "md5";
import { Link } from "react-router-dom";

function RegisterPage() {

  const { register, handleSubmit, watch, errors } = useForm();
  const password = useRef();
  password.current = watch( "password" );
  const [ errorsFromSubmit, setErrorsFromSubmit ] = useState( "" );
  const [ loading, setLoading ] = useState( false );

  const onSubmit = async ( data ) => {
    try {
      setLoading( true );

      //Firebase auth 서비스에서 이메일과 비밀번호로 유저 생성
      let createdUser = await firebase
        .auth()  // auth 서비스에 접근 
        .createUserWithEmailAndPassword( data.email, data.password );
      console.log( 'createdUser', createdUser );
      //Firebase auth 서비스에서 생성한 유저에 추가 정보 입력
      await createdUser.user
        .updateProfile( {
          displayName: data.name,
          photoURL: `http://gravatar.com/avatar/${md5(
            createdUser.user.email
          )}?d=identicon`
        } );

      //Firebase 데이터 베이스에서 
      await firebase.database().ref( "users" ).child( createdUser.user.uid ).set( {
        name: createdUser.user.displayName,
        image: createdUser.user.photoURL
      } );

      setLoading( false );
    } catch ( error ) {
      setErrorsFromSubmit( error.message );
      setLoading( false );
      setTimeout( () => {
        setErrorsFromSubmit( "" );
      }, 5000 );
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="form">
        <div style={{ textAlign: 'center' }}>
          <h3>Register</h3>
        </div>
        <form onSubmit={handleSubmit( onSubmit )}>
          <label>Email</label>
          <input
            name="email"
            type="email"
            ref={register( { required: true, pattern: /^\S+@\S+$/i } )}
          />
          {errors.email && <p>This email field is required</p>}

          <label>Name</label>
          <input
            name="name"
            ref={register( { required: true, maxLength: 10 } )}
          />
          {errors.name && errors.name.type === "required"
                        && <p> This name field is required</p>}
          {errors.name && errors.name.type === "maxLength"
                        && <p> Your input exceed maximum length</p>}

          <label>Password</label>
          <input
            name="password"
            type="password"
            ref={register( { required: true, minLength: 6 } )}
          />
          {errors.password && errors.password.type === "required"
                        && <p> This name field is required</p>}
          {errors.password && errors.password.type === "minLength"
                        && <p> Password must have at least 6 characters</p>}

          <label>Password Confirm</label>
          <input
            type="password"
            name="password_confirm"
            ref={register( {
              required: true,
              validate: ( value ) =>
                value === password.current
            } )}
          />
          {errors.password_confirm && errors.password_confirm.type === "required"
                        && <p> This password confirm field is required</p>}
          {errors.password_confirm && errors.password_confirm.type === "validate"
                        && <p>The passwords do not match</p>}

          {errorsFromSubmit &&
                        <p>{errorsFromSubmit}</p>
          }

          <input type="submit"
            style={{ marginTop: '40px' }}
            disabled={loading} />

        </form>
        <Link style={{ color: 'gray', textDecoration: 'none' }} to="/login">이미 아이디가 있다면 ...</Link>
      </div>
    </div >
  );
}

export default RegisterPage;

