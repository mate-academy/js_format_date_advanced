'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const normilizedFromFormat = formatDestructing(fromFormat);
  const normilizedToFormat = formatDestructing(toFormat);

  // let dateArr = date.split(normilizedFromFormat.delim);

  let day;
  let month;
  let year;

  if (normilizedFromFormat.format === 'DMY') {
    [day, month, year] = date.split(normilizedFromFormat.delim);
  } else if (normilizedFromFormat.format === 'DYM') {
    [day, year, month] = date.split(normilizedFromFormat.delim);
  } else if (normilizedFromFormat.format === 'YDM') {
    [year, day, month] = date.split(normilizedFromFormat.delim);
  } else if (normilizedFromFormat.format === 'YMD') {
    [year, month, day] = date.split(normilizedFromFormat.delim);
  } else if (normilizedFromFormat.format === 'MDY') {
    [month, day, year] = date.split(normilizedFromFormat.delim);
  } else if (normilizedFromFormat.format === 'MYD') {
    [month, year, day] = date.split(normilizedFromFormat.delim);
  }

  if (normilizedToFormat.y === 4 && year.length === 2) {
    if (year < 30) {
      year = '20' + year;
    } else {
      year = '19' + year;
    }
  } else if (normilizedToFormat.y === 2 && year.length === 4) {
    year = year.slice(2);
  }

  let result;

  if (normilizedToFormat.format === 'DMY') {
    result =
      day + normilizedToFormat.delim + month + normilizedToFormat.delim + year;
  } else if (normilizedToFormat.format === 'DYM') {
    result =
      day + normilizedToFormat.delim + year + normilizedToFormat.delim + month;
  } else if (normilizedToFormat.format === 'YDM') {
    result =
      year + normilizedToFormat.delim + day + normilizedToFormat.delim + month;
  } else if (normilizedToFormat.format === 'YMD') {
    result =
      year + normilizedToFormat.delim + month + normilizedToFormat.delim + day;
  } else if (normilizedToFormat.format === 'MDY') {
    result =
      month + normilizedToFormat.delim + day + normilizedToFormat.delim + year;
  } else if (normilizedToFormat.format === 'MYD') {
    result =
      month + normilizedToFormat.delim + year + normilizedToFormat.delim + day;
  }

  return result;
}

function formatDestructing(format) {
  const result = {
    format: '',
  };

  for (let i = 0; i < 3; i++) {
    if (format[i][0] === 'D') {
      result.d = format[i].length;
      result.format += 'D';
    } else if (format[i][0] === 'M') {
      result.m = format[i].length;
      result.format += 'M';
    } else if (format[i][0] === 'Y') {
      result.y = format[i].length;
      result.format += 'Y';
    }
  }

  result.delim = format[3];

  return result;
}

module.exports = formatDate;
