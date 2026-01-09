'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const result = [];
  const separator = fromFormat.pop();
  const newSeparator = toFormat.pop();
  const dateDivided = date.split(separator);
  const oldDate = {};
  const newFormat = {};
  const yearFormat = ['YYYY', 'YY', 'Y'];
  let currentFormatYear;

  for (const i of yearFormat) {
    if (fromFormat.includes(i)) {
      currentFormatYear = i;
    }
  }

  for (let i = 0; i < fromFormat.length; i++) {
    oldDate[fromFormat[i]] = dateDivided[i];
  }

  for (let i = 0; i < toFormat.length; i++) {
    newFormat[toFormat[i]] = oldDate[toFormat[i]];
  }

  for (const key in newFormat) {
    const currentYears = oldDate[currentFormatYear];

    if (currentFormatYear === key) {
      break;
    }

    if (key === 'YY') {
      newFormat[key] = String(currentYears).slice(-2);
    }

    if (key === 'Y') {
      newFormat[key] = String(currentYears).slice(-3);
    }

    if (key === 'YYYY') {
      if (currentYears < 30) {
        newFormat[key] = '20' + currentYears;
      } else {
        newFormat[key] = '19' + currentYears;
      }
    }
  }

  for (let i = 0; i < toFormat.length; i++) {
    const key = toFormat[i];

    result.push(newFormat[key]);
  }

  return result.join(newSeparator);
}

module.exports = formatDate;

const test = [
  {
    date: '10/22/1979',
    fromFormat: ['MM', 'DD', 'YYYY', '/'],
    toFormat: ['MM', 'DD', 'YY', '/'],
  },
  // {
  //   date: '2012-12-21',
  //   fromFormat: ['YYYY', 'MM', 'DD', '-'],
  //   toFormat: ['DD', 'MM', 'YYYY', '-'],
  // },
];

test.forEach((item) => {
  console.log(formatDate(item.date, item.fromFormat, item.toFormat));
});
