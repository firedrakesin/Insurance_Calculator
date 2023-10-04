
import React,{useState} from 'react';
import InsuranceForm from './InsuranceForm';
import Checkout from './Checkout';



function App() {

  const [ global,setGlobal ] = useState(0) 
  const [ amount,setAmount ] = useState(0) 
  const [ response,setresponse ] = useState({}) 


  return (

      <div>

      {global === 0 ? (
        <InsuranceForm setGlobal={setGlobal} setAmount={setAmount}  setresponse={setresponse}/>
      ) : (
        <Checkout amount={amount} setGlobal={setGlobal} response={response} />
      )}


      </div>

  );
}


export default App;
