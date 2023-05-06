import interact from 'interactjs';

//=====================
//=Drag
//=====================

//--------------------
//=Draggable
//--------------------

//Make somthing draggable
//Data attribute data-drag="draggable"

interact('[data-drag="draggable"]').draggable({
  listeners: {
    move: dragMoveListener,
    end: function (event: any) {
      event.target.classList.remove("is-moving");
      event.target.setAttribute("data-state", "static");
    },
  },

  inertia: {
    resistance: 75,
  },
  //keep cursor normal
  cursorChecker() {
    return 'normal'; // return a string cursor value
  },
});

/**
 * fonction qui utilise l'event (listener) pour faire son action
 *      ajoute une classe
 *      defini la position de l'élément grace à ses attributs et la modifie grace à transform translate
 *   en y ajoutant (dx, dy) difference x et y qu'il y a eu lors du drag
 *      fini en mettant a jour les attributs pour connaitre sa position une prochaine fois
 *
 * @param {*} event
 */

function dragMoveListener(event: any) {
  var target = event.target;

  target.setAttribute("data-state", "moving");
  target.classList.add("is-moving");

  // keep the dragged position in the data-x/data-y attributes
  var x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
  var y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

  // translate the element
  target.style.transform = "translate3D(" + x + "px, " + y + "px ,0)";

  // update the posiion attributes
  target.setAttribute("data-x", x);
  target.setAttribute("data-y", y);
}

//--------------------
//=Draggable
//--------------------

// Make something draggable with a dragger
// data attribute data-drag="draggable-dragger"
// go with another drag attribute for the dragger data attribute data-drag="dragger"

interact('[data-drag="draggable-dragger"]').draggable({
  listeners: {
    move: dragMoveListener,
    end: function (event: any) {
      event.target.classList.remove("is-moving");
      event.target.setAttribute("data-state", "static");
    },
  },

  //only the head is draggable
  allowFrom: '[data-drag="dragger"]',
  inertia: {
    resistance: 75,
  },
  //keep cursor normal
  cursorChecker() {
    return 'normal'; // return a string cursor value
  },
});

//=====================
//=Folder
//=====================

interact('[data-type="folder"]').dropzone({
  accept: '[data-drop="droppable"]',
  ondrop: function (event: any) {
    // set to 0 his dragging attributes
    event.relatedTarget.setAttribute("data-x", 0);
    event.relatedTarget.setAttribute("data-y", 0);
    event.relatedTarget.style.transform = "translate3D(0,0,0)";

    event.target.filesContains.push(event.relatedTarget);
    event.relatedTarget.style.display = "none";
  },
});

//=====================
//=FolderWindow
//=====================

interact('[data-type="folderWindow"]').dropzone({
  accept: '[data-drop="droppable"]',
  ondrop: function (event) {
    let folderWindow = event.target;
    let droppedElement = event.relatedTarget;
    if (droppedElement != folderWindow.parent) {
      folderWindow.parent.filesContains.push(droppedElement);
      folderWindow.appendChild(droppedElement);
    }
  },

  ondragleave: function (event) {
    let folderWindow = event.target;
    let droppedElement = event.relatedTarget;
    let newParent = event._interaction._latestPointer.eventTarget;
    let elementImg = droppedElement.querySelector(".c-desktop__icon-img");
    if (newParent != elementImg) {
      newParent.appendChild(droppedElement);
      let filesContains = folderWindow.parent.filesContains;
      let index = filesContains.indexOf(droppedElement);
      filesContains.splice(index, 1);
    }
  },
});

//=====================
//=Trash
//=====================

interact(".trash").dropzone({
  accept: ".trashdrop",
  ondrop: function (event) {
    event.target.classList.add("drop-activated");
    event.relatedTarget.classList.add("dropped");
    event.relatedTarget.style.opacity = 0;
  },

  ondragleave: function (event) {
    event.target.classList.remove("drop-activated");
    event.relatedTarget.classList.remove("dropped");
    event.target.parentElement.appendChild(event.relatedTarget);
  },
});
