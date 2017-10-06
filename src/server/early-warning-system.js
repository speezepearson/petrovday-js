import PseudorandomFunction from './pseudorandom-function.js';

function getFractionalProgress(m, time) {
  return (time - m.departureTime) / (m.eta - m.departureTime)
}
function fractionalIncreaseInPForMissile(fractionalProgress) {
  return falseAlarmP + (1-falseAlarmP)*fractionalProgress;
}

var falseAlarmP = 0.1;

class EarlyWarningSystem {

  constructor(location, target, seed) {
    this.location = location;
    this.target = target;
    this.prf = new PseudorandomFunction(seed);
  }

  getReading(missiles, time) {
    var alarmP = falseAlarmP;
    for (var i=0; i<missiles.length; i++) {
      var m = missiles[i];
      if (m.origin === this.target && m.destination === this.location) {
        alarmP += (1-alarmP)*fractionalIncreaseInPForMissile(getFractionalProgress(m, time));
        break;
      }
    }
    return (this.prf.get(time) < alarmP);
  }
}

export default EarlyWarningSystem;
