
export function map(
  inputValue:number,
  inputMin:number,
  inputMax:number,
  outputMin:number,
  outputMax:number,
  doClamp:boolean = false
):number {
  let outputValue =
    ((inputValue - inputMin) / (inputMax - inputMin)) *
      (outputMax - outputMin) +
    outputMin;
  if (doClamp) {
    if (outputMin < outputMax) {
      outputValue = Math.min(outputValue, outputMax);
      outputValue = Math.max(outputValue, outputMin);
    } else {
      outputValue = Math.max(outputValue, outputMax);
      outputValue = Math.min(outputValue, outputMin);
    }
  }
  return outputValue;
}