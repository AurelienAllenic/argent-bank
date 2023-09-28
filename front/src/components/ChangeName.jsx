import React from 'react';
import ApiService from '../service/apiServices';
import { useDispatch } from 'react-redux';
import { login } from '../features/Slices';
import { useForm } from 'react-hook-form';

const ChangeName = ({ firstName, lastName, setIsChangingName, updateDisplayedName }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data, e) => {
    e.preventDefault();
  
    // Renvoie le token et isLoggedIn
    const resultOfFetch = await ApiService.getProfile(data);
  
    const token = localStorage.getItem('token');
  
    // Update the first and last name in the profile
    const updatedProfileData = {
      firstName: data.firstName,
      lastName: data.lastName,
    };
  
    try {
      // Update the profile using putProfile from ApiService
    const resultOfUpdateProfile = await ApiService.updateProfile(updatedProfileData, token);

    if (resultOfFetch.isLoggedIn && resultOfUpdateProfile) {
        dispatch(
            login({
                name: data.name,
                rememberMe: data.rememberMe,
                password: data.password,
                firstName: data.firstName,
                lastName: data.lastName,
                loggedIn: true,
            })
        );
        // Store token and userid in localStorage
        localStorage.setItem('token', token);

        updateDisplayedName(resultOfUpdateProfile.firstName, resultOfUpdateProfile.lastName);
        setIsChangingName(false);
      } else {
        alert(resultOfFetch.error || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      // Handle the error as needed
      // Display an error message, show a notification, etc.
    }
  };
  const handleCancel = () => {
    setIsChangingName(false);
  };

  return (
    <div className='container_changeName'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='container_inputs'>
          <input
            type='text'
            placeholder={firstName}
            required
            {...register('firstName')}
          />
          <input
            type='text'
            placeholder={lastName}
            required
            {...register('lastName')}
          />
        </div>
        <div className='container_buttons'>
          <button className='button_save' type='submit'>
            Save
          </button>
          <button className='button_cancel' type='button' onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangeName;