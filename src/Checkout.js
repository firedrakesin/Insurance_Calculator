import React from 'react';

const Checkout = ({ amount, setGlobal }) => {

  const back = () => {
    setGlobal(0);
  }
  
  return (
    <> 
    <div className="home-button" onClick={back}>
        <i className="fas fa-home"></i> Home
      </div>
    <div className="checkout-container">
      <h2>Checkout</h2>
      <div className="total-amount">
        <p>Premium Amount to Pay:</p>
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
      <button className="pay-button">Pay Now</button>
    </div>
    </>
  );
};

export default Checkout;
