'use strict';

const FORMATS = {
  YEAR_LONG: 'YYYY',
  YEAR_SHORT: 'YY',
};

const CENTURIES = {
  TWENTIETH: '19',
  TWENTY_FIRST: '20',
};

function formatDate(date, fromFormat, toFormat) {
  const oldSeparator = fromFormat[3];
  const newSeparator = toFormat[3];
  const dateArr = date.split(oldSeparator);

  const dayIndex = fromFormat.indexOf('DD');
  const monthIndex = fromFormat.indexOf('MM');
  const yearIndex = fromFormat.findIndex(
    (format) => format === FORMATS.YEAR_SHORT || format === FORMATS.YEAR_LONG,
  );

  const day = dateArr[dayIndex];
  const month = dateArr[monthIndex];
  let year = dateArr[yearIndex];

  const currentYear = new Date().getFullYear() % 100;

  if (fromFormat[yearIndex] === FORMATS.YEAR_SHORT) {
    if (parseInt(year) <= currentYear) {
      year = CENTURIES.TWENTY_FIRST + year.padStart(2, '0');
    } else {
      year = CENTURIES.TWENTIETH + year.padStart(2, '0');
    }
  }

  const result = [];

  for (const el of toFormat) {
    switch (el) {
      case 'DD':
        result.push(day);
        break;
      case 'MM':
        result.push(month);
        break;
      case FORMATS.YEAR_LONG:
        result.push(year);
        break;
      case FORMATS.YEAR_SHORT:
        result.push(year.slice(-2));
        break;
    }
  }

  return result.join(newSeparator);
}

module.exports = formatDate;
