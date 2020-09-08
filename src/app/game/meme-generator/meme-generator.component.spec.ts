/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MemeGeneratorComponent } from './meme-generator.component';

describe('MemeGeneratorComponent', () => {
  let component: MemeGeneratorComponent;
  let fixture: ComponentFixture<MemeGeneratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemeGeneratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemeGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
