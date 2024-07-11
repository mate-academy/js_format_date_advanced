'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const SEPARATOR_INDEX = 3;

  const dateArray = date.split(fromFormat[SEPARATOR_INDEX]);
  const dateObject = getDateObject(
    dateArray,
    fromFormat,
    toFormat,
    SEPARATOR_INDEX,
  );

  return getNewDate(toFormat, dateArray, dateObject);
}

function getDateObject(dateArray, fromFormat, toFormat, separatorIndex) {
  const dateObject = {
    separator: toFormat[separatorIndex],
  };

  for (let i = 0; i < separatorIndex; i++) {
    dateObject[fromFormat[i]] = dateArray[i];
  }

  return dateObject;
}

function getNewDate(toFormat, dateArray, dateObject) {
  const YEAR_SIGN = 'Y';

  let newDate = '';

  for (let i = 0; i < dateArray.length; i++) {
    if (toFormat[i].includes(YEAR_SIGN)) {
      newDate += getRightYear(toFormat[i], dateObject);
    } else {
      newDate += dateObject[toFormat[i]];
    }

    if (i < 2) {
      newDate += dateObject.separator;
    }
  }

  return newDate;
}

function getRightYear(toFormat, date) {
  const YEAR_FORMAT_SHORT = 'YY';
  const YEAR_FORMAT_FULL = 'YYYY';

  if (toFormat in date) {
    return date[toFormat];
  }

  if (toFormat === YEAR_FORMAT_SHORT) {
    return date[YEAR_FORMAT_FULL].slice(2);
  }

  if (date[YEAR_FORMAT_SHORT] < 30) {
    return '20' + date[YEAR_FORMAT_SHORT];
  }

  return '19' + date[YEAR_FORMAT_SHORT];
}

module.exports = formatDate;
