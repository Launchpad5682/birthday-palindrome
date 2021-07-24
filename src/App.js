import React, { useState } from "react";
import "./App.css";
import loadingImage from "./assets/loading.gif";
import birthday from "./assets/birthday.jpg";
import { dateFormatter, findNextDate } from "./checkPalindrome.js";

function App() {
  const [date, setDate] = useState("");
  const [nextDate, setNextDate] = useState([]);
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState(false);
  const [palindromeBirthday, setPalindromeBirthday] = useState("");
  const [palindromeOutput, setPalindromeOutput] = useState(false);
  const [notPalindromeOutput, setNotPalindromeOutput] = useState(false);
  const [resetButton, setResetButton] = useState(false);

  function changeHandler(event) {
    setDate(event.target.value);
  }

  function clickHandler() {
    setPalindromeOutput(false);
    setLoading(false);
    setOutput(false);
    setNotPalindromeOutput(false);
    setResetButton(false);
    if (date === "") {
      alert("Please select the date");
    } else {
      setDate(date);
      const dateArray = date.split("-");
      const year = dateArray[0];
      const month = dateArray[1];
      const day = dateArray[2];
      setPalindromeBirthday(dateFormatter(year, month, day));
      setOutput(true);
      setLoading(true);
      setTimeout(() => {
        if (palindromeBirthday) {
          setPalindromeOutput(true);
          setLoading(false);
          setResetButton(true);
        } else {
          const nextDate = findNextDate(year, month, day);
          // console.log(nextDate);
          // console.log(`Next Date: ${nextDate[0]}, difference: ${nextDate[1]}`);
          setNotPalindromeOutput(true);
          setNextDate(nextDate);
          setLoading(false);
          setResetButton(true);
        }
      }, 5000);
    }
  }

  function resetHandler() {
    setDate("");
    setPalindromeOutput(false);
    setLoading(false);
    setOutput(false);
    setNotPalindromeOutput(false);
    setResetButton(false);
  }

  return (
    <div className="App">
      <div className="app-card">
        <div className="card-left">
          <h1>Check out if your Birth date is Palindrome.</h1>
          <img src={birthday} alt="birthday" />
        </div>
        <div className="card-right">
          <h1>
            Enter your birth date and we will tell you if your birth date is a
            palindrome
          </h1>
          <h5>
            This app checks your birth date in 4 formats yyyy-mm-dd, dd-mm-yyyy,
            mm-dd-yy, m-dd-yyyy e.g. if your birth date is 01 Aug 1995, then app
            will check for 19950801, 01081995, 080195, 1081995
          </h5>
          <input value={date} type="date" onChange={changeHandler} />
          <button onClick={clickHandler}>check</button>
          {output ? (
            <div className="output">
              {loading ? <img src={loadingImage} alt="loading" /> : null}
              {palindromeOutput ? (
                <p>{`Hurray!!, You birthday ${palindromeBirthday} is a  Palindrome Birthday`}</p>
              ) : null}
              {notPalindromeOutput ? (
                <p>{`Ohh no, your birthday isn't palindrome, but the nearest date is ${nextDate[0]}. You have missed ${nextDate[1]} days`}</p>
              ) : null}
              {resetButton ? (
                <button onClick={resetHandler}>Reset</button>
              ) : null}
            </div>
          ) : null}
        </div>
        <footer></footer>
      </div>
    </div>
  );
}

export default App;
