'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const normalizedFromFormat = formatNormalizing(fromFormat);
  const normalizedToFormat = formatNormalizing(toFormat);

  let day;
  let month;
  let year;

  if (normalizedFromFormat.format === 'DMY') {
    [day, month, year] = date.split(normalizedFromFormat.delim);
  } else if (normalizedFromFormat.format === 'DYM') {
    [day, year, month] = date.split(normalizedFromFormat.delim);
  } else if (normalizedFromFormat.format === 'YDM') {
    [year, day, month] = date.split(normalizedFromFormat.delim);
  } else if (normalizedFromFormat.format === 'YMD') {
    [year, month, day] = date.split(normalizedFromFormat.delim);
  } else if (normalizedFromFormat.format === 'MDY') {
    [month, day, year] = date.split(normalizedFromFormat.delim);
  } else if (normalizedFromFormat.format === 'MYD') {
    [month, year, day] = date.split(normalizedFromFormat.delim);
  }

  if (normalizedToFormat.y === 4 && year.length === 2) {
    if (+year < 30) {
      year = '20' + year;
    } else {
      year = '19' + year;
    }
  } else if (normalizedToFormat.y === 2 && year.length === 4) {
    year = year.slice(2);
  }

  let result;

  if (normalizedToFormat.format === 'DMY') {
    result =
      day + normalizedToFormat.delim + month + normalizedToFormat.delim + year;
  } else if (normalizedToFormat.format === 'DYM') {
    result =
      day + normalizedToFormat.delim + year + normalizedToFormat.delim + month;
  } else if (normalizedToFormat.format === 'YDM') {
    result =
      year + normalizedToFormat.delim + day + normalizedToFormat.delim + month;
  } else if (normalizedToFormat.format === 'YMD') {
    result =
      year + normalizedToFormat.delim + month + normalizedToFormat.delim + day;
  } else if (normalizedToFormat.format === 'MDY') {
    result =
      month + normalizedToFormat.delim + day + normalizedToFormat.delim + year;
  } else if (normalizedToFormat.format === 'MYD') {
    result =
      month + normalizedToFormat.delim + year + normalizedToFormat.delim + day;
  }

  return result;
}

function formatNormalizing(format) {
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
