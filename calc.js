/** Calculates the value of Pi to a specified number of decimal places using
 * the Chudnovsky algorithm, which is a rapidly converging series.
 * @param {number} precision - The number of decimal places to calculate Pi.
 *                             A higher value will yield more accurate results.
 * @returns {string} - The calculated value of Pi as a string rounded to the specified precision.
 */
 const calculatePi = (precision) => {
    let C = 426880 * Math.sqrt(10005);
    let M = 1;
    let L = 13591409;
    let X = 1;
    let K = 6;
    let S = L;

    for (let i = 1; i < precision; i++) {
        M = (K * K * K) / (i + 1);
        L += 545140134;
        X *= -262537412640768000;
        S += (M * L) / X;
        K += 12;
    }

    return (C / S).toFixed(precision);
};

/** Identifies repeating patterns in a given string by checking all possible
 * substrings and their occurrences. It retains only the non-repeating digits.
 * @param {string} str - The input string in which to find repeating patterns.
 * @returns {Array} - An array of tuples where each tuple contains a repeating
 *                    pattern and its count.
 */
const findRepeatingPatterns = (str) => {
    const patterns = new Map();
    const length = str.length;

    for (let len = 1; len <= length / 2; len++) {
        for (let start = 0; start <= length - len; start++) {
            const substring = str.slice(start, start + len);
            if (patterns.has(substring)) {
                patterns.set(substring, patterns.get(substring) + 1);
            } else {
                patterns.set(substring, 1);
            }
        }
    }

    const repeatingPatterns = [...patterns.entries()]
        .filter(([_, count]) => count > 1)
        .sort((a, b) => b[0].length - a[0].length);

    return repeatingPatterns;
};

/** Calculates Pi to the specified precision, identifies repeating patterns
 * in its decimal expansion, and computes results based on the smallest
 * and largest unique patterns found, excluding repeating sequences.
 * @param {number} precision - The number of decimal places to calculate Pi.
 */
const calculatePiPatterns = (precision) => {
    const piValue = calculatePi(precision).toString().split('.')[1];
    console.log(`Calculated π to ${precision} decimal places: 3.${piValue}`);

    const repeatingPatterns = findRepeatingPatterns(piValue);
    console.log('Repeating patterns found:', repeatingPatterns);

    const uniquePatterns = [...new Set(repeatingPatterns.map(([pattern]) => pattern))];
    
    const smallestPattern = uniquePatterns[uniquePatterns.length - 1] || '';
    const largestPattern = uniquePatterns[0] || '';

    console.log(`Smallest repeating pattern: ${smallestPattern}`);
    console.log(`Largest repeating pattern: ${largestPattern}`);

    // Remove repeating patterns from the piValue to find non-repeating remainder
    let nonRepeatingRemainder = piValue;
    uniquePatterns.forEach(([pattern]) => {
        nonRepeatingRemainder = nonRepeatingRemainder.replace(new RegExp(pattern, 'g'), '');
    });

    // Filter out leading zeros from the non-repeating remainder
    nonRepeatingRemainder = nonRepeatingRemainder.replace(/^0+/, '');

    // Ignore zeros before 1 when calculating smallest and largest patterns
    const validPatterns = uniquePatterns.filter(pattern => parseFloat(pattern) > 0);
    
    const smallest = validPatterns.length ? parseFloat(validPatterns[validPatterns.length - 1]) : 0;
    const largest = validPatterns.length ? parseFloat(validPatterns[0]) : 0;
    const result = smallest * largest;

    console.log(`Result of smallest (${smallest}) * largest (${largest}): ${result}`);
    console.log(`Non-repeating remainder of π: ${nonRepeatingRemainder}`);
};

// Run the calculation for π with 100 decimal places
calculatePiPatterns(100);
