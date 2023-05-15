import React, { Component } from 'react';
import './BmiForm.css'
import '../Button.css';
import Navbar from '../Navbar';
import Footer from '../Footer';
import NutritionInfo from './NutritionInfo';
import { Pie } from 'react-chartjs-2';

const STYLES = ['btn--primary', 'btn--outline', 'btn--custom1', 'btn--custom2', 'btn--custom3'];
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

const BMRvalidateInfo = (values) => {
  let errors = {};

  if (!values.height.trim()) {
    errors.height = 'Height required';
  } else if (Number(values.height) >= 251) {
    errors.height = 'Enter appropriate height in meters';
  } 
  
  if (!values.weight.trim()) {
    errors.weight = 'Weight required';
  } else if (values.weight.length > 3) {
    errors.weight = 'Enter appropriate weight in KGs';
  } else if (Number(values.weight) >= 635) {
    errors.weight = 'Weight should be less than 635 KGs';
  }
  if (!values.age.trim()) {
    errors.age = 'Age required';
  } else if (Number(values.age) >= 80) {
    errors.age = 'Enter appropriate age';
  } 
  if (!values.bodyfat.trim()) {
    errors.bodyfat = 'Bodyfat required';
  }
  return errors;
};


class BmrForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weight: '',
      height: '',
      age: '',
      lifestyle: '',
      gender: '',
      bodyfat: '',
      experience: '',
      goal: '',
      errors: {},	

    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const errors = BMRvalidateInfo(this.state);
    if (Object.keys(errors).length > 0) {
      this.setState({ errors });
      return;
    }

    console.log('Height:', this.state.height);
    console.log('Weight:', this.state.weight);
    console.log('Age:', this.state.age);
    const token = localStorage.getItem('token'); 
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}`},
      body: JSON.stringify(
        {
          weight: this.state.weight,
          height: this.state.height,
          age: this.state.age,
          lifestyle: this.state.lifestyle,
          gender: this.state.gender,
          bodyfat: this.state.bodyfat,
          experience: this.state.experience,
          goal: this.state.goal
        }
      )
    };
    const url = 'http://localhost:5054/api/Calculation/bmr';
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data); // do something with the response data
      this.setState({
        carbohydrate: data.carbohydrate,
        protein: data.protein,
        fat: data.fat,

        calfromcarb: data.calfromcarb,
        calfromprotein: data.calfromprotein,
        calfromfat: data.calfromfat,

        perfromcarb:data.perfromcarb,
        perfromprotein:data.perfromprotein,
        perfromfat:data.perfromfat,

        calories:data.calories
      
      })
    } catch (error) {
      console.error(error);
    }
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

  handleLifestyleChange = (event) => {
    this.setState({ lifestyle: event.target.value });
  };

  handleGenderChange = (event) => {
    this.setState({ gender: event.target.value }, () => {
      this.handleBodyfatChange({ target: { value: this.state.bodyfat } });
    });
  };
  

  handleBodyfatChange = (event) => {
    const bodyfat = event.target.value;
    let goal = '';
  
    if (this.state.gender === 'male') {
      if (bodyfat >= 18) {
        goal = 'lose fat';
      } else if (bodyfat <= 12) {
        goal = 'build muscle';
      } else {
        goal = 'build muscle lose fat';
      }
    } else if (this.state.gender === 'female') {
      if (bodyfat >= 28) {
        goal = 'lose fat';
      } else if (bodyfat <= 22) {
        goal = 'build muscle';
      } else {
        goal = 'build muscle lose fat';
      }
    }
  
    this.setState({ bodyfat, goal });
  };
  

  handleExperienceChange = (event) => {
    this.setState({ experience: event.target.value });
  };

  handleGoalChange = (event) => {
    this.setState({ goal: event.target.value });
  };

  render() {
    const { errors } = this.state;
    return (
      <>
        <Navbar />
        <div className="bmrform-container">
          <h1 className="titletext">Calories Counter</h1>
          <form className="form-box" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label className='form-label1'> Height (in cm) : </label>
              <input
                className="form-input1"
                type="text"
                name='height'
                value={this.state.height}
                onChange={this.handleHeightChange}
                placeholder='Enter your height in cm'
              />
               {errors.height && <span className="error-message">{errors.height}</span>}
            </div>
            <div className="form-group">
              <label className='form-label1'> Age : </label>
              <input
                className="form-input1"
                type="text"
                name='age'
                value={this.state.age}
                onChange={this.handleAgeChange}
                placeholder='Enter your age'
              />
               {errors.age && <span className="error-message">{errors.age}</span>}
            </div>
            <div className="form-group">
              <label className='form-label1'> Weight (in Kg) : </label>
              <input
                className="form-input1"
                type="text"
                name='weight'
                value={this.state.weight}
                onChange={this.handleWeightChange}
                placeholder='Enter your weight in kg'
              />
               {errors.weight && <span className="error-message">{errors.weight}</span>}
        
              <div className="form-group">
                <label className='form-label1'> Lifestyle : </label>
                <select
                  className="form-input1"
                  name='lifestyle'
                  value={this.state.lifestyle}
                  onChange={this.handleLifestyleChange}
                >
                  <option value="" className='option'>Select a lifestyle</option>
                  <option value="s" className='option'>Sedentary</option>
                  <option value="la" className='option'>Lightly active</option>
                  <option value="ma" className='option'>Moderately active</option>
                  <option value="ha" className='option'>Very active</option>
                </select>
              </div>
              <div className="form-group">
                <label className='form-label1'> Gender : </label>
                <select
                  className="form-input1"
                  name='gender'
                  value={this.state.gender}
                  onChange={this.handleGenderChange}
                >
                  <option value="" className='option'>Select Gender</option>
                  <option value="male" className='option'>Male</option>
                  <option value="female" className='option'>Female</option>
                </select>
              </div>
              <div className="form-group">
                <label className='form-label1'> Bodyfat % : </label>
                <input
                  className="form-input1"
                  type="text"
                  name='bodyfat'
                  value={this.state.bodyfat}
                  onChange={this.handleBodyfatChange}
                />
                {errors.bodyfat && <span className="error-message">{errors.bodyfat}</span>}
              </div>
              <div className="form-group">
                <label className='form-label1'> Experience : </label>
                <select
                  className="form-input1"
                  name='experience'
                  value={this.state.experience}
                  onChange={this.handleExperienceChange}
                >
                  <option value="" className='option'>Select Your Experience Level</option>
                  <option value="b" className='option'>Begineer</option>
                  <option value="i" className='option'>Intermediate</option>
                  <option value="a" className='option'>Advanced</option>
                </select>
              </div>
            
            </div>
            <div className='btn-form'>
              <Button buttonStyle='btn--custom1'>Submit</Button>
            </div>
          </form>
          
        <div className="table-container">
        <h1 className='resulttext'>Your Result</h1>
        <div className="form-group">
          
                <label className='form-label1'> Goal : </label>
                <select
                id="Soni1"
                className="form-input1"
                name='goal'
                value={this.state.goal}
                onChange={this.handleGoalChange}
                disabled={true}
              >
                <option value="lose fat">Lose Fat</option>
                <option value="build muscle">Build Muscle</option>
                <option value="build muscle lose fat">Recomposition</option>
              </select>
        </div>
        <label className='form-label2'> Nutrition Breakdown : </label>
        <NutritionInfo
          carbohydrate={this.state.carbohydrate}
          protein={this.state.protein}
          fat={this.state.fat}
          calfromcarb={this.state.calfromcarb}
          calfromprotein={this.state.calfromprotein}
          calfromfat={this.state.calfromfat}
          perfromcarb={this.state.perfromcarb}
          perfromprotein={this.state.perfromprotein}
          perfromfat={this.state.perfromfat}
          calories={this.state.calories}
        />
        </div>
        <h1 className='resulttext2'>Your Nutrition Breakdown</h1>
        <div className='pie'>
        {this.state.carbohydrate && this.state.protein && this.state.fat &&
  <Pie
    data={{
      labels: ['Carbohydrate', 'Protein', 'Fat'],
      datasets: [{
        data: [this.state.carbohydrate, this.state.protein, this.state.fat],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      }],
    }}
    options={{ maintainAspectRatio: false, height: '50%', width: '50%' }}
    style={{height: "400px", width: "400px" }}
  />
}</div>
</div>
        <Footer />
      </>
);
}
}

export default BmrForm;
