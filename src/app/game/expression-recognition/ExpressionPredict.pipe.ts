import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ExpressionPredict'
})
export class ExpressionPredictPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let result = '';
    const sorted = value.asSortedArray();
    const resultsToDisplay = sorted.filter(expr => expr.probability > 0.6);
    resultsToDisplay.forEach(expr => {
      result += `${expr.expression} (${this.round(expr.probability)}) \n`;
    });
    return result;
  }

  round(num: number, prec: number = 2): number {
    const f = Math.pow(10, prec);
    return Math.floor(num * f) / f;
  }

}
