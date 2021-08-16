export function reverseString(str) {
  var listOfChars = str.split("");
  var reversedListOfChar = listOfChars.reverse();
  var reversedString = reversedListOfChar.join("");
  return reversedString;
}

export function isStringPalindrome(str) {
  var reversedString = reverseString(str);
  return str === reversedString;
}

export function getDateAsString(date) {
  var dateInStr = { day: "", month: "", year: "" };

  if (date.day < 10) {
    dateInStr.day = "0" + date.day;
  } else {
    dateInStr.day = date.day.toString();
  }

  if (date.month < 10) {
    dateInStr.month = "0" + date.month;
  } else {
    dateInStr.month = date.month.toString();
  }

  dateInStr.year = date.year.toString();
  return dateInStr;
}

export function getDateInAllFormats(date) {
  var ddmmyyyy = date.day + date.month + date.year;
  var mmddyyyy = date.month + date.day + date.year;
  var yyyymmdd = date.year + date.month + date.day;
  var ddmmyy = date.day + date.month + date.year.slice(-2);
  var mmddyy = date.month + date.day + date.year.slice(-2);
  var yyddmm = date.year.slice(-2) + date.day + date.month;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yyddmm];
}

export function checkPalindromeForAllDateFormats(date) {
  var dateFormatList = getDateInAllFormats(date);
  var palindromeList = [];

  for (var i = 0; i < dateFormatList.length; i++) {
    var result = isStringPalindrome(dateFormatList[i]);
    palindromeList.push(result);
  }
  return palindromeList;
}

export function isLeapYear(year) {
  if (year % 400 === 0) return true;

  if (year % 100 === 0) return false;

  if (year % 4 === 0) return true;

  return false;
}

export function getNextDate(date) {
  var day = date.day + 1;
  var month = date.month;
  var year = date.year;

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 2) {
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month = 3;
      }
    } else {
      if (day > 28) {
        day = 1;
        month = 3;
      }
    }
  } else {
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month++;
    }
  }

  if (month > 12) {
    month = 1;
    year++;
  }

  return {
    day: day,
    month: month,
    year: year,
  };
}

export function getNextPalindromeDate(date) {
  var nextDate = getNextDate(date);
  var ctr = 0;

  while (1) {
    ctr++;
    var dateStr = getDateAsString(nextDate);
    var resultList = checkPalindromeForAllDateFormats(dateStr);

    for (let i = 0; i < resultList.length; i++) {
      if (resultList[i]) {
        return [ctr, nextDate];
      }
    }
    nextDate = getNextDate(nextDate);
  }
}

export function getPreviousDate(date) {
  var day = date.day - 1;
  var month = date.month;
  var year = date.year;

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (day === 0) {
    month--;

    if (month === 0) {
      month = 12;
      day = 31;
      year--;
    } else if (month === 2) {
      if (isLeapYear(year)) {
        day = 29;
      } else {
        day = 28;
      }
    } else {
      day = daysInMonth[month - 1];
    }
  }

  return {
    day: day,
    month: month,
    year: year,
  };
}

export function getPreviousPalindromeDate(date) {
  var previousDate = getPreviousDate(date);
  var ctr = 0;

  while (1) {
    ctr++;
    var dateStr = getDateAsString(previousDate);
    var resultList = checkPalindromeForAllDateFormats(dateStr);

    for (let i = 0; i < resultList.length; i++) {
      if (resultList[i]) {
        return [ctr, previousDate];
      }
    }
    previousDate = getPreviousDate(previousDate);
  }
}

/*
const datesInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export function checkPalindrome(birthdate) {
  let rev = birthdate.split("").reverse("").join("");
  return rev === birthdate;
}

export function dateFormatter(year, month, day) {
  // YYYY - MM - DD
  // MM - DD - YYYY
  // DD - MM - YYYY
  // YY - MM - DD
  // MM - DD - YY
  // DD - MM - YY

  const yyyyMMDD = year + month + day;
  const mmDDYYYY = month + day + year;
  const ddMMYYYY = day + month + year;
  const yearIn2Digits = year.slice(-2);
  const yyMMDD = yearIn2Digits + month + day;
  const mmDDYY = month + day + yearIn2Digits;
  const ddMMYY = day + month + yearIn2Digits;

  switch (true) {
    case checkPalindrome(yyyyMMDD):
      return `${year}-${month}-${day}`;
    case checkPalindrome(mmDDYYYY):
      return `${month}-${day}-${year}`;
    case checkPalindrome(ddMMYYYY):
      return `${day}-${month}-${year}`;
    case checkPalindrome(yyMMDD):
      return `${yearIn2Digits}-${month}-${day}`;
    case checkPalindrome(mmDDYY):
      return `${month}-${day}-${yearIn2Digits}`;
    case checkPalindrome(ddMMYY):
      return `${day}-${month}-${yearIn2Digits}`;
    default:
      return null;
  }
}

export function findNextDate(year, month, day) {
  let ddNo1 = Number(day);
  let mmNo1 = Number(month);
  let yyNo1 = Number(year);
  let ddNo2 = Number(day);
  let mmNo2 = Number(month);
  let yyNo2 = Number(year);

  for (let i = 1; i > 0; i++) {
    //forward check
    ddNo1 = ddNo1 + 1;
    if (ddNo1 > Number(datesInMonth[mmNo1 - 1])) {
      ddNo1 = 1;
      mmNo1 = mmNo1 + 1;
      if (mmNo1 > 12) {
        mmNo1 = 1;
        yyNo1 = yyNo1 + 1;
      }
    }
    let yyString = yyNo1.toString();
    let mmString = mmNo1.toString();
    let ddString = ddNo1.toString();
    if (mmString.length === 1) {
      mmString = "0" + mmString;
    }
    if (ddString.length === 1) {
      ddString = "0" + ddString;
    }
    let setFlagNextDate = dateFormatter(yyString, mmString, ddString);
    if (setFlagNextDate) {
      return [`${setFlagNextDate}`, i];
    }

    //backward check
    if (yyNo2 > 1) {
      ddNo2 = ddNo2 - 1;
      if (ddNo2 < 1) {
        mmNo2 = mmNo2 - 1;
        if (mmNo2 < 1) {
          mmNo2 = 12;
          yyNo2 = yyNo2 - 1;
          if (yyNo2 < 1) {
            break;
          }
          ddNo2 = datesInMonth[mmNo2 - 1];
        }
      }
      let yyString = yyNo2.toString();
      let mmString = mmNo2.toString();
      let ddString = ddNo2.toString();
      if (mmString.length === 1) {
        mmString = "0" + mmString;
      }
      if (ddString.length === 1) {
        ddString = "0" + ddString;
      }
      let setFlagNextDate = dateFormatter(yyString, mmString, ddString);
      if (setFlagNextDate) {
        return [`${setFlagNextDate}`, i];
      }
    }
  }
}
*/
