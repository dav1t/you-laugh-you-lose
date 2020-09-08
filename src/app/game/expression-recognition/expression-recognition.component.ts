import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import * as faceapi from 'face-api.js';
import { interval, fromEvent } from 'rxjs';

@Component({
  selector: 'app-expression-recognition',
  templateUrl: './expression-recognition.component.html',
  styleUrls: ['./expression-recognition.component.scss']
})
export class ExpressionRecognitionComponent implements OnInit, AfterViewInit, OnDestroy {
  @Output() newExpressionEvent = new EventEmitter<string>();
  @ViewChild('videoElement') videoElement: ElementRef;
  video: any;
  mediaStream: any;
  expressions: any;
  minConfidence = 0.5;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.video = this.videoElement.nativeElement;

    // Initilize neural networks and after that turn on camera
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri('../assets/models'),
      faceapi.nets.faceLandmark68Net.loadFromUri('../assets/models'),
      faceapi.nets.faceExpressionNet.loadFromUri('../assets/models')
    ]).then(() => this.startVideo());

    this.recognizeExpressions();
  }

  startVideo(): void {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {

      navigator.mediaDevices.getUserMedia({ video: true }).
        then(mediaStream => {
          this.mediaStream = mediaStream;

          if ('srcObject' in this.video) {
            this.video.srcObject = mediaStream;
          } else {
            this.video.src = URL.createObjectURL(mediaStream);
          }

        });
    }
  }

  recognizeExpressions(): void {
    const subscribe = fromEvent(this.video, 'play').subscribe(event => {
      interval(100).subscribe(async () => {
        const detections = await faceapi.detectAllFaces(this.video, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceExpressions();
        if (detections.length) {
          this.expressions = detections[0].expressions;
          this.newExpressionEvent.emit(this.expressions);
        }
        if (this.video.srcObject) { subscribe.unsubscribe(); }
      });
    });
  }

  ngOnDestroy(): void {
    const tracks = this.mediaStream.getTracks();
    tracks.forEach(track => {
      track.stop();
    });
  }

}
