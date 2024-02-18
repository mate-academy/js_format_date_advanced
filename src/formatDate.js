'use strict';

function formatDate(date, fromFormat, toFormat) {
  const separator = fromFormat[fromFormat.length - 1];
  const dateParts = date.split(separator);
  const changeDataParts = [];
  const dateYear = {};

  for (let i = 0; i < 3; i++) {
    dateYear[fromFormat[i]] = dateParts[i];
  }

  if (fromFormat.includes('YYYY')) {
    dateYear['YY'] = dateYear['YYYY'].slice(-2);
  }

  if (fromFormat.includes('YY')) {
    const dateYearShort = parseInt(dateYear['YY']);

    dateYear['YYYY'] = dateYearShort < 30
      ? `20${dateYear['YY']}`
      : `19${dateYear['YY']}`;
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    changeDataParts.push(dateYear[toFormat[i]]);
  }

  const formattedDate = changeDataParts.join(toFormat[toFormat.length - 1]);

  return formattedDate;
} //

module.exports = formatDate;
