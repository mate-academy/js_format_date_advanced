'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromTokens = fromFormat.slice(0, 3);
  const fromSep = fromFormat[3] ?? '';

  const toTokens = toFormat.slice(0, 3);
  const toSep = toFormat[3] ?? '';

  const rawParts = fromSep ? date.split(fromSep) : [date];

  const map = {};

  fromTokens.forEach((t, i) => {
    map[t] = rawParts[i] ?? '';
  });

  if (map['YY'] && !map['YYYY']) {
    const yyNum = parseInt(map['YY'], 10) || 0;
    const yy2 = String(yyNum).padStart(2, '0');

    map['YYYY'] = yyNum < 30 ? `20${yy2}` : `19${yy2}`;
  }

  if (map['YYYY'] && !map['YY']) {
    map['YY'] = String(map['YYYY']).slice(-2);
  }

  const z2 = (v) => String(v ?? '').padStart(2, '0');

  const outParts = toTokens.map((t) => {
    if (t === 'YYYY') {
      return String(map['YYYY'] ?? '');
    }

    if (t === 'YY') {
      return String(map['YY'] ?? '');
    }

    if (t === 'MM') {
      return z2(map['MM']);
    }

    if (t === 'DD') {
      return z2(map['DD']);
    }

    return '';
  });

  return outParts.join(toSep);
}

module.exports = formatDate;
