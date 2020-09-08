import { MemeGeneratorService } from './meme-generator.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-meme-generator',
  templateUrl: './meme-generator.component.html',
  styleUrls: ['./meme-generator.component.scss']
})
export class MemeGeneratorComponent implements OnInit {
  @Output() OnLoad = new EventEmitter();
  title: any;
  subReddit: any;
  imgUrl: any;
  author: any;

  constructor(
    private memeGeneratorService: MemeGeneratorService
  ) { }

  ngOnInit(): void {
    this.loadMeme();
  }

  loadMeme(): void {
    let postHint = true;
    this.memeGeneratorService.getRandomMeme().subscribe(data => {
      data = data[0].data.children[0].data;
      if (data.post_hint && data.post_hint === 'image') {
        this.title = data.title;
        this.subReddit = data.subreddit_name_prefixed;
        this.imgUrl = data.url;
        this.author = data.author;
        postHint = false;
      } else {
        this.loadMeme();
      }
    });
    this.OnLoad.emit();
  }

}
