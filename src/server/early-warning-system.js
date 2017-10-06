import PseudorandomFunction from './pseudorandom-function.js';

function getFractionalProgress(m, time) {
  return (time - m.departureTime) / (m.eta - m.departureTime)
}

var falseAlarmP = 0.1;

class EarlyWarningSystem {

  constructor(location, target, seed) {
    this.location = location;
    this.target = target;
    this.prf = new PseudorandomFunction(seed);
  }

  static fractionalIncreaseInPForMissile(fractionalProgress) {
    return falseAlarmP + (1-falseAlarmP)*fractionalProgress;
  }

  getReading(missiles, time) {
    var alarmP = falseAlarmP;
    for (var i=0; i<missiles.length; i++) {
      m = missiles[i];
      if (m.origin === this.target && m.destination === this.location) {
        alarmP += (1-alarmP)*this.fractionalIncreaseInPForMissile(getFractionalProgress(m, time));
        break;
      }
    }
    return (this.prf.get(time) < alarmP);
  }
}

export default EarlyWarningSystem;
