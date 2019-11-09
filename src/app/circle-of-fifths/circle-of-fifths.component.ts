import { Component, Input, HostBinding, HostListener } from '@angular/core';
import { cos, sin } from '../math';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Component({
  selector: 'app-circle-of-fifths',
  templateUrl: './circle-of-fifths.component.html',
  styleUrls: ['./circle-of-fifths.component.scss']
})
export class CircleOfFifthsComponent {
  readonly majorFifths = ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#', 'Ab', 'Eb', 'Bb', 'F'];
  readonly minorFifths = ['a', 'e', 'b', 'f#', 'c#', 'g#', 'd#', 'a#', 'f', 'c', 'g', 'd'];
  private size: number;
  @Input() offset = 0;
  @HostBinding('attr.style')
  private get style(): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(`
      --size: ${this.size}px;
    `);
  }
  @HostListener('window:resize', ['$event'])
  onWindowResize = () => this.setSize()

  constructor(
    private sanitizer: DomSanitizer,
  ) {
    this.setSize();
  }

  y(degrees: number, distance: number = 1): string {
    return -Math.ceil(cos(degrees) * this.size / 2 * 0.85 * distance) + 'px';
  }

  x(degrees: number, distance: number = 1): string {
    return Math.ceil(sin(degrees) * this.size  / 2 * 0.85 * distance) + 'px';
  }

  private setSize() {
    this.size = window.innerWidth <= window.innerHeight ?  window.innerWidth : window.innerHeight;
  }
}
