'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateAsObject = {};
  const formatedDate = [];
  const fromSeparator = fromFormat.slice(-1);
  const toSeparator = toFormat.slice(-1);
  const dateAsArray = date.split(fromSeparator);
  const toDateFormat = toFormat.slice(0, -1);

  dateAsArray.forEach((e, i) => {
    const dateFormat = fromFormat[i];

    if (!toFormat.includes(dateFormat)) {
      const year = dateFormat === 'YY' ? 'YYYY' : 'YY';

      dateAsObject[year] = formatYear(e);

      return;
    }

    dateAsObject[dateFormat] = e;
  });

  toDateFormat.forEach((e) => {
    formatedDate.push(dateAsObject[e]);
  });

  return formatedDate.join(toSeparator);
}

function formatYear(year) {
  const minYear = 30;
  const gratertCentury = '20';
  const lowerCentury = '19';

  if (year.length < 3) {
    return +year < minYear ? gratertCentury + year : lowerCentury + year;
  }

  return year.slice(-2);
}

module.exports = formatDate;
