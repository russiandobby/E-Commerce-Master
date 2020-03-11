import React,{useState} from "react";
import{connect} from 'react-redux';
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";


import {googleSignInStart,emailSignInStart} from '../../redux/user/user.actions';

import "./sign-in.styles.scss";

const SignIn =({emailSignInStart,googleSignInStart})=> {

  const[userCredentials,setCredentials] = useState({email:'', password:''});
  const{email,password} = userCredentials;

  const handleSubmit = async event => {
    event.preventDefault();
    // const{emailSignInStart} = this.props;
    const { email, password } = userCredentials;

    emailSignInStart(email,password);

    // move functionality to redux and sagas
    // try {
    //   await auth.signInWithEmailAndPassword(email, password);

    //   this.setState({ email: "", password: "" });
    // } catch (error) {
    //   console.error(error);
    // }
  };

  const handleChange = event => {
    const { value, name } = event.target;
    setCredentials({...userCredentials, [name]: value });
  };

 
    // const {googleSignInStart}=this.props;
    return (
      <div className="sign-in">
        <h2>I already have an account</h2>
        <span className="title">Sign in with your email and password</span>
        <form onSubmit={handleSubmit}>
          <FormInput
            name="email"
            type="email"
            value={email}
            handleChange={handleChange}
            label="email"
            required
          />

          <FormInput
            name="password"
            type="password"
            value={password}
            handleChange={handleChange}
            label="password"
            required
          />

          <div className="buttons">
            <CustomButton type="submit">Sign In</CustomButton>
            <CustomButton type='button' onClick={googleSignInStart} isGoogleSignIn>
              Sign In With Google
            </CustomButton>
          </div>
        </form>
      </div>
    );
  }


const mapDispatchToProps = dispatch =>({
  googleSignInStart:()=>dispatch(googleSignInStart()),
  // will get back email and password
  emailSignInStart:(email,password)=>dispatch(emailSignInStart({email,password}))
})


export default connect(null,mapDispatchToProps) (SignIn);
