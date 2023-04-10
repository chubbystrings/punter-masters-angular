import { Directive } from '@angular/core';
import {ElementRef, EventEmitter, Input, Output} from '@angular/core';
import { gsap } from 'gsap';

@Directive({
  selector: '[appCoreAnimationDirective]'
})
export class CoreAnimationDirectiveDirective {

  @Input() duration = 1;
  @Input() delay = 0;

  @Output() complete: EventEmitter<null> = new EventEmitter();
  @Output() reverseComplete: EventEmitter<null> = new EventEmitter();
  protected timeline!: TimelineMax ;

  constructor(protected element: ElementRef) {}



}
