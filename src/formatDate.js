'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const firstSeparator = fromFormat[fromFormat.length - 1];
  const firstFomat = fromFormat.slice(0, 3);
  const firstDateTo = date.split(firstSeparator);

  let day;
  let month;
  let year;

  for (let i = 0; i < firstFomat.length; i++) {
    if (firstFomat[i].includes('DD')) {
      day = firstDateTo[i];
    }

    if (firstFomat[i].includes('MM')) {
      month = firstDateTo[i];
    }

    if (firstFomat[i].includes('YY')) {
      if (firstFomat[i].length === 4) {
        year = firstDateTo[i].slice(2);
      } else {
        year = firstDateTo[i];
      }
    }
  }

  const secondSeparator = toFormat[toFormat.length - 1];
  const secondFormat = toFormat.slice(0, 3);
  const finalDate = [];

  for (let i = 0; i < secondFormat.length; i++) {
    if (secondFormat[i].includes('DD')) {
      finalDate.push(day);
    }

    if (secondFormat[i].includes('MM')) {
      finalDate.push(month);
    }

    if (secondFormat[i].includes('YY')) {
      if (secondFormat[i].length === 4) {
        if (year < 30) {
          year = `20${year}`;
        } else {
          year = `19${year}`;
        }
      }

      finalDate.push(year);
    }
  }

  return finalDate.join(secondSeparator);
}

module.exports = formatDate;
