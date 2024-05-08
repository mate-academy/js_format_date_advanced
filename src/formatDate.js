'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  let year;
  let month;
  let day;
  const result = [];
  const fromSeparator = fromFormat[3];
  const toSeparator = toFormat[3];

  const dateUnformated = date.split(fromSeparator);

  for (let i = 0; i < fromFormat.length; i++) {
    if (fromFormat[i] === 'YY') {
      year = [dateUnformated[i], 'YY'];
    }

    if (fromFormat[i] === 'YYYY') {
      year = [dateUnformated[i], 'YYYY'];
    }

    if (fromFormat[i] === 'MM') {
      month = dateUnformated[i];
    }

    if (fromFormat[i] === 'DD') {
      day = dateUnformated[i];
    }
  }

  for (let i = 0; i < toFormat.length; i++) {
    if (toFormat[i] === 'YYYY') {
      if (year[1] === 'YY') {
        if (year[0] < 30) {
          result[i] = `20${year[0]}`;
        } else {
          result[i] = `19${year[0]}`;
        }
        continue;
      }
      result[i] = year[0];
      continue;
    }

    if (toFormat[i] === 'YY') {
      if (year[1] === 'YYYY') {
        result[i] = year[0].slice(-2);
        continue;
      }
      result[i] = year[0];
    }

    if (toFormat[i] === 'MM') {
      result[i] = month;
    }

    if (toFormat[i] === 'DD') {
      result[i] = day;
    }
  }

  // console.log(result.join(toSeparator));
  return result.join(toSeparator);
}

module.exports = formatDate;

// const date = '1997-12-21';

// const fromFormat = ['YYYY', 'MM', 'DD', '-'];

// const toFormat = ['YY', 'MM', 'DD', '.'];

// formatDate(date, fromFormat, toFormat);
