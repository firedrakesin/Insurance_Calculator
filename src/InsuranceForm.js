import React, { useState} from 'react'
import imgfornow from "./Image/imgfornow.png"
import insurance from "./Image/insurance.gif"
import { Link } from 'react-router-dom';

const InsuranceForm = () => {

  const [age, setAge] = useState([]);
  const [sumInsured, setSumInsured] = useState(0);
  const [cityTier, setCityTier] = useState('tier-1');
  const [tenure, setTenure] = useState('1yr');
  const [numAdults, setNumAdults] = useState(1); // Default to one adult
  const [numChildren, setNumChildren] = useState(0); // State for the number of children
  const [responsedata, setresponsedata] = useState('');
  const [showPremium, setShowPremium] = useState(false);

  const calculatePremium = () => {
    const formData = {
      age,
      sumInsured,
      cityTier,
      tenure,
      numAdults,
      numChildren,
    };
  
    fetch('https://liberty-dev.inspektlabs.com/get_lib_data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        // Set the response data in the state
        setresponsedata(data.total_cost);
        setShowPremium(true);
        // You can also add any logic here to process the response data if needed
      })
      .catch(error => {
        // Handle any errors here
        console.error('Error:', error);
      });
  };
  

  // const addToCart = () => {
  // };

  const renderAdultFields = () => {
    const adultFields = [];
    for (let i = 0; i < numAdults; i++) {
      adultFields.push(
        <div key={`adult-${i}`}>
          <label>
            Adult {i + 1} Age:
            <input
              type="text"
              value={age[i] || ''}
              onChange={(e) => handleAgeChange(e, i)}
            />
          </label>
        </div>
      );
    }
    return adultFields;
  };

  const handleAgeChange = (e, index) => {
    const updatedAge = [...age];
    updatedAge[index] = e.target.value;
    setAge(updatedAge);
  };

  return (
    <>
    
      <img src={imgfornow} alt="ins" className="image" />
      {/* <div style={{ display: "inline-block" }} className='f'>
      <img src={insurance} alt="Your Image" className="gif"  style={{display: "inline-block"}}/> */}
    <div className="container">
      <div className="f">
        <h2>Insurance Calculator</h2>
        <div className='s'>
          <form>
            <label>
              Sum Insured:
              <select value={sumInsured} onChange={(e) => setSumInsured(e.target.value)}>
                <option value="700000">700,000</option>
                <option value="1000000">1000,000</option>
                <option value="7500000">7500,000</option>
              </select>
            </label>
            <label>
              City Tier:
              <select value={cityTier} onChange={(e) => setCityTier(e.target.value)}>
                <option value="tier-1">Tier 1</option>
                <option value="tier-2">Tier 2</option>
              </select>
            </label>
            <label>
              Tenure:
              <select value={tenure} onChange={(e) => setTenure(e.target.value)}>
                <option value="1yr">1 Year</option>
                <option value="2yr">2 Years</option>
              </select>
            </label>
            <label>
              Number of Adults:
              <input
                type="number"
                min="1" // Set a minimum value of 1 for adults
                max="2" // Set a maximum value of 2 for adults
                value={numAdults}
                onChange={(e) => setNumAdults(Number(e.target.value))}
              />
            </label>
            {renderAdultFields()}
            <label>
              Number of Children:
              <input
                type="number"
                min="0" // Set a minimum value of 0 for children
                max="4" // Set a maximum value of 4 for children
                value={numChildren}
                onChange={(e) => setNumChildren(Number(e.target.value))}
              />
            </label>
            <p className='para'>We don't spam, Promise!</p>
            <button type="button" className='cal1' onClick={calculatePremium}>
              Calculate Premium
            </button>
            <Link to="/checkout">
            <button type="button" className="cal2">
              Go to Cart
            </button>
          </Link>
          </form>
        </div>
        </div>
        <div className="gif-container">
        <img src={insurance} alt="gifff" className="gif" />
        {showPremium && (
          <h2>
            <pre className='pp'>
              The Premium Plan cost is {responsedata}.
              {'\n'} {/* Use '\n' for line break */}
              For number of adults = {numAdults}.
              {'\n'} {/* Use '\n' for line break */}
              For number of children = {numChildren}.
            </pre>
          </h2>
        )}
      </div>
      </div>
    </>
  );
};

export default InsuranceForm;
