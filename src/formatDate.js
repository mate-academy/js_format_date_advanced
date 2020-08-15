'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  const newDate = [];

  const oldSep = fromFormat[3];
  const newSep = toFormat[3];

  const dateArr = date.split(oldSep);

  for (let i = 0; i < toFormat.length - 1; i++) {
    const itemIndex = fromFormat.indexOf(toFormat[i]);

    if (itemIndex === -1) {
      switch (toFormat[i]) {
        case 'YYYY':
          let year = dateArr[fromFormat.indexOf('YY')];

          year > 21
            ? year = `19${year}`
            : year = `20${year}`;

          newDate[i] = year;
          break;

        case 'YY':
          const oldYear = dateArr[fromFormat.indexOf('YYYY')];
          const newYear = oldYear.split('').slice(-2).join('');

          newDate[i] = newYear;
          break;

        default:
          return 'Incorrect format';
      }
    } else {
      newDate[i] = dateArr[itemIndex];
    }
  }

  return newDate.join(newSep);
}

module.exports = formatDate;
