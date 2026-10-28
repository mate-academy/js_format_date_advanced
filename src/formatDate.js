'use strict';

function formatDate(date, fromFormat, toFormat) {
  const parts = date.split(fromFormat[3]);
  const dateParts = {};

  dateParts[fromFormat[0]] = parts[0];
  dateParts[fromFormat[1]] = parts[1];
  dateParts[fromFormat[2]] = parts[2];

  let year = dateParts.YYYY || dateParts.YY;

  if (year.length === 2) {
    year = Number(year) < 30 ? `20${year}` : `19${year}`;
  }

  if (toFormat[0] === 'YY') {
    year = year.slice(-2);
  }

  dateParts.YYYY = year;
  dateParts.YY = year.slice(-2);

  return `${dateParts[toFormat[0]]}${toFormat[3]}${dateParts[toFormat[1]]}${toFormat[3]}${dateParts[toFormat[2]]}`;
}

module.exports = formatDate;
