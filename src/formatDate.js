'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const formatedDate = [];
  const splitedDate = date.split(fromFormat[3]);
  const yearIndex = fromFormat.indexOf('YYYY');
  const yearIndexShort = fromFormat.indexOf('YY');
  const monthIndex = fromFormat.indexOf('MM');
  const dayIndex = fromFormat.indexOf('DD');

  for (const key of toFormat) {
    if (key === 'DD') {
      formatedDate.push(splitedDate[dayIndex]);
    }

    if (key === 'MM') {
      formatedDate.push(splitedDate[monthIndex]);
    }

    if (key === 'YYYY') {
      if (splitedDate[yearIndex]) {
        formatedDate.push(splitedDate[yearIndex]);
      } else {
        if (+splitedDate[yearIndexShort] > 20) {
          formatedDate.push(`19${splitedDate[yearIndexShort]}`);
        } else {
          formatedDate.push(`20${splitedDate[yearIndexShort]}`);
        }
      }
    }

    if (key === 'YY') {
      if (splitedDate[yearIndexShort]) {
        formatedDate.push(splitedDate[yearIndexShort]);
      } else {
        formatedDate.push(splitedDate[yearIndex].slice(2));
      }
    }
  }

  return formatedDate.join(toFormat[3]);
}

module.exports = formatDate;
