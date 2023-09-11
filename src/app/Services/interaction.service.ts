 /*import { Injectable } from '@angular/core';
import interact from 'interactjs';
import $ from 'jquery';
@Injectable({
  providedIn: 'root',
})
export class InteractionService {
  holdBeforeDrag: number = 0;
  inertia: boolean = false; //  allows drag and resize actions to continue after the user releases the pointer at a fast enough speed
  dropzoneClassName: string = 'dropzone';
  autoScroll: boolean = true; // scroll when reaching the edge of the screen while dragging

  public coordinates = {
    x: null,
    y: null,
  };
  min;

  validTargets = [];
  public drag_pos = { x: 0, y: 0 };
  constructor() {}

  public init() {
    var _valid = [];
  interact('.drag-drop')
   .dropzone({
     accept: '.drag-handle',
     ondrop: function (event) {
      var droppedElement = event.relatedTarget;
      droppedElement.remove(); // Remove the dropped element
     },
    });
    interact('.dropzone').dropzone({
      accept: '.drag-drop',
    })
    interact('.drag-drop')
      .draggable({
        allowFrom:'.drag-handle',
        inertia: false,
        onmove: function (event) {
          var target = event.target;
          var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
          var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
       
            target.style.webkitTransform = target.style.transform =
            'translate(' + x + 'px, ' + y + 'px)';

          target.setAttribute('data-x', x);
          target.setAttribute('data-y', y);
          console.log(x,y)
        },
        onend: function (event) {
          console.log(event);
        },

      })
      .on('move', function (event) {
        var interaction = event.interaction;
        if (
          interaction.pointerIsDown &&
          !interaction.interacting() &&
          event.currentTarget.getAttribute('clonable') != 'false'
        ) {
          var original = event.currentTarget;
          var clone = event.currentTarget.cloneNode(false);
          var x = clone.offsetLeft;
          var y = clone.offsetTop;
          clone.setAttribute('clonable', 'false');
          clone.style.position = 'absolute';
          clone.style.left = original.offsetLeft + 'px';
          clone.style.top = original.offsetTop + 'px';
          // original.parentElement.appendChild(clone);
          interaction.start({ name: 'drag' }, event.interactable, clone);
        }
      });
      interact('.drag-drop')
     .dropzone({
      accept: '.dropzone',
      overlap: 0.5,
      ondrop: function (event) {
        var droppedElement = event.relatedTarget;
        droppedElement.remove(); // Remove the dropped element
    },
  });
  }
   
  showCoordinates() {
    var _valid = [];
    var _invalid = [];
    //get all valid placeholders
    $('.drag-drop').each(function (index) {
      var x = parseFloat($(this).attr('final-data-x'));
      var y = parseFloat($(this).attr('final-data-y'));
   
     // var email = $(this).html();
      var pageNumber = parseInt($(this).attr('pagenumber'));
      var val = {
        // email: email,
        X: x * 1.33 + 24,
        Y: y * 1.33 + 24,
        pageNumber: pageNumber - 1,
      };
      localStorage.setItem('savedX', val.X.toString());
      localStorage.setItem('savedY', val.Y.toString());
      _valid.push(val);
    });
    
 
    return _valid;
  }
  

} 
  import { Injectable } from '@angular/core';
  import interact from 'interactjs';
  import $ from 'jquery';
  
  @Injectable({
    providedIn: 'root',
  })
  export class InteractionService {
    constructor() {}
  
    public init() {
      interact('.drag-drop').draggable({
        inertia: true,
        autoScroll: true,
        onmove: this.dragMoveListener,
      });
      
      interact('.dropzone').dropzone({
        accept: '.drag-drop',
        overlap: 1,
        ondropactivate: (event) => {
          event.target.classList.add('drop-active');
        },
        ondragenter: (event) => {
          const draggableElement = event.relatedTarget,
                dropzoneElement = event.target;
          dropzoneElement.classList.add('drop-target');
          draggableElement.classList.add('can-drop');
        },
        ondragleave: (event) => {
          event.target.classList.remove('drop-target');
          event.relatedTarget.classList.remove('can-drop');
        },
        ondrop: (event) => {
          // Handle the drop event here
          const draggableElement = event.relatedTarget;
          // Get the position of the drop
          const x = event.dragEvent.clientX;
          const y = event.dragEvent.clientY;
          // Convert the coordinates to the PDF viewer's coordinate system
          const pdfX = x - event.target.getBoundingClientRect().left;
          const pdfY = y - event.target.getBoundingClientRect().top;
          // Now you can use pdfX and pdfY to position the dropped element in the PDF viewer
          draggableElement.style.left = `${pdfX}px`;
          draggableElement.style.top = `${pdfY}px`;
        },
        ondropdeactivate: (event) => {
          event.target.classList.remove('drop-active');
          event.target.classList.remove('drop-target');
        }
      });
    }
  dragMoveListener(event) {
  const target = event.target;
  const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
  const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

  // Check if the new position is within the container
  const container = document.querySelector('.dropzone');
  if (container.contains(target)) {
    target.style.webkitTransform = target.style.transform = `translate(${x}px, ${y}px)`;
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  }
}
    
  showCoordinates() {
    var _valid = [];
    var _invalid = [];
    //get all valid placeholders
    $('.drag-drop').each(function (index) {
      var x = parseFloat($(this).attr('final-data-x'));
      var y = parseFloat($(this).attr('final-data-y'));
   
     // var email = $(this).html();
      var pageNumber = parseInt($(this).attr('pagenumber'));
      var val = {
        // email: email,
        X: x * 1.33 + 24,
        Y: y * 1.33 + 24,
        pageNumber: pageNumber - 1,
      };
      localStorage.setItem('savedX', val.X.toString());
      localStorage.setItem('savedY', val.Y.toString());
      _valid.push(val);
    });
    
 
    return _valid;
  }
  

  }*/
  import { Injectable } from '@angular/core';
import interact from 'interactjs';
import $ from 'jquery';
@Injectable({
  providedIn: 'root'
})
export class InteractionService {
  public coordinates = {
    x: null,
    y: null
  };
   validTargets = [];
  public drag_pos = { x: 0, y: 0 }
  constructor() { }
 
  public init() {
    console.log('init service');
    
    interact('.resizable')
    .resizable({
      edges: { top: true, left: true, bottom: true, right: true },
      listeners: {
        move: function (event) {
          let { x, y } = event.target.dataset
 
          x = (parseFloat(x) || 0) + event.deltaRect.left
          y = (parseFloat(y) || 0) + event.deltaRect.top
 
          Object.assign(event.target.style, {
            width: `${event.rect.width}px`,
            height: `${event.rect.height}px`,
            transform: `translate(${x}px, ${y}px)`
          })
 
          Object.assign(event.target.dataset, { x, y })
        }
      }
    })
    interact('.dropzone').dropzone({
      // only accept elements matching this CSS selector
      accept: '.drag-drop',
      // Require a 90% element overlap for a drop to be possible
      overlap: 1,
      // listen for drop related events:
      ondropactivate: function (event) {
        // add active dropzone feedback
        event.target.classList.add('drop-active');
        event.target.classList.add('drop-active');
        //console.log('dropzone activated');
      },
      ondragenter: function (event) {
        var draggableElement = event.relatedTarget;
        var dropzoneElement = event.target;
        // feedback the possibility of a drop
        dropzoneElement.classList.add('drop-target');
        draggableElement.classList.add('can-drop');
        if (event.currentTarget.getAttribute("pagenumber")!=null) {
          event.relatedTarget.setAttribute('pagenumber',event.currentTarget.getAttribute('pagenumber'));
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
      }
    });
 
    interact('.drag-drop').draggable({
      // allowFrom:'.handle',
      inertia: false, modifiers: [interact.modifiers.restrict({ restriction: 'self', endOnly: true, })],
      autoScroll: true,
      listeners: {
        move: event => {
          const target = event.target;
          // keep the dragged position in the data-x/data-y attributes
          const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
          const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

          target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
          target.setAttribute('data-x', x);
          target.setAttribute('data-y', y);
 
        },
        drop: event => {
          //console.log('drop');
          alert(event.relatedTarget.id + ' was dropped into ' + event.target.id)
        },
        // call this function on every dragend event
        end: e => {
          const canvas: HTMLCanvasElement = <HTMLCanvasElement>(
            document.getElementById('pdfCanvas')
          );
          const rect = canvas.getBoundingClientRect();
          const x = e.client.x - rect.x;
          const y = e.client.y - rect.y;
          const ptX = x * 0.75;
          const ptY = y * 0.75;
          e.target.setAttribute('final-data-x', ptX);
          e.target.setAttribute('final-data-y', (e.relatedTarget.height*0.75)*e.relatedTarget.getAttribute('pagenumber')-ptY);
          //classlist2 should test if the element has been dropped inside the dropzone or not
          //if it has been dropped inside the dropzone, then it should be added to the signers array
          let t = e.target.classList.value.indexOf('drop-target');
          if (e.target.classList[2] == undefined) {
            e.target.style.transform = 'translate(0px, 0px)';
          }
          else {
            e.target.classList.add('drop-target');
            e.target.classList.add('resizable');
            interact(e.target).resizable({
              edges: { bottom: true, right: true },
              invert: 'reposition'
            })
          }
          this.coordinates = { x: ptX, y: ptY };
        },
        
 
      },
    });
  }
 
  showCoordinates() {
    var _valid = [];
    var _invalid = [];
    //get all valid placeholders
    $('.drag-drop.can-drop').each(function (index) {
      var x = parseFloat($(this).attr("final-data-x"))
      var y = parseFloat($(this).attr("final-data-y"))
      var email = $(this).html();
            var pageNumber = $(this).attr("pagenumber");
      var val = {
        "email": email,
        "X": x*1.33,
        "Y": y*1.33,
        "pageNumber":pageNumber };
      _valid.push(val);
    });
      return(_valid);
  }
}
