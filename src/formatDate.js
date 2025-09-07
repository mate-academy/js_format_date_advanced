'use strict';

function formatDate(date, fromFormat, toFormat) {
  const separatorFrom = fromFormat[3];
  const separatorTo = toFormat[3];

  const dateParts = date.split(separatorFrom);
  const map = {};

  fromFormat.slice(0, 3).forEach((part, index) => {
    map[part] = dateParts[index];
  });

  if (map.YY && !map.YYYY) {
    const yy = parseInt(map.YY, 10);

    map.YYYY =
      yy < 30 ? '20' + map.YY.padStart(2, '0') : '19' + map.YY.padStart(2, '0');
  }

  if (map.YYYY && !map.YY) {
    map.YY = map.YYYY.slice(-2);
  }

  const resultParts = toFormat.slice(0, 3).map((part) => map[part]);

  return resultParts.join(separatorTo);
}

module.exports = formatDate;
