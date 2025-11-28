'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separador = ['.', ',', '/', '-', ' '];
  let dataPartes = [];

  for (const sep of separador) {
    if (date.includes(sep)) {
      dataPartes = date.split(sep);
    }
  }

  let dia = '';
  let mes = '';
  let ano = '';

  for (let i = 0; i < fromFormat.length; i++) {
    if (fromFormat[i] === 'DD') {
      dia = dataPartes[i];
    } else if (fromFormat[i] === 'MM') {
      mes = dataPartes[i];
    } else if (fromFormat[i] === 'YYYY' || fromFormat[i] === 'YY') {
      ano = dataPartes[i];
    }
  }

  const newDate = [];

  for (let i = 0; i < toFormat.length; i++) {
    if (toFormat[i] === 'DD') {
      newDate.push(dia);
    } else if (toFormat[i] === 'MM') {
      newDate.push(mes);
    } else if (toFormat[i] === 'YY') {
      if (ano.length === 4) {
        newDate.push(ano.slice(2));
      } else if (ano.length === 2) {
        newDate.push(ano);
      }
    } else if (toFormat[i] === 'YYYY') {
      if (ano.length === 2) {
        if (Number(ano) < 30) {
          newDate.push(`20${ano}`);
        } else {
          newDate.push(`19${ano}`);
        }
      } else {
        newDate.push(ano);
      }
    }
  }

  for (const sep of separador) {
    if (toFormat.includes(sep)) {
      return newDate.join(sep);
    }
  }
}

module.exports = formatDate;
