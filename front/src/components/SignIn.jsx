import React, {useState, useEffect} from 'react'
import Nav from './Nav'
import { useNavigate } from 'react-router-dom'
import Footer from './Footer'
import { useDispatch } from 'react-redux';
import { login } from '../features/Slices';
import ApiService from '../service/apiServices';
import { useForm } from "react-hook-form";

const SignIn = () => {


  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(undefined);

  const dispatch = useDispatch();
 const navigate = useNavigate();
 const { register, handleSubmit } = useForm();
 const onSubmit = async (data) => {

  console.log(data.email)
    setName(data.email);
    setPassword(data.password);
    setRememberMe(data.rememberMe);
    console.log(rememberMe, name, password)
    console.log(data)
    
    const resultOfFetch = await ApiService.postLogin(data);
    if(resultOfFetch.isLoggedIn){
      dispatch(login({
        name: name,
        rememberMe : rememberMe,
        password: password,
        loggedIn: true,
      }))
      navigate('/user')
    }
    else{
      alert(resultOfFetch.error)
    }
  }
  return (
    <>
    <div className='signIn'>
      <Nav />
        <main className="main bg-dark">
          <section className="sign-in-content">
            <i className="fa fa-user-circle sign-in-icon"></i>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="input-wrapper">
                <label htmlFor="username">Username</label>
                <input
  type="text"
  id="username"
  value={name}
  {...register('email', { required: true })}
  onChange={(e) => setName(e.target.value)}
/>
              </div>
              <div className="input-wrapper">
                <label htmlFor="password">Password</label>
                <input
  type="password"
  id="password"
  value={password}
  {...register('password', { required: true })}
  onChange={(e) => setPassword(e.target.value)}
/>
              </div>
              <div className="input-remember">
              <input
  type="checkbox"
  id="remember-me"
  checked={rememberMe}
  onChange={(e) => setRememberMe(e.target.checked)}
/>
                <label htmlFor="remember-me">Remember me</label>
              </div>
              <button type='submit' className="sign-in-button">Sign In</button>
            </form>
          </section>
        </main>
    <Footer />
    </div>
    </>
  )
}

export default SignIn
