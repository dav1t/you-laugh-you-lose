import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MemeGeneratorService } from './game/meme-generator/meme-generator.service';
import { ExpressionRecognitionComponent } from './game/expression-recognition/expression-recognition.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { GameComponent } from './game/game.component';
import { MemeGeneratorComponent } from './game/meme-generator/meme-generator.component';
import {ExpressionPredictPipe } from './game/expression-recognition/ExpressionPredict.pipe';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
      GameComponent,
      MemeGeneratorComponent,
      ExpressionRecognitionComponent,
      ExpressionPredictPipe
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatSnackBarModule
  ],
  providers: [
    MemeGeneratorService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
