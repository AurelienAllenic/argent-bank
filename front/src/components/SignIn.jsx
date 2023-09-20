import React, {useState} from 'react'
import Nav from './Nav'
import { useNavigate } from 'react-router-dom'
import Footer from './Footer'
import { useDispatch } from 'react-redux';
import { login } from '../features/Slices';
const SignIn = () => {

  const [name, setName] = useState('');
  const [password, SetPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const dispatch = useDispatch();
 const navigate = useNavigate();
  const handleSubmit = (e) => {
    console.log(rememberMe, name, password)
    e.preventDefault();
    dispatch(login({
        name: name,
        rememberMe : rememberMe,
        password: password,
        loggedIn: true,
    }))
    navigate('/user')
}

  return (
    <div className='signIn'>
      <Nav />
        <main className="main bg-dark">
          <section className="sign-in-content">
            <i className="fa fa-user-circle sign-in-icon"></i>
            <h1>Sign In</h1>
            <form onSubmit={(e) => {
        handleSubmit(e)
      }}>
              <div className="input-wrapper">
                <label htmlFor="username">Username</label>
                <input type="text" id="username" value={name} onChange={(e) => setName(e.target.value)} required/>
              </div>
              <div className="input-wrapper">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" value={password} onChange={(e) => SetPassword(e.target.value)} required/>
              </div>
              <div className="input-remember">
                <input type="checkbox" id="remember-me" value={rememberMe} onChange={setRememberMe(!rememberMe)}/>
                <label htmlFor="remember-me">Remember me</label>
              </div>
              <button type='submit' className="sign-in-button">Sign In</button>
            </form>
          </section>
        </main>
    <Footer />
    </div>
  )
}

export default SignIn
