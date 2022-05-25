'use strict';

function formatDate(date, fromFormat, toFormat) {
  const toSeparator = toFormat.pop();
  const fromDate = date.split(fromFormat.pop());
  const dateCollection = {};
  const toDate = [];

  for (let i = 0; i < 3; i++) {
    dateCollection[fromFormat[i]] = fromDate[i];

    for (const key in dateCollection) {
      if (key) {
        toDate[toFormat.indexOf(fromFormat[i])] = fromDate[i];
      }

      if (key.includes('YY') && dateCollection[key].length > 2) {
        toDate[toFormat.indexOf('YY')] = dateCollection[key].slice(2);
      } else if (key.includes('YY') && dateCollection[key] >= 30) {
        toDate[toFormat.indexOf('YYYY')] = `19${dateCollection[key]}`;
      } else if (key.includes('YY') && dateCollection[key] < 30) {
        toDate[toFormat.indexOf('YYYY')] = `20${dateCollection[key]}`;
      }
    }
  }

  return toDate.join(toSeparator);
}

module.exports = formatDate;
