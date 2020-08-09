'use strict';

function formatDate(date, fromFormat, toFormat) {
  const [, , , sep] = fromFormat;
  const [, , , finalSep] = toFormat;

  const finalFormat = toFormat.slice(0, 3);
  const initialFormat = fromFormat.slice(0, 3);

  const fromPattern = {};
  const toPattern = {};
  const initialDate = date.split(sep);

  fromPattern.MM = initialDate[initialFormat.indexOf('MM')];
  fromPattern.DD = initialDate[initialFormat.indexOf('DD')];

  if (initialFormat.includes('YYYY')) {
    if (finalFormat.includes('YY')) {
      fromPattern.YY = initialDate[initialFormat.indexOf('YYYY')].slice(2, 4);
    } else {
      fromPattern.YY = initialDate[initialFormat.indexOf('YYYY')];
    }
  }

  if (initialFormat.includes('YY')) {
    if (finalFormat.includes('YYYY')) {
      if (+initialDate[initialFormat.indexOf('YY')] > 22) {
        fromPattern.YY = '19' + initialDate[initialFormat.indexOf('YY')];
      } else {
        fromPattern.YY = '20' + initialDate[initialFormat.indexOf('YY')];
      }
    } else {
      fromPattern.YY = initialDate[initialFormat.indexOf('YY')];
    }
  }

  for (let pattern of finalFormat) {
    if (pattern === 'YYYY') {
      pattern = 'YY';
    }
    toPattern[pattern] = null;
  }

  for (const dateFrom in fromPattern) {
    for (const dateTo in toPattern) {
      if (dateFrom === dateTo) {
        toPattern[dateTo] = fromPattern[dateFrom];
      }
    }
  }

  const finalDate = Object.values(toPattern).join(finalSep);

  return finalDate;
}

module.exports = formatDate;
