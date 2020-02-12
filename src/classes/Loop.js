class Loop {
  constructor(startTime) {
    this.startTime = startTime;
    this.endTime = null;
  }

  addEndTime(endTime) {
    this.endTime = endTime;
  }
}

export default Loop;
