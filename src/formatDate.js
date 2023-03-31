'use strict';

function formatDate(date, fromFormat, toFormat) {
  let separator = fromFormat[3];
  const originalDate = date.split(separator);
  const mapObj = {};

  for (let i = 0; i < originalDate.length; i++) {
    mapObj[fromFormat[i]] = originalDate[i];
  }

  if (!mapObj.hasOwnProperty('YY') && toFormat.includes('YY')) {
    mapObj['YY'] = mapObj['YYYY'].slice(2);
  }

  if (!mapObj.hasOwnProperty('YYYY') && toFormat.includes('YYYY')) {
      mapObj['YYYY'] = mapObj['YY'] < 30 ? '20' + mapObj['YY'] : '19' + mapObj['YY'];
  }

  const newDate = [];

  separator = toFormat[3];

  for (let i = 0; i < toFormat.length - 1; i++) {
    newDate.push(mapObj[toFormat[i]]);
  }

  return newDate.join(separator);
}

module.exports = formatDate;
