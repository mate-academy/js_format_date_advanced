'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromFormatSeparator = fromFormat[fromFormat.length - 1];
  const toFormatSeparator = toFormat[toFormat.length - 1];
  const splitDate = date.split(fromFormatSeparator);
  const formatedDate = [];

  let day;
  let mounth;
  let year;
  let shortenYear;

  for (let i = 0; i < splitDate.length; i++) {
    switch (true) {
      case fromFormat[i] === 'DD':
        day = splitDate[i];
        break;

      case fromFormat[i] === 'MM':
        mounth = splitDate[i];
        break;

      case fromFormat[i] === 'YY' && splitDate[i] < 30:
        shortenYear = splitDate[i];
        year = `${20 + splitDate[i]}`;
        break;

      case fromFormat[i] === 'YY' && splitDate[i] >= 30:
        shortenYear = splitDate[i];
        year = `${19 + splitDate[i]}`;
        break;

      case fromFormat[i] === 'YYYY':
        year = splitDate[i];
        shortenYear = splitDate[i].slice(0, 2);
        break;
    }
  }

  for (let i = 0; i < splitDate.length; i++) {
    switch (true) {
      case toFormat[i] === 'DD':
        formatedDate.push(day);
        break;

      case toFormat[i] === 'MM':
        formatedDate.push(mounth);
        break;

      case toFormat[i] === 'YY' && shortenYear < 30:
        formatedDate.push(year.slice(2, 4));
        break;

      case toFormat[i] === 'YYYY':
        formatedDate.push(year);
        break;
    }
  }

  return formatedDate.join(toFormatSeparator);
}

module.exports = formatDate;
