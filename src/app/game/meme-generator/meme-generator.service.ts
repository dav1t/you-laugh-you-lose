import { Injectable } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MemeGeneratorService {
  private subReddits = ['memebot9000', 'dankmemes', 'memes', 'hmm'];

  constructor(
    private http: HttpClient
  ) { }

  getRandomMeme(): Observable<any> {
    // get random index from subbreddits array
    const randomIndex = this.getRandomInt(this.subReddits.length);
    return this.http.get(`https://www.reddit.com/r/${this.subReddits[randomIndex]}/random.json`);
  }

  private getRandomInt(max): number {
    return Math.floor(Math.random() * Math.floor(max));
  }

}
