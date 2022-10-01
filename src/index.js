var dateInputRef = document.querySelector("#birthdate");
var showBtnRef = document.querySelector("#chkBtn");
var resultRef = document.querySelector("#output");

function checkPalindrome(str) {
  var reverseStr = str.split("").reverse().join("");
  return str === reverseStr;
}
function convertDateToString(date) {
  var dateString = { day: "", month: "", year: "" };

  if (date.day < 10) {
    dateString.day = "0" + date.day;
  } else {
    dateString.day = date.day.toString();
  }
  if (date.month < 10) {
    dateString.month = "0" + date.month;
  } else {
    dateString.month = date.month.toString();
  }
  dateString.year = date.year.toString();

  return dateString;
}

function getDateFormates(date) {
  var dateString = convertDateToString(date);

  var ddmmyyyy = dateString.day + dateString.month + dateString.year;
  var mmddyyyy = dateString.month + dateString.day + dateString.year;
  var yyyymmdd = dateString.year + dateString.month + dateString.day;
  var ddmmyy = dateString.day + dateString.month + dateString.year.slice(-2);
  var mmddyy = dateString.month + dateString.day + dateString.year.slice(-2);
  var yymmdd = dateString.year.slice(-2) + dateString.month + dateString.day;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkAnyDateFormatIsPalindrome(date) {
  var listOfAllDateFormats = getDateFormates(date);

  var flag = false;

  for (var i = 0; i < listOfAllDateFormats.length; i++) {
    if (checkPalindrome(listOfAllDateFormats[i])) {
      flag = true;
      break;
    }
  }

  return flag;
}
function checkLeapYear(date) {
  if (date.year % 4 === 0) {
    return true;
  }

  if (date.year % 100 === 0) {
    return true;
  }

  if (date.year % 400 === 0) {
    return true;
  }
  return false;
}

function getNextDate(date) {
  var day = date.day + 1;
  var month = date.month;
  var year = date.year;

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // 0 - 11

  if (month === 2) {
    if (checkLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month++;
      }
    } else {
      if (day > 28) {
        day = 1;
        month++;
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
    year: year
  };
}

function getNextPalindromeDate(date) {
  var ctr = 0;
  var nextDate = getNextDate(date);

  while (1) {
    ctr++;
    var checkPalindrome = checkAnyDateFormatIsPalindrome(nextDate);
    if (checkPalindrome) {
      break;
    }
    nextDate = getNextDate(nextDate);
  }
  return [ctr, nextDate];
}
function getPreviousDate(date) {
  var day = date.day - 1;
  var month = date.month;
  var year = date.year;

  if (day === 0 && month === 3) {
    if (checkLeapYear(year)) {
      day = 29;
      month--;
    } else {
      day = 28;
      month--;
    }
  } else {
    if (day === 0 && (month === 1 || 3 || 5 || 7 || 8 || 10 || 12)) {
      day = 31;
      month--;
    } else if (day === 0 && (month === 2 || 4 || 6 || 9 || 11)) {
      day = 30;
      month--;
    } else if (month === 0) {
      month = 12;
      year--;
    }
  }

  return {
    day: day,
    month: month,
    year: year
  };
}
function getPreviousPalindromeDate(date) {
  var ctr2 = 0;
  var previousDate = getPreviousDate(date);

  while (1) {
    ctr2++;
    var checkPalindrome = checkAnyDateFormatIsPalindrome(previousDate);
    if (checkPalindrome) {
      break;
    }
    previousDate = getPreviousDate(previousDate);
  }
  return [ctr2, previousDate];
}

function clickHandler(e) {
  var bdayStr = dateInputRef.value;

  if (bdayStr !== "") {
    var listOfDate = bdayStr.split("-");

    var date = {
      day: Number(listOfDate[2]),
      month: Number(listOfDate[1]),
      year: Number(listOfDate[0])
    };

    var checkPalindrome = checkAnyDateFormatIsPalindrome(date);

    if (checkPalindrome) {
      resultRef.innerText = "Yay! your birthday is a palindrome!! 🥳🥳";
    } else {
      var [ctr, nextDate] = getNextPalindromeDate(date);
      var [ctr2, previousDate] = getPreviousPalindromeDate(date);

      if (ctr > ctr2) {
        resultRef.innerText = `The previous palindrome date is ${previousDate.day}-${previousDate.month}-${previousDate.year}, you missed it by ${ctr2} days! 😔`;
      } else {
        resultRef.innerText = `The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${ctr} days! 😔`;
      }
    }
  }
}

showBtnRef.addEventListener("click", clickHandler);
