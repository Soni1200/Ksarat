import React from 'react';
import './Form.css';

const FormSuccess = () => {
  return (
    <div className='form-content-right'>
      <h1 className='form-success'>We have received your request!</h1>
      <img className='form-img-2' src='images/img-3.svg' alt='success' />
      <p1 className='dir-login'>Start Your Journey<a href='sign-in'>Now</a></p1>
    </div>
  );
};

export default FormSuccess;