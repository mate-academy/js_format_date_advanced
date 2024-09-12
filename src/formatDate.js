'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const arrDate = date.split(fromFormat[fromFormat.length - 1]);
  const dateObj = {};
  const outputDate = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    dateObj[fromFormat[i]] = arrDate[i];
  };

  formatYear(dateObj);

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i] in dateObj) {
      outputDate.push(dateObj[toFormat[i]]);
    }
  }

  return outputDate.join(toFormat[toFormat.length - 1]);
}

function formatYear(obj) {
  if ('YYYY' in obj) {
    const tempArr = obj['YYYY'].split('').slice(-2);

    obj['YY'] = tempArr.join('');
  } else if ('YY' in obj) {
    let yyValue = obj['YY'];

    if (yyValue >= 30) {
      yyValue = '19' + yyValue;
    } else {
      yyValue = '20' + yyValue;
    }

    obj['YYYY'] = yyValue;
  }
}

module.exports = formatDate;
