'use strict';

function formatDate(date, fromFormat, toFormat) {
  const toSeparator = toFormat.pop();
  const fromDate = date.split(fromFormat.pop());
  const dateCollection = {};
  const toDate = [];

  for (let i = 0; i < 3; i++) {
    dateCollection[fromFormat[i]] = fromDate[i];
    toDate[toFormat.indexOf(fromFormat[i])] = fromDate[i];
  }

  for (const key in dateCollection) {
    if (key.includes('YY')) {
      if (dateCollection[key].length > 2) {
        toDate[toFormat.indexOf('YY')] = dateCollection[key].slice(2);
      } else if (dateCollection[key] >= 30) {
        toDate[toFormat.indexOf('YYYY')] = `19${dateCollection[key]}`;
      } else {
        toDate[toFormat.indexOf('YYYY')] = `20${dateCollection[key]}`;
      }
    }
  }

  return toDate.join(toSeparator);
}

module.exports = formatDate;
