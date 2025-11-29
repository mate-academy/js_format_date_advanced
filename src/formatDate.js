'use strict';

// /**
//  * @param {string} date
//  * @param {string[]} fromFormat
//  * @param {string[]} toFormat
//  *
//  * @returns {string}
//  */
function formatDate(date, fromFormat, toFormat) {
  const fromSep = fromFormat[fromFormat.length - 1];
  const toSep = toFormat[toFormat.length - 1];

  const fromParts = fromFormat.slice(0, -1);
  const toParts = toFormat.slice(0, -1);

  const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const rawParts = date.split(new RegExp(esc(fromSep), 'g'));

  const values = {};

  for (let i = 0; i < fromParts.length; i++) {
    values[fromParts[i]] = rawParts[i];
  }

  function convert(partName, val) {
    if (partName === 'YYYY') {
      if (/^\d{4}$/.test(val)) {
        return val;
      }

      if (/^\d{2}$/.test(val)) {
        const num = Number(val);

        return (num < 30 ? '20' : '19') + val.padStart(2, '0');
      }
    } else if (partName === 'YY') {
      if (/^\d{4}$/.test(val)) {
        return val.slice(2);
      }

      if (/^\d{2}$/.test(val)) {
        return val;
      }
    }

    if (partName === 'MM' || partName === 'DD') {
      return val.padStart(2, '0');
    }

    return val;
  }

  const src = {};

  if (values['YYYY']) {
    src['YYYY'] = values['YYYY'];
    src['YY'] = convert('YY', values['YYYY']);
  } else if (values['YY']) {
    src['YY'] = values['YY'];
    src['YYYY'] = convert('YYYY', values['YY']);
  }

  if (values['MM']) {
    src['MM'] = values['MM'].padStart(2, '0');
  }

  if (values['DD']) {
    src['DD'] = values['DD'].padStart(2, '0');
  }

  const outParts = toParts.map((part) => {
    if (part === 'YYYY' || part === 'YY' || part === 'MM' || part === 'DD') {
      if (!(part in src)) {
        if (values[part]) {
          return convert(part, values[part]);
        }

        return '';
      }

      return convert(part, src[part]);
    }

    return '';
  });

  return outParts.join(toSep);
}

module.exports = formatDate;
