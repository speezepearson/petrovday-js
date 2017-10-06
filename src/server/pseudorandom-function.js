import PRNG from 'random-seed';

class PseudorandomFunction {
  constructor(seed) {
    this.seed = seed;
  }

  get(x) {
    return PRNG.create(this.seed + x).random()
  }
}

export default PseudorandomFunction;
