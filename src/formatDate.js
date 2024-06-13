'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  if (fromFormat.length !== 4 || toFormat.length !== 4) {
    throw new Error(
      'Format should contain 4 elements including the separator.',
    );
  }

  const oldYear = yearFormatAndPlace(fromFormat);
  const newYear = yearFormatAndPlace(toFormat);

  const formatedDate = [];
  let dateParts = '';
  let year = '';

  if (typeof date === 'string') {
    dateParts = date.split(fromFormat[3]);
  }

  const newDateSeparator = toFormat[3];

  const thresholdYear = 30;

  if (oldYear.format !== newYear.format) {
    if (oldYear.format.length < newYear.format.length) {
      year =
        +dateParts[oldYear.place] < thresholdYear
          ? `20${dateParts[oldYear.place]}`
          : `19${dateParts[oldYear.place]}`;
    } else {
      year = dateParts[oldYear.place].slice(2);
    }
  } else {
    year = dateParts[oldYear.place];
  }

  const separators = ['-', '/', '.'];

  if (!separators.includes(toFormat[toFormat.length - 1])) {
    throw new Error('Invalid format. The last element should be a separator.');
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    switch (toFormat[i]) {
      case 'YYYY':
      case 'YY':
        formatedDate[i] = year;
        break;
      case 'MM':
        const mmIndex = fromFormat.indexOf('MM');

        if (mmIndex === -1) {
          throw new Error("'MM' is not part of the fromFormat array");
        }
        formatedDate[i] = dateParts[mmIndex];
        break;
      case 'DD':
        const ddIndex = fromFormat.indexOf('DD');

        if (ddIndex === -1) {
          throw new Error("'DD' is not part of the fromFormat array");
        }
        formatedDate[i] = dateParts[ddIndex];
        break;
    }
  }

  return formatedDate.join(newDateSeparator);
}

function yearFormatAndPlace(pattern) {
  const longYearFormat = 'YYYY';
  const shortYearFormat = 'YY';
  let format = '';
  let place = -1;

  if (!pattern.includes(longYearFormat) && !pattern.includes(shortYearFormat)) {
    throw new Error(
      'Invalid pattern. Pattern should contain either "YYYY" or "YY".',
    );
  }

  for (let i = 0; i < pattern.length; i++) {
    if (pattern[i] === longYearFormat || pattern[i] === shortYearFormat) {
      format = pattern[i];
      place = i;
      break;
    }
  }

  return {
    format,
    place,
  };
}

module.exports = formatDate;
