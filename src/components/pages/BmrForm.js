import React, { Component } from 'react';
import './BmiForm.css'
import '../Button.css';
import Navbar from '../Navbar';
import Footer from '../Footer';

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

  return (
      <button
        className={`btn ${checkButtonStyle} ${checkButtonSize}`}
        onClick={onClick}
        type={type}
      >
        {children}
      </button>
  );
};

class BmrForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: '',
      age: '',
      weight: '',
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log('Height:', this.state.height);
    console.log('Age:', this.state.age);
    console.log('Weight:', this.state.weight);
  };

  handleHeightChange = (event) => {
    this.setState({ height: event.target.value });
  };

  handleAgeChange = (event) => {
    this.setState({ age: event.target.value });
  };

  handleWeightChange = (event) => {
    this.setState({ weight: event.target.value });
  };

  render() {
    return (
      <>
      <Navbar />
      <div className="bmrform-container">
        <h1>Get Your Personalised Diet Plan</h1>
        <form className="form-box" onSubmit={this.handleSubmit}>
          <div className="form-group">
          <label className='form-label1'> Height (in cm) : </label>
              <input
                className="form-input1"
                type="text"
                name='height'
                value={this.state.height}
                onChange={this.handleHeightChange}
              />
          </div>
          <div className="form-group">
          <label className='form-label1'> Age : </label>
              <input
                className="form-input1"
                type="text"
                name='age'
                value={this.state.age}
                onChange={this.handleAgeChange}
              />
            </div>
          <div className="form-group">
          <label className='form-label1'> Weight (in Kg) : </label>
              <input
                className="form-input1"
                type="text"
                name='weight'
                value={this.state.weight}
                onChange={this.handleWeightChange}
              />
          
          </div>
          <div className='btn-form'>
          <Button buttonStyle='btn--custom1'>Submit</Button>
          </div>
        </form>
      </div>
      <Footer />
      </>
    );
  }
}

export default BmrForm;
