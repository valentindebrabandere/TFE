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
    end: function (event) {
      event.target.classList.remove("is-moving");
      event.target.setAttribute("data-state", "static");
    },
  },

  inertia: {
    resistance: 75,
  },
  //keep cursor normal
  cursorChecker() {},
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

function dragMoveListener(event) {
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
    end: function (event) {
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
  cursorChecker() {},
});

// Make something draggable with into a container
// data attribute data-drag="draggable-container"
// go with another drag attribute for the container data attribute data-drag="container"

interact('[data-drag="draggable-contain"]').draggable({
  listeners: {
    move: dragMoveListener,
    end: function (event) {
      event.target.classList.remove("is-moving");
      event.target.setAttribute("data-state", "static");
    },
  },

  inertia: {
    resistance: 75,
  },
  //keep cursor normal
  cursorChecker() {},
  modifiers: [
    // keep the edges inside the parent
    interact.modifiers.restrictEdges({
      outer: 'parent'
    }),
  ],
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

function dragMoveListener(event) {
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