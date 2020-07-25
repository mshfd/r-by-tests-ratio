class TimeSeriesSmoothing {
  constructor(alpha) {
    this._alpha = alpha;

    this.smoothSeries = function (data) {

      let smoothedData = [];
      smoothedData.length = data.length;
      for (let n = 0; n < data.length; n++) {
        smoothedData[n] = data[n];
      }

      const threshold = this._alpha;
      const invThreshold = 1.0 / this._alpha;

      let iterationIndex = 0;
      let error = 1;
      while(error > 0 && iterationIndex < 100000) {
        iterationIndex++;
        error = 0;
        for (let n = 1; n < smoothedData.length - 1; n++) {
          const l = smoothedData[n - 1];
          const c = smoothedData[n];
          const r = smoothedData[n + 1];
          
          const cl = c - l;
          const rc = r - c;
          const part = Math.max(2, c * 0.01);

          if(cl < 0 && rc > 0) {
            error++;
            smoothedData[n - 1]--;
            smoothedData[n] += 2;
            smoothedData[n + 1]--;   
          } else if(cl >= 0 && rc > part) {

            const dx = cl / rc;
            if(dx < threshold) {
              error++;
              smoothedData[n]++;
              smoothedData[n + 1]--;
            } else if(dx > invThreshold) {
              error++;
              smoothedData[n]--;
              smoothedData[n + 1]++;
            } 
          } else if(cl <= 0 && rc < -part) {

            const dx = cl / rc;
            if(dx > invThreshold) {
              error++;
              smoothedData[n - 1]--;
              smoothedData[n]++;
            } else if(dx < threshold) {
              error++;
              smoothedData[n]--;
              smoothedData[n + 1]++;
            }
          }
        }
      }

      return smoothedData;
    };
  }
}