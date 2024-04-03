'use strict';

function formatDate(date, fromFormat, toFormat) {
  const oldSeparator = fromFormat[3];
  const newSeparator = toFormat[3];
  const dateArr = date.split(oldSeparator);

  const dayIndex = fromFormat.indexOf('DD');
  const monthIndex = fromFormat.indexOf('MM');
  const yearIndex = fromFormat.findIndex(
    (format) => format === 'YY' || format === 'YYYY',
  );

  const day = dateArr[dayIndex];
  const month = dateArr[monthIndex];
  let year = dateArr[yearIndex];

  const currentYear = new Date().getFullYear() % 100;

  if (fromFormat[yearIndex] === 'YY') {
    if (parseInt(year) <= currentYear) {
      year = '20' + year.padStart(2, '0');
    } else {
      year = '19' + year.padStart(2, '0');
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
      case 'YYYY':
        result.push(year);
        break;
      case 'YY':
        result.push(year.slice(-2));
        break;
    }
  }

  return result.join(newSeparator);
}

module.exports = formatDate;
