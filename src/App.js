import React, { useState } from "react";
import "./App.css";
import loadingImage from "./assets/loading.gif";
import birthday from "./assets/birthday.jpg";
import {
  getDateAsString,
  checkPalindromeForAllDateFormats,
  getNextPalindromeDate,
  getPreviousPalindromeDate,
} from "./checkPalindrome";

function App() {
  const [date, setDate] = useState("");
  const [nearestDate, setNearestDate] = useState([]);
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState(false);
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
      //setPalindromeBirthday(dateFormatter(year, month, day));
      var dateObj = {
        day: Number(day),
        month: Number(month),
        year: Number(year),
      };

      var dateStr = getDateAsString(dateObj);
      var list = checkPalindromeForAllDateFormats(dateStr);
      var isPalindrome = false;

      for (let i = 0; i < list.length; i++) {
        if (list[i]) {
          isPalindrome = true;
          break;
        }
      }

      setOutput(true);
      setLoading(true);
      setTimeout(() => {
        if (isPalindrome) {
          setPalindromeOutput(true);
          setLoading(false);
          setResetButton(true);
        } else {
          //const nextDate = findNextDate(year, month, day);
          // console.log(nextDate);
          // console.log(`Next Date: ${nextDate[0]}, difference: ${nextDate[1]}`);
          const [ctr1, nextDate] = getNextPalindromeDate(dateObj);
          const [ctr2, prevDate] = getPreviousPalindromeDate(dateObj);

          if (ctr1 > ctr2) {
            let arr = [];
            let prevDateStr = getDateAsString({
              day: prevDate.day,
              month: prevDate.month,
              year: prevDate.year,
            });
            let prevDateArr = [
              prevDateStr.month,
              prevDateStr.day,
              prevDateStr.year,
            ];
            prevDateStr = prevDateArr.join("-");
            arr.push(prevDateStr);
            arr.push(ctr2);
            setNearestDate(arr);
          } else {
            let arr = [];
            let nextDateStr = getDateAsString({
              day: nextDate.day,
              month: nextDate.month,
              year: nextDate.year,
            });
            let nextDateArr = [
              nextDateStr.month,
              nextDateStr.day,
              nextDateStr.year,
            ];
            nextDateStr = nextDateArr.join("-");
            arr.push(nextDateStr);
            arr.push(ctr1);
            setNearestDate(arr);
          }
          setNotPalindromeOutput(true);
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
                <p>{`Hurray!!, You birthday is a  Palindrome Birthday`}</p>
              ) : null}
              {notPalindromeOutput ? (
                <p>{`Ohh no, your birthday isn't palindrome, but the nearest date is ${nearestDate[0]}. You have missed ${nearestDate[1]} days`}</p>
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
