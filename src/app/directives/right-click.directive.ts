import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';
import { filter, fromEvent } from 'rxjs';

// https://medium.com/@nimeresam95/angular-on-right-click-event-5d81e418f2d4

@Directive({
  selector: '[rtclick]',
  standalone: true,
})
export class RightClickDirective {

  @Output('rtclick') event = new EventEmitter<MouseEvent>();

  constructor(private element: ElementRef<HTMLElement>) {
    this.event = new EventEmitter();
    fromEvent<PointerEvent>(document.body, 'contextmenu').pipe(
      filter((ev: PointerEvent) =>
        ev.target === this.element.nativeElement && ev.button == 2))
      .subscribe((ev) => { ev.preventDefault(); });
  }

  @HostListener('mousedown')
  onClick() {
    const mouseEvent: MouseEvent = event as MouseEvent;
    console.log(mouseEvent.button)
    // if (mouseEvent.button !== 2) return;
    this.event.emit(mouseEvent);
  }
}
