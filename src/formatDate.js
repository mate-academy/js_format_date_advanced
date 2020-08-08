'use strict';

function formatDate(date, fromFormat, toFormat) {
  const values = date.split(fromFormat[3]);
  const result = new Array(3);

  for (const [index, value] of toFormat.entries()) {
    switch (value) {
      case 'DD':
        result[index] = values[fromFormat.indexOf(value)];
        break;
      case 'MM':
        result[index] = values[fromFormat.indexOf(value)];
        break;
      case 'YYYY':
        if (fromFormat.includes(value)) {
          result[index] = values[fromFormat.indexOf(value)];
        } else if (fromFormat.includes('YY')) {
          if (values[fromFormat.indexOf('YY')] > 20) {
            result[index] = 19 + values[fromFormat.indexOf('YY')];
          } else {
            result[index] = 20 + values[fromFormat.indexOf('YY')];
          }
        }
        break;
      case 'YY':
        if (fromFormat.includes(value)) {
          result[index] = values[fromFormat.indexOf(value)];
        } else if (fromFormat.includes('YYYY')) {
          result[index] = values[fromFormat.indexOf('YYYY')].substring(2);
        }
        break;
      default:
        break;
    }
  }

  return result.join(toFormat[3]);
}

module.exports = formatDate;
