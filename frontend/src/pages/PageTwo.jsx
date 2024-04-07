import { useState } from "react";
import { useAppContext } from "../contexts/AppContext";


const PageTwo = ()=>
{
  const {showToast} = useAppContext();
  const [age, setAge] = useState(0);
  const [showWelcome, setShowWelcome] = useState(false);

  //handle age verification
  const handleVerify = () => {
    //check if age is a valid number
    if (isNaN(parseInt(age))) {
      showToast({message: "Invalid input! Please enter a number."});
    } else {
      //convert age to a number
      const ageNumber = parseInt(age);

      //check if age is within range
      if (ageNumber < 0 || ageNumber > 200) {
        showToast({message: "Age must be between 1 and 200."});
      } else {
        //perform age verification
        if (ageNumber >= 21) {
          setShowWelcome(true)
        } else {
          showToast({message: "You're not old enough!"});
        }
      }
    }
  };

  return(
    <div className="mt-2">
      <h3>Age Verification</h3>
      <div className="form-group">
        <label className="form-label" htmlFor="age">What is your age? </label>
        <input className="form-control w-25" type="number" id="age" required onChange={event => setAge(event.target.value)}/>
        {}
        <button className="btn btn-md btn-outline-success mt-2" onClick={handleVerify}> Verify</button>
      </div>
      {/* Display welcome message only after user is old enough*/}
      {showWelcome && <h1 className="text-center fw-bold text-success"> Welcome to the venue.</h1>}
    </div>
  );
}

export default PageTwo;