import {Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import interact from 'interactjs'

@Directive({
  selector: '[appDraggable]'
})
export class DraggableDirective implements OnInit {

  @Input()
  model: any;

  @Input()
  options: any;

  @Output()
  draggableClick = new EventEmitter();

  private currentlyDragged = false;

  constructor(private element: ElementRef) {}

  @HostListener('click', ['$event'])
  public onClick(event: any): void {
    if (!this.currentlyDragged) {
      this.draggableClick.emit();
    }
  }

  ngOnInit(): void {
    interact(this.element.nativeElement)
      .draggable(Object.assign({}, this.options || {}))
      .on('dragmove', (event: { target: any; dx: number; dy: number; }) => {
        const target = event.target;
        const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
        const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

        target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);

        target.classList.add('getting-dragged');
        this.currentlyDragged = true;
        (window as any).dragData = this.model;
      })
      .on('dragend', (event: { target: { style: { transform: string; }; removeAttribute: (arg0: string) => void; classList: { remove: (arg0: string) => void; }; }; }) => {
        event.target.style.transform = 'none';
        event.target.removeAttribute('data-x');
        event.target.removeAttribute('data-y');
        event.target.classList.remove('getting-dragged');
        setTimeout(() => {
          (window as any).dragData = null;
          this.currentlyDragged = false;
        });
      });
  }
}
