'use strict';

function formatDate(date, fromFormat, toFormat) {
  const result = [];
  const splittedDate = date.split(fromFormat[3]);

  for (let i = 0; i < splittedDate.length; i++) {
    if (toFormat.indexOf('DD') === i) {
      result.push(splittedDate[fromFormat.indexOf('DD')]);
    }

    if (toFormat.indexOf('MM') === i) {
      result.push(splittedDate[fromFormat.indexOf('MM')]);
    }

    if (toFormat.indexOf('YY') === i) {
      if (fromFormat.includes('YY')) {
        result.push(splittedDate[fromFormat.indexOf('YY')]);
      } else if (fromFormat.includes('YYYY')) {
        result.push(splittedDate[fromFormat.indexOf('YYYY')].slice(-2));
      }
    }

    if (toFormat.indexOf('YYYY') === i) {
      if (fromFormat.includes('YYYY')) {
        result.push(splittedDate[fromFormat.indexOf('YYYY')]);
      } else if (fromFormat.includes('YY')) {
        const year = splittedDate[fromFormat.indexOf('YY')];

        if (year > 29) {
          result.push(`19${year}`);
        } else {
          result.push(`20${year}`);
        }
      }
    }
  }

  return result.join(toFormat[3]);
}

module.exports = formatDate;
