'use strict';

function formatDate(date, fromFormat, toFormat) {
  const fromSeparator = fromFormat[fromFormat.length - 1];
  const toSeparator = toFormat[toFormat.length - 1];
  const arrDate = date.split(fromSeparator);
  const newDate = [];
  const dateInfo = {};

  for (let i = 0; i < fromFormat.length - 1; i++) {
    dateInfo[fromFormat[i]] = arrDate[i];
  }

  if (+dateInfo.YY >= 30) {
    dateInfo.YYYY = `19${dateInfo.YY}`;
  }

  if (+dateInfo.YY < 30) {
    dateInfo.YYYY = `20${dateInfo.YY}`;
  }

  if (+dateInfo.YYYY >= 30) {
    dateInfo.YY = dateInfo.YYYY.slice(2);
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    newDate.push(dateInfo[toFormat[i]]);
  }

  return newDate.join(toSeparator);
}

module.exports = formatDate;
