'use strict';

function formatDate(date, fromFormat, toFormat) {
  let countEight = 2;
  let countYear = 0; let countMonth = 0; let countDay = 0;
  const separator = toFormat.slice(-1);
  let result = '';
  let year = ''; let month = ''; let day = '';
  const newFromFormat = fromFormat.slice(' ', 3).join(' ');
  const newToFormat = toFormat.slice(' ', 3).join(' ');

  for (let i = 0; i < newFromFormat.length; i++) {
    if (newFromFormat[i] === 'Y') {
      year += date[i];
    }

    if (newFromFormat[i] === 'D') {
      day += date[i];
    }

    if (newFromFormat[i] === 'M') {
      month += date[i];
    }
  }

  for (let i = 0; i < newToFormat.length; i++) {
    if (newToFormat.length === 8) {
      if (newToFormat[i] === 'Y') {
        result += year[countEight];
        countEight++;
      } else if (newToFormat[i] === 'D') {
        result += day[countDay];
        countDay++;
      } else if (newToFormat[i] === 'M') {
        result += month[countMonth];
        countMonth++;
      } else {
        result += separator;
      }
    }

    if (newToFormat.length === 10) {
      if (newToFormat[i] === 'Y') {
        result += year[countYear];
        countYear++;
      } else if (newToFormat[i] === 'D') {
        result += day[countDay];
        countDay++;
      } else if (newToFormat[i] === 'M') {
        result += month[countMonth];
        countMonth++;
      } else {
        result += separator;
      }
    }
  }

  return result;
}

module.exports = formatDate;
