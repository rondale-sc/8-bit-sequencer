export const Clock =  class Clock {
  constructor({ onTick }) {
    this.worker = new Worker('./js/clock-worker.js');
    this.onTick = onTick
  }

  start() {
    this.worker.postMessage({event: 'start'});
    this.worker.onmessage = ({data: {event}}) => {
      if (event === 'tick') {
        this.onTick();
      }
    }
  }

  stop() {
    this.worker.postMessage({event: 'stop'});
  }

  setInterval(interval) {
    this.worker.postMessage({event: 'interval', interval});
  }
}
