import React, { Component } from 'react';
import './BmiForm.css';
import '../Button.css';
import Navbar from '../Navbar';
import Footer from '../Footer';

const STYLES = ['btn--primary', 'btn--outline', 'btn--custom1', 'btn--custom2', 'btn--custom3'];
const SIZES = ['btn--medium', 'btn--large'];

const Button = ({ children, type, buttonStyle, buttonSize }) => {
  const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];
  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

  return (
    <button className={`btn ${checkButtonStyle} ${checkButtonSize}`} type={type}>
      {children}
    </button>
  );
};

const BMIvalidateInfo = (values) => {
  let errors = {};

  if (!values.height.trim()) {
    errors.height = 'Height required';
  } else if (Number(values.height) >= 3) {
    errors.height = 'Enter appropriate height in meters';
  }

  if (!values.weight.trim()) {
    errors.weight = 'Weight required';
  } else if (values.weight.length > 3) {
    errors.weight = 'Enter appropriate weight in KGs';
  } else if (Number(values.weight) >= 635) {
    errors.weight = 'Weight should be less than 635 KGs';
  }

  return errors;
};

class BmiForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: '',
      weight: '',
      errors: {},
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const errors = BMIvalidateInfo(this.state);
    if (Object.keys(errors).length > 0) {
      this.setState({ errors });
      return;
    }

    console.log('Height:', this.state.height);
    console.log('Weight:', this.state.weight);
    const token = localStorage.getItem('token');
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ weight: this.state.weight, height: this.state.height }),
    };
    const url = 'http://localhost:5054/api/Calculation/bmi';
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data); // do something with the response data
      if (data.isSuccess) {
        window.location.href = data.fileurl;
      }
    } catch (error) {
      console.error(error);
    }
  };

  handleHeightChange = (event) => {
    this.setState({ height: event.target.value });
  };

  handleWeightChange = (event) => {
    this.setState({ weight: event.target.value });
  };

  render() {
    const { errors } = this.state;

    return (
      <>
        <Navbar />
        <div className="bmiform-container">
          <h1 className="bmi-heading">Enter Your Body Dimensions To Get Your Personalized Workout Routine</h1>
          <form className="form-box" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label className="form-label1"> Height (in m) : </label>
              <input
                className="form-input1"
                type="text"
                name="height"
                placeholder="Enter your height in meters"
                value={this.state.height}
                onChange={this.handleHeightChange}
                  />
                  {errors.height && <span className="error-message">{errors.height}</span>}
                  </div>
                  <div className="form-group">
                  <label className="form-label1">Weight (in kg) : </label>
                  <input
                               className="form-input1"
                               type="text"
                               name="weight"
                               placeholder="Enter your weight in kg"
                               value={this.state.weight}
                               onChange={this.handleWeightChange}
                             />
                  {errors.weight && <span className="error-message">{errors.weight}</span>}
                  </div>
                  <div className="btn-form">
                  <Button buttonStyle="btn--custom1">Submit</Button>
                  </div>
                  </form>
                  </div>
                  <Footer />
                  </>
                  );
                  }
                  }
                  
                  export default BmiForm;
