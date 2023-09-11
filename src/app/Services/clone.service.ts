import { Injectable } from '@angular/core';
import interact from 'interactjs';
import $ from 'jquery';
@Injectable({
  providedIn: 'root',
})
export class InteractionService {
  holdBeforeDrag: number = 0;
  inertia: boolean = false; //  allows drag and resize actions to continue after the user releases the pointer at a fast enough speed
  dropzoneClassName: string = 'dropzone';
  autoScroll : boolean = true ; // scroll when reaching the edge of the screen while dragging

  public coordinates = {
    x: null,
    y: null,
  };   min


  validTargets = [];
  public drag_pos = { x: 0, y: 0 };
  constructor() {}

  public init() {
    console.log('Interaction service has been initialized')
    interact('.' + this.dropzoneClassName).dropzone({
      // only accept elements matching this CSS selector
      accept: '.drag-drop',
      // Require a 90% element overlap for a drop to be possible
      overlap: 'center',
      // listen for drop related events:
      ondropactivate: function (event) {
        // add active dropzone feedback
        event.target.classList.add('drop-active');
        event.relatedTarget.classList.add('drop-target');
      },

      ondragenter: function (event) {
        var draggableElement = event.relatedTarget;
        var dropzoneElement = event.target;
        // feedback the possibility of a drop
        dropzoneElement.classList.add('drop-target');
        draggableElement.classList.add('can-drop');
        if (event.currentTarget.getAttribute('pagenumber') != null) {
          event.relatedTarget.setAttribute(
            'pagenumber',
            event.currentTarget.getAttribute('pagenumber')
          );
        }
      },
      ondragleave: function (event) {
        // remove the drop feedback style
        event.target.classList.remove('drop-target');
        event.relatedTarget.classList.remove('can-drop');

        //event.relatedTarget.textContent = 'Dragged out';
      },
      ondropdeactivate: function (event) {
        // remove active dropzone feedback
        event.target.classList.remove('drop-active');
        event.target.classList.remove('drop-target');
      },
    });

    interact('.drag-drop')
      .allowFrom('.handle')
      .draggable({
        hold: this.holdBeforeDrag,
        inertia: this.inertia,

        modifiers: [
          interact.modifiers.snap({
            targets: [
              interact.snappers.grid({ x: 10, y: 10 })
            ],
            range: Infinity,
            relativePoints: [ { x: 0, y: 0 } ]
          }),
          interact.modifiers.restrict({ restriction: 'self', endOnly: true }),

        ],
        autoScroll: true,
        listeners: {
          move: (event) => {
            const target = event.target;
            // keep the dragged position in the data-x/data-y attributes
            const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
            const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
            target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);
          },
          drop: (event) => {
            console.log('Drop Event '+event);

          },

          // call this function on every dragend event
          end: (e) => {
            const canvas: HTMLCanvasElement = <HTMLCanvasElement>(
              document.getElementById('pdfCanvas')
            );

            //classlist2 should test if the element has been dropped inside the dropzone or not
            //if it has been dropped inside the dropzone, then it should be added to the signers array
            let canDrop = e.target.classList.value.indexOf('can-drop') != -1;
            if (canDrop) {
              $(e.target).find('.fa-refresh').removeClass('hidden');
              $(e.target).find('.handle').css('position','absolute');
              $(e.target).find('.handle').css('top','-8px');
              $(e.target).find('.handle').css('left','-8px');
              $(e.target).addClass('absolute');

              e.target.classList.add('resizable');
              const rect = canvas.getBoundingClientRect();
              const x = e.client.x - rect.x;
              const y = e.client.y - rect.y;
              const ptX = x * 0.75;
              const ptY = y * 0.75;
              e.target.setAttribute('final-data-x', ptX );
              e.target.setAttribute('final-data-y', ptY );

              this.coordinates = { x: ptX, y: ptY };
              // e.target.style.transform = 'translate(0px, 0px)';
              interact('.resizable').resizable({
                edges: { top: false, left: false, bottom: true, right: true },
                listeners: {
                  move: function (event) {
                    let { x, y } = event.target.dataset;
                    x = (parseFloat(x) || 0) + event.deltaRect.left;
                    y = (parseFloat(y) || 0) + event.deltaRect.top;
                    Object.assign(event.target.style, {
                      width: `${event.rect.width}px`,
                      height: `${event.rect.height}px`,
                      transform: `translate(${x}px, ${y}px)`,
                    });
                    Object.assign(event.target.dataset, { x, y });
                  },
                },
              });
            } else {
              e.target.style.transform = 'translate(0px, 0px)';
              e.target.setAttribute('final-data-x', 0);
              e.target.setAttribute('final-data-y', 0);
              e.target.setAttribute('data-x', 0);
              e.target.setAttribute('data-y', 0);
              $(e.target).find('.fa-refresh').addClass('hidden');
              $(e.target).find('.handle').css('position','unset');
              $(e.target).find('.handle').css('top','0');
              $(e.target).find('.handle').css('left','0');
              $(e.target).removeClass('drop-target resizable absolute')
            }
            this.coordinates = { x: 0, y: 0 };
          },
        },
      });
  }

  showCoordinates() {
    var _valid = [];
    var _invalid = [];
    //get all valid placeholders
    $('.drag-drop.can-drop').each(function (index) {
      var x = parseFloat($(this).attr('final-data-x'));
      var y = parseFloat($(this).attr('final-data-y'));
      var email = $(this).html();
      var pageNumber = parseInt($(this).attr('pagenumber'));
      var val = {
        // email: email,
        fieldName:'test',
        fromTop: x * 1.33 + 24,
        fromLeft: y * 1.33 + 24,
        pageNumber: pageNumber - 1,
      };
    // console.log(x,y)
      _valid.push(val);
    });
    return _valid;
  }
}
