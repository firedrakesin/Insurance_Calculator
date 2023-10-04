import React from 'react';
import Table from './Table';
import './checkout_style.css'


const Checkout = ({ amount, setGlobal, response }) => {

  const back = () => {
    setGlobal(0);
  }
  
  return (
    <div className="container">
    <div className="box">
      <div className="home-button" onClick={back}>
        Go Back
      </div>

      <div className="title">
        <h3>Details for Adults and Children</h3>
        <Table response={response} />
      </div>

      <div className="checkout">
        <h2>Checkout</h2>

        <div className="amount-info">
          <p>Payable Amount:</p>
          <p className="amount">{amount} INR</p>
        </div>

        <div className="payment-options">
          <h3>Payment Options:</h3>

          <div className="payment-method">
            <input type="radio" id="upi" name="paymentMethod" value="upi" />
            <label htmlFor="upi">UPI</label>
          </div>

          <div className="payment-method">
            <input type="radio" id="netBanking" name="paymentMethod" value="netBanking" />
            <label htmlFor="netBanking">Net Banking</label>
          </div>
        </div>

        <div className="pay-button">Pay Now</div>
      </div>
    </div>
  </div>
  

  );
};

export default Checkout;
