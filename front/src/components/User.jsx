import React, { useEffect, useState } from 'react';
import Nav from './Nav';
import Footer from './Footer';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/Slices';
import  ApiService  from '../service/apiServices';
import ChangeName from './ChangeName';

const User = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isChangingName, setIsChangingName] = useState(false);

  const updateDisplayedName = (newFirstName, newLastName) => {
    setFirstName(newFirstName);
    setLastName(newLastName);
  };
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    ApiService.getInfosProfile(token)
      .then(resultOfFetchProfile => {
        setFirstName(resultOfFetchProfile.firstName);
        setLastName(resultOfFetchProfile.lastName);
      })
      .catch(error => {
        // Handle any errors that occur during the API call
        console.error(error);
      });
  }, []);
  function handleChangeName() {
    setIsChangingName(!isChangingName);
  }

  return (
    <div className='user'>
      <Nav />
      <main className="main bg-dark">
        <div className="header">
          <h1>Welcome back<br />{firstName} {lastName}!</h1>
          <button className="edit-button" onClick={handleChangeName}>Edit Name</button>
        </div>
      {isChangingName ? <ChangeName
  firstName={firstName}
  lastName={lastName}
  setIsChangingName={setIsChangingName}
  updateDisplayedName={updateDisplayedName}
/> :null

      }
      <h2 className="sr-only">Accounts</h2>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </main>
      <Footer />
    </div>
  )
}

export default User
