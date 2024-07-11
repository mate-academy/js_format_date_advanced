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

  const dateParts = date.split(fromFormat[SEPARATOR_INDEX]);
  const dateObject = getDateObject(
    dateParts,
    fromFormat,
    toFormat,
    SEPARATOR_INDEX,
  );

  return getNewDate(toFormat, dateParts, dateObject);
}

function getDateObject(dateParts, fromFormat, toFormat, separatorIndex) {
  const dateObject = {
    separator: toFormat[separatorIndex],
  };

  for (let i = 0; i < separatorIndex; i++) {
    dateObject[fromFormat[i]] = dateParts[i];
  }

  return dateObject;
}

function getNewDate(toFormat, dateArray, dateObject) {
  const YEAR_SIGN = 'Y';

  let newDate = '';

  for (let i = 0; i < dateArray.length; i++) {
    if (toFormat[i][0] === YEAR_SIGN) {
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

function getRightYear(toYearFormat, dateObject) {
  const YEAR_FORMAT_SHORT = 'YY';
  const YEAR_FORMAT_FULL = 'YYYY';
  const BORDER_TO_DEFINE_CENTURY = 30;
  const PREFIX_CENTURY_OLD = '19';
  const PREFIX_CENTURY_NEW = '20';

  if (toYearFormat in dateObject) {
    return dateObject[toYearFormat];
  }

  if (toYearFormat === YEAR_FORMAT_SHORT) {
    return dateObject[YEAR_FORMAT_FULL].slice(2);
  }

  if (+dateObject[YEAR_FORMAT_SHORT] < BORDER_TO_DEFINE_CENTURY) {
    return PREFIX_CENTURY_NEW + dateObject[YEAR_FORMAT_SHORT];
  }

  return PREFIX_CENTURY_OLD + dateObject[YEAR_FORMAT_SHORT];
}

module.exports = formatDate;
