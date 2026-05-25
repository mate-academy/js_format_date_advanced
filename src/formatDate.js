'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  const sepFrom = fromFormat.at(3);
  const sepTo = toFormat.at(3);

  const fromDateArray = date.split(sepFrom);
  const fromDateObj = {};

  fromFormat.slice(0, 3).forEach((format, index) => {
    fromDateObj[format] = fromDateArray[index];
  });

  if (fromDateObj.YYYY) {
    fromDateObj.YY = fromDateObj.YYYY.slice(2);
  } else {
    const shortYear = +fromDateObj.YY;

    fromDateObj.YYYY = String(
      shortYear < 30 ? 2000 + shortYear : 1900 + shortYear,
    );
  }

  const newDateArray = toFormat
    .slice(0, 3)
    .map((format) => fromDateObj[format]);

  return newDateArray.join(sepTo);
}

module.exports = formatDate;
