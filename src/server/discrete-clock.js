class DiscreteClock {
  constructor(currentTime=0) {
    this.currentTime = currentTime;
    this.waiters = new Map();
  }

  defer(callback, wakeup) {
    if (wakeup <= this.currentTime) {
      callback();
    } else {
      if (!this.waiters.has(wakeup)) {
        this.waiters.set(wakeup, new Set());
      }
      this.waiters.get(wakeup).add(callback);
    }
  }

  tick() {
    this.currentTime += 1;
    if (this.waiters.has(this.currentTime)) {
      this.waiters.get(this.currentTime).forEach((callback) => callback());
      this.waiters.delete(this.currentTime);
    }
  }

  start() {
    setInterval(() => this.tick(), 1000)
  }
}

export default DiscreteClock;
