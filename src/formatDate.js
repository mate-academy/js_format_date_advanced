'use strict';

function formatDate(date, fromFormat, toFormat) {
  const arr = date.split(fromFormat[3]);
  const year = arr[fromFormat.indexOf('YYYY')]
    || (parseInt(arr[fromFormat.indexOf('YY')]) <= 19
      ? '20' : '19')
    + arr[fromFormat.indexOf('YY')];

  const parsedDate = {
    'DD': arr[fromFormat.indexOf('DD')],
    'MM': arr[fromFormat.indexOf('MM')],
    'YYYY': year,
    'YY': year.slice(2),
  };

  return [
    parsedDate[toFormat[0]],
    parsedDate[toFormat[1]],
    parsedDate[toFormat[2]],
  ].join(toFormat[3]);
}

module.exports = formatDate;
