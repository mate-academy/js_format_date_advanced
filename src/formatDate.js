'use strict';

function formatDate(date, fromFormat, toFormat) {
  const [, , , sep] = fromFormat;
  const [, , , finalSep] = toFormat;

  const fromPattern = {};
  const finalDate = [];
  const initialDate = date.split(sep);

  for (let i = 0; i < 3; i++) {
    switch (fromFormat[i][0]) {
      case 'D':
        fromPattern.D = initialDate[i];
        break;

      case 'M':
        fromPattern.M = initialDate[i];
        break;

      case 'Y':
        fromPattern.Y = initialDate[i];

        if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
          fromPattern.Y = initialDate[i].slice(2, 4);
        }

        if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
          if (+initialDate[i] > 22) {
            fromPattern.Y = '19' + initialDate[i];
          } else {
            fromPattern.Y = '20' + initialDate[i];
          }
        }
    }
  }

  for (const key in fromPattern) {
    for (let i = 0; i < 3; i++) {
      if (toFormat[i].includes(key)) {
        finalDate[i] = fromPattern[key];
      }
    }
  }

  return finalDate.join(finalSep);
}

module.exports = formatDate;
