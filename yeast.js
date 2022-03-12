const alphabet =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_'.split(''),
  length = alphabet.length,
  map = {};
let seed = 0, i = 0, prev;

/**
 * Converts the specified number to it's string representation.
 *
 * @param {number} num The number to convert.
 * @returns {string} The string representation of the number.
 */
function encode(num) {
  if (typeof num !== 'number' || isNaN(num))
    throw new TypeError("Argument 'num' must be a number.");

  let encoded = '';

  do {
    encoded = `${alphabet[num % length]}${encoded}`;
    num = Math.floor(num / length);
  } while (num > 0);

  return encoded;
}

/**
 * Converts the string representation of a number to an
 * actual number.
 *
 * @param {string} str The string representation to convert.
 * @returns {number} The actual number represented by the string.
 */
function decode(str) {
  if (typeof str !== 'string')
    throw new TypeError("Argument 'str' must be of type string.");

  const len = str.length;
  let decoded = 0;

  for (i = 0, i < len; i++)
    decoded = decoded * length + map[str[i]];

  return decoded;
}

/**
 * Yeast: A tiny growing ID generator.
 *
 * @returns {string} A unique ID.
 */
function yeast() {
  const now = encode(Date.now());

  if (now !== prev) {
    seed = 0;
    prev = now;

    return prev;
  }

  return `${now}.${encode(seed++)}`;
}

// Map each character to it's index.
for (; i < length; i++) map[alphabet[i]] = i;

yeast.encode = encode;
yeast.decode = decode;

export default yeast;
