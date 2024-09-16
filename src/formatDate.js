'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const datesArray = date.split(fromFormat[3]);
  const parsedDate = parse(datesArray, fromFormat);
  const convertedYear = convert(
    parsedDate.year,
    parsedDate.yearFormat,
    toFormat,
  );

  const result = toFormat
    .slice(0, 3)
    .join(toFormat[3])
    .replace('DD', parsedDate.day)
    .replace('MM', parsedDate.month)
    .replace('YYYY', convertedYear)
    .replace('YY', convertedYear);

  return result;
}

function parse(datesArray, format) {
  const result = {};

  if (format.includes('YY')) {
    result['yearFormat'] = 'YY';
    result['year'] = datesArray[format.indexOf('YY')];
  } else {
    result['yearFormat'] = 'YYYY';
    result['year'] = datesArray[format.indexOf('YYYY')];
  }

  result['month'] = datesArray[format.indexOf('MM')];
  result['day'] = datesArray[format.indexOf('DD')];

  return result;
}

function convert(year, yearFormat, toFormat) {
  if (toFormat.includes('YY') && yearFormat === 'YYYY') {
    return year.slice(2, 4);
  }

  if (toFormat.includes('YYYY') && yearFormat === 'YY') {
    return year < 30 ? '20' + year : '19' + year;
  }

  return year;
}

module.exports = formatDate;
