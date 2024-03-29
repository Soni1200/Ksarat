import React from 'react';
import '../App.css';
import './TopSec.css';
import './Button.css';

const STYLES = ['btn--primary', 'btn--outline','btn--custom1','btn--custom2','btn--custom3'];
const SIZES = ['btn--medium', 'btn--large'];

const Button = ({
  children,
  type,
  onClick,
  buttonStyle,
  buttonSize
}) => {
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];

  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];
  const handleButtonClick = () => {
    window.location.href = '/programs';
  };
  return (
      <button
        className={`btn ${checkButtonStyle} ${checkButtonSize}`}
        onClick={handleButtonClick}
        type={type}
      >
        {children}
      </button>
  
  );
};

function TopSec() {
  return (
    <div className='top-container'>
      <video id='motivation' src = "./videos/motivation.mp4" autoPlay loop muted>
    </video>
      <h1>Your Ideal Body Awaits</h1>
      <p>What Are You Waiting For?</p>
      <div className = 'top-btn'>
        <Button className = 'btns' buttonStyle= 'btn--outline' buttonSize= 'btn--large'>
        Our Services <i className='far fa-play-circle'/>
        </Button>
      </div>
    </div>
  )
}

export default TopSec;
