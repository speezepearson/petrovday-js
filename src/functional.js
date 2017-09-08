var map = (f) => (xs) => xs.map(f);
var filter = (p) => (xs) => xs.filter(p);
var foldl = (f) => (acc) => (xs) => xs.reduce(f, acc);

export { map, filter, foldl };
