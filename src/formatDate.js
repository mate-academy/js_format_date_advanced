'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const indexOfDay = fromFormat.indexOf('DD');
  const indexOfMonth = fromFormat.indexOf('MM');
  const indexOfYear2 = fromFormat.indexOf('YY');
  const indexOfYear4 = fromFormat.indexOf('YYYY');

  const fromFormatArray = date.split(fromFormat[fromFormat.length - 1]);
  const toFormatArray = [...toFormat];
  let alternativeYear = 0;

  if (fromFormatArray[indexOfYear2] < 30) {
    alternativeYear = 20 + fromFormatArray[indexOfYear2];
  } else {
    alternativeYear = 19 + fromFormatArray[indexOfYear2];
  };

  for (let i = 0; i < toFormatArray.length; i++) {
    if (toFormatArray[i] === 'DD') {
      toFormatArray[i] = fromFormatArray[indexOfDay];
    };

    if (toFormatArray[i] === 'MM') {
      toFormatArray[i] = fromFormatArray[indexOfMonth];
    };

    if (toFormatArray[i] === 'YYYY' && indexOfYear4 === -1) {
      toFormatArray[i] = alternativeYear;
    };

    if (toFormatArray[i] === 'YYYY') {
      toFormatArray[i] = fromFormatArray[indexOfYear4];
    };

    if (toFormatArray[i] === 'YY') {
      toFormatArray[i] = fromFormatArray[indexOfYear4].slice(2,
        indexOfYear4.length);
    };
  }

  toFormatArray.length -= 1;

  return toFormatArray.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
