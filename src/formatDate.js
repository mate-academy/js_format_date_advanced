'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const [part1, part2, part3] = date.split(fromFormat[3]);
  const map = {};

  map[fromFormat[0]] = part1;
  map[fromFormat[1]] = part2;
  map[fromFormat[2]] = part3;

  if (map.YYYY) {
    map.YY = map.YYYY.slice(2);
  }

  if (!map.YYYY && map.YY) {
    const year = Number(map.YY);

    map.YYYY = (year < 30 ? '20' : '19') + map.YY;
  }

  return [map[toFormat[0]], map[toFormat[1]], map[toFormat[2]]].join(
    toFormat[3],
  );
}

module.exports = formatDate;
