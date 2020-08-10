'use strict';

function formatDate(date, fromFormat, toFormat) {
  const sep = fromFormat[3];
  const finalSep = toFormat[3];

  const dateObject = {};
  const finalDate = [];
  const initialDate = date.split(sep);

  for (let i = 0; i < 3; i++) {
    switch (fromFormat[i][0]) {
      case 'D':
        dateObject.D = initialDate[i];
        break;

      case 'M':
        dateObject.M = initialDate[i];
        break;

      case 'Y':
        dateObject.Y = initialDate[i];

        if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
          dateObject.Y = initialDate[i].slice(2, 4);
        }

        if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
          switch (true) {
            case (+initialDate[i] > 30):
              dateObject.Y = '19' + initialDate[i];
              break;
            default:
              dateObject.Y = '20' + initialDate[i];
          }
        }
    }
  }

  for (const key in dateObject) {
    for (let i = 0; i < 3; i++) {
      if (toFormat[i].includes(key)) {
        finalDate[i] = dateObject[key];
      }
    }
  }

  return finalDate.join(finalSep);
}

module.exports = formatDate;
