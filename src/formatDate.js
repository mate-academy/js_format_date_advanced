'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const yearIndx = fromFormat.indexOf('YY') === -1
    ? fromFormat.indexOf('YYYY')
    : fromFormat.indexOf('YY');

  const monthIndx = fromFormat.indexOf('MM');
  const dayIndx = fromFormat.indexOf('DD');

  const referenceDateArr = date.split(fromFormat[3]);

  const newDateArr = [];

  for (const item of toFormat) {
    switch (item) {
      case 'YY':
        newDateArr.push(referenceDateArr[yearIndx].slice(-2));
        break;

      case 'YYYY':
        let newYear = referenceDateArr[yearIndx];

        if (newYear.length === 2) {
          const centuryPart = +newYear < 30
            ? '20'
            : '19';

          newYear = centuryPart + newYear;
        }

        newDateArr.push(newYear);
        break;

      case 'MM':
        newDateArr.push(referenceDateArr[monthIndx]);
        break;

      case 'DD':
        newDateArr.push(referenceDateArr[dayIndx]);
        break;

      default:
        break;
    }
  }

  return newDateArr.join(toFormat[3]);
}

module.exports = formatDate;
