import { Clock } from './clock.mjs';

export default class ShiftRegister {
  looping = false;

  constructor(numberOfNodes=8) {
    this.numberOfNodes = numberOfNodes
    this.bitArray = new Uint8Array(this.numberOfNodes);
  }

  writeBit() {
    this.bitArray[0] = 1;
  }

  onTick() {
    this.bitArray = new Uint8Array(this.bitArray.map((bit, i) => {
      let index = i;

      if (this.looping) {
        index = i === 0 ? this.bitArray.length : i;
      }

      let previousBit = this.bitArray[index-1];

      return previousBit === 1 ? 1 : 0;
    }));
  }
}
