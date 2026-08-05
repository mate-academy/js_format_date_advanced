'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSeparator = fromFormat[3];
  const toSeparator = toFormat[3];

  // Split the input date string into 3 parts using the old separator
  const parts = date.split(fromSeparator);

  // Store parsed year, month, and day
  let year = '';
  let month = '';
  let day = '';

  // Extract values according to fromFormat definition
  for (let i = 0; i < 3; i++) {
    const key = fromFormat[i];
    const val = parts[i];

    if (key === 'YYYY' || key === 'YY') {
      year = val;
    } else if (key === 'MM') {
      month = val;
    } else if (key === 'DD') {
      day = val;
    }
  }

  // Handle year conversions if necessary
  const targetYearFormat = toFormat.find(
    (item) => item === 'YYYY' || item === 'YY',
  );

  if (targetYearFormat === 'YY' && year.length === 4) {
    // YYYY -> YY (e.g. 1997 -> 97)
    year = year.slice(-2);
  } else if (targetYearFormat === 'YYYY' && year.length === 2) {
    // YY -> YYYY (use 20YY if YY < 30, else 19YY)
    const numYear = Number(year);

    year = numYear < 30 ? `20${year}` : `19${year}`;
  }

  // Map parts to their new position according to toFormat
  const resultParts = [];

  for (let i = 0; i < 3; i++) {
    const key = toFormat[i];

    if (key === 'YYYY' || key === 'YY') {
      resultParts.push(year);
    } else if (key === 'MM') {
      resultParts.push(month);
    } else if (key === 'DD') {
      resultParts.push(day);
    }
  }

  // Join the parts using the new separator
  return resultParts.join(toSeparator);
}

module.exports = formatDate;
