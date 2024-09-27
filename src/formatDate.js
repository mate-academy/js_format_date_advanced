'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateInArrey = date.split(fromFormat[3]);
  const yearFull = 'YYYY';
  const yearShort = 'YY';
  const month = 'MM';
  const day = 'DD';
  const sortNum = {};
  const formatedDay = [];

  for (let i = 0; i < dateInArrey.length; i++) {
    sortNum[fromFormat[i]] = dateInArrey[i];
  }

  for (let i = 0; i < dateInArrey.length; i++) {
    switch (toFormat[i]) {
      case day:
        formatedDay.push(sortNum[day]);
        break;

      case month:
        formatedDay.push(sortNum[month]);
        break;

      case yearFull:
        const newFullForm = sortNum[yearShort] < 30 ? `20${sortNum[yearShort]}` : `19${sortNum[yearShort]}`;

        if (sortNum[yearShort]) {
          formatedDay.push(newFullForm);
        } else {
          formatedDay.push(sortNum[yearFull]);
        }
        break;

      case yearShort:
        if (sortNum[yearFull]) {
          const newForm = sortNum[yearFull].slice(-2);

          formatedDay.push(newForm);
        } else {
          formatedDay.push(sortNum[yearShort]);
        }
        break;

      default:
        break;
    }
  }

  return formatedDay.join(toFormat[3]);
}

module.exports = formatDate;
