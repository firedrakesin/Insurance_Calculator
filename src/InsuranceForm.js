import React, { useState} from 'react'
import imgfornow from "./Image/imgfornow.png"
import insurance from "./Image/insurance.gif"

const InsuranceForm = ({setGlobal,setAmount,setresponse}) => {

  const [age, setAge] = useState([]);
  const [sumInsured, setSumInsured] = useState(0);
  const [cityTier, setCityTier] = useState('tier-1');
  const [tenure, setTenure] = useState('1yr');
  const [numAdults, setNumAdults] = useState(1); 
  const [numChildren, setNumChildren] = useState(0);
  const [responsedata, setresponsedata] = useState('');
  const [showPremium, setShowPremium] = useState(false);
  const [fetching, setFetching] = useState(false);

  const calculatePremium = () => {
    const formData = {
      age,
      sumInsured,
      cityTier,
      tenure,
      numAdults,
      numChildren,
    };

    setFetching(true);
    if (!fetching) {
       fetch('https://liberty-dev.inspektlabs.com/get_lib_data', {
      //  fetch('http://127.0.0.1:5005/get_lib_data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          setresponse(data)
          setresponsedata(data.total_cost);
          setAmount(data.total_cost);
          setShowPremium(true);
          setFetching(false);
        })
        .catch((error) => {
          console.error('Error:', error);
          setFetching(false); 
        });
    }
  };

  const cart =() => {
    setGlobal(1)
  }

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
              required={true}
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
    <img src={imgfornow} alt="no pic found" className="image" />

    <div className="container">
      <div className="f">
        <h2>Insurance Calculator</h2>
        <div className='s'>
          <form>
            <label>
              Sum Insured:
              <select value={sumInsured} onChange={(e) => setSumInsured(e.target.value)}>
                <option value=""> Select an option</option>
                <option value="500000">500,000</option>
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
                min="1"
                max="2" 
                value={numAdults}
                onChange={(e) => setNumAdults(Number(e.target.value))}
              />

            </label>

            {renderAdultFields()}

            <label>
              Number of Children:
              <input
                type="number"
                min="0" 
                max="4" 
                value={numChildren}
                onChange={(e) => setNumChildren(Number(e.target.value))}
              />
            </label>

            <p className='para'>We don't spam, Promise!</p>

            <button type="button" className='cal1' onClick={calculatePremium}>
              Calculate Premium
            </button>
            <button type="button" className="cal2" onClick={cart}>
              Go to Cart
            </button>

          </form>
        </div>
        </div>
        <div className="gif-container">
        <img src={insurance} alt="there is no pic" className="gif" />
        {showPremium && (
          <h2>
            <pre className='pp'>
              The Premium Plan cost is {responsedata}.
              {'\n'} 
              For number of adults = {numAdults}.
              {'\n'}
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
