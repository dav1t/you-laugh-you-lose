import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  @ViewChild('memeGenerator') memeGenerator;
  expressions: any;
  expressionRecognitionLoaded = false;
  memeGeneratorLoaded = false;
  laughCounter = 0;
  get readyToPlay(): boolean {
    return this.expressionRecognitionLoaded && this.memeGeneratorLoaded;
  }
  alreadyLaughed = false;

  constructor(
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  onExpressionChange(value: any): void {
    this.expressions = value;
    const [expression, confidence] = this.predict(this.expressions).split(' ');
    if (expression === 'happy' && !this.alreadyLaughed ) {
      this.alreadyLaughed = true;
      this.laughCounter += 1;
      const message = `You smiled/laughed ${this.laughCounter} times, you were ${confidence} happy`;
      this._snackBar.open(message, 'close', {
        duration: 4000,
      });
    }
    this.expressionRecognitionLoaded = true;
  }

  onMemeGeneratorLoad(): void {
    this.memeGeneratorLoaded = true;
  }

  predict(value: any, args?: any): any {
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

  nextMeme(): void{
    this.memeGenerator.loadMeme();
    this.alreadyLaughed = false;
  }

}
