'use strict';

/*
 * @param {string} date
 * @param {string[]} fromFormat array
 * @param {string[]} toFormat array
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  // write code here
  /* um array para armazenar a nova data */
  const newDate = [];

  /* pegar o último elemento de fromFormate chamar de separador de
  ['YYYY', 'MM', 'DD', '-'] entrada = '-' */
  const sepIn = fromFormat[fromFormat.length - 1];

  /* pegar o último elemento de fromFormate chamar de separador
  ['DD', 'MM', 'YY', '.'] de saída = '.' */
  const sepOut = toFormat[toFormat.length - 1];

  /* pega a string date e transforma em um array,
  separando cada elemento onde tiver o separador '-' */
  const parts = date.split(sepIn);

  /* com o slice criamos uma copia do array fromFormat começando de zero
  e excluindo o último elemento que seria o separador */
  const tokensIn = fromFormat.slice(0, -1);

  /* com o slice criamos uma copia do array toFormat começando de zero
  e excluindo o último elemento que seria o separador */
  const tokensOut = toFormat.slice(0, -1);

  /* aqui dizemos que se o tamanho do array date for maior que o total de
  slots disponiveis para colocar a date, retornamos undefined */

  /* crio um objeto vazio */
  const map = {};
  /* ['YYYY', 'MM', 'DD',] */

  for (let i = 0; i < tokensIn.length; i++) {
    map[tokensIn[i]] = parts[i];
  }

  function convertYear(value, fromToken, toToken) {
    /* para converter de YYYY para YY deixando
    os 2 últimos dígitos ( 1997-> 97) */
    if (!value) {
      return undefined;
    }

    if (fromToken === toToken) {
      return value;
    }

    if (fromToken === 'YYYY' && toToken === 'YY') {
      return value.slice(-2);
    }

    /* para converter de YY para YYYY
    20YYif YY < 30e 19YY otherwise */
    if (fromToken === 'YY' && toToken === 'YYYY') {
      return Number(value) < 30 ? '20' + value : '19' + value;
    } else if (fromToken === 'YYYY' && toToken === 'YYYY') {
      return value;
    }
  }

  /* para cada elemento de tokensOut ['YYYY', 'MM', 'DD'] */

  for (const token of tokensOut) {
    if (token === 'DD' || token === 'MM') {
      newDate.push(map[token]);
      /* tive duvida nesse else if */
    } else if (token === 'YYYY' || token === 'YY') {
      const year = map['YYYY'] || map['YY'];
      const fromToken = map['YYYY'] ? 'YYYY' : 'YY';

      newDate.push(convertYear(year, fromToken, token));
    }
  }

  return newDate.join(sepOut);
}

module.exports = formatDate;
