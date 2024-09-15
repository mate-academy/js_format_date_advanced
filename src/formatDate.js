'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  // write code here
  const dateInArrey = date.split(fromFormat[3]);
  const yearFull = 'YYYY';
  const yearShort = 'YY';
  const month = 'MM';
  const day = 'DD';
  const sortNum = {};
  const formatedDate = [];

  for (let i = 0; i < dateInArrey.length; i++) {
    sortNum[fromFormat[i]] = dateInArrey[i];
  }

  for (let i = 0; i < dateInArrey.length; i++) {
    switch (toFormat[i]) {
      case day:
        formatedDate.push(sortNum[day]);
        break;

      case month:
        formatedDate.push(sortNum[month]);
        break;

      case yearFull:
        const newFullForm = sortNum[yearShort] < 30 ? `20${sortNum[yearShort]}` : `19${sortNum[yearShort]}`;

        if (sortNum[yearShort]) {
          formatedDate.push(newFullForm);
        } else {
          formatedDate.push(sortNum[yearFull]);
        }
        break;

      case yearShort:
        if (sortNum[yearFull]) {
          const newForm = sortNum[yearFull].slice(-2);

          formatedDate.push(newForm);
        } else {
          formatedDate.push(sortNum[yearShort]);
        }
        break;

      default:
        break;
    }
  }

  return formatedDate.join(toFormat[3]);
}

module.exports = formatDate;
