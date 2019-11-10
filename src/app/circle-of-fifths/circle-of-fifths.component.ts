import { Component, HostBinding, HostListener, AfterViewInit } from '@angular/core';
import { cos, sin } from '../math';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Component({
  selector: 'app-circle-of-fifths',
  templateUrl: './circle-of-fifths.component.html',
  styleUrls: ['./circle-of-fifths.component.scss']
})
export class CircleOfFifthsComponent implements AfterViewInit {
  readonly majorFifths = ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#', 'Ab', 'Eb', 'Bb', 'F'];
  readonly minorFifths = ['a', 'e', 'b', 'f#', 'c#', 'g#', 'd#', 'a#', 'f', 'c', 'g', 'd'];
  size: number;
  currentIndex = 0;
  @HostBinding('attr.style')
  get style(): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(`
      --size: ${this.size}px;
    `);
  }
  @HostListener('window:resize', ['$event'])
  onWindowResize = event => this.setSize()

  constructor(
    private sanitizer: DomSanitizer,
  ) {
    this.setSize();
  }

  private setSize() {
    this.size = window.innerWidth <= window.innerHeight ?  window.innerWidth : window.innerHeight;
  }

  private toRadians(degrees: number): number {
    return degrees * Math.PI / 180 - Math.PI / 2;
  }

  ngAfterViewInit() {
    this.draw(0);
  }

  y(degrees: number, distance: number = 1): string {
    return -Math.ceil(cos(degrees) * this.size / 2 * 0.85 * distance) + 'px';
  }

  x(degrees: number, distance: number = 1): string {
    return Math.ceil(sin(degrees) * this.size  / 2 * 0.85 * distance) + 'px';
  }

  draw(i = 0) {
    this.currentIndex = i;

    const c = document.getElementById('chords') as HTMLCanvasElement;
    const ctx = c.getContext('2d');
    c.width = this.size;
    c.height = this.size;
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.lineWidth = this.size * 0.075;

    ctx.beginPath();
    ctx.strokeStyle = 'rgba(255, 0, 0, 0.5)';
    ctx.arc(this.size / 2, this.size / 2, this.size * 0.45, this.toRadians(i * 30 - 45), this.toRadians((i + 3) * 30 - 45));
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = 'rgba(255, 255, 0, 0.5)';
    ctx.arc(this.size / 2, this.size / 2, this.size * 0.45, this.toRadians((i + 3) * 30 - 45), this.toRadians((i + 6) * 30 - 45));
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = 'rgba(0, 255, 0, 0.5)';
    ctx.arc(this.size / 2, this.size / 2, this.size * 0.45, this.toRadians((i + 6) * 30 - 45), this.toRadians((i + 7) * 30 - 45));
    ctx.stroke();
  }
}
