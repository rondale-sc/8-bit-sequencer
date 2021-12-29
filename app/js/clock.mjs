export const Clock =  class Clock {
  constructor({ onTick }) {
    this.worker = new Worker('./js/clock-worker.mjs');
    this.onTick = onTick
    this.isRunning = false;
  }

  start() {
    this.worker.postMessage({event: 'start'});
    this.isRunning = true;
    this.worker.onmessage = ({data: { event }}) => {
      if (event === 'tick') {
        this.onTick();
      }
    }
  }

  stop() {
    this.worker.postMessage({ event: 'stop' });
    this.isRunning = false;
  }

  setInterval(interval) {
    this.worker.postMessage({event: 'interval', interval});
  }
}
