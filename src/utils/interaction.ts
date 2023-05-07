// import interact from 'interactjs';

// function dragMoveListener(event: any) {
//   var target = event.target;

//   target.setAttribute("data-state", "moving");
//   target.classList.add("is-moving");

//   var x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
//   var y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

//   target.style.transform = "translate3D(" + x + "px, " + y + "px ,0)";
//   target.setAttribute("data-x", x);
//   target.setAttribute("data-y", y);
// }

// export function draggable() {
//   interact('[data-drag="draggable"]').draggable({
//     listeners: {
//       move: dragMoveListener,
//       end: function (event: any) {
//         event.target.classList.remove("is-moving");
//         event.target.setAttribute("data-state", "static");
//       },
//     },
//     inertia: {
//       resistance: 75,
//     },
//     cursorChecker() {
//       return 'normal';
//     },
//   });
// }

// export function draggableDragger() {
//   interact('[data-drag="draggable-dragger"]').draggable({
//     listeners: {
//       move: dragMoveListener,
//       end: function (event: any) {
//         event.target.classList.remove("is-moving");
//         event.target.setAttribute("data-state", "static");
//       },
//     },
//     allowFrom: '[data-drag="dragger"]',
//     inertia: {
//       resistance: 75,
//     },
//     cursorChecker() {
//       return 'normal';
//     },
//   });
// }

// export function folder() {
//   interact('[data-type="folder"]').dropzone({
//     accept: '[data-drop="droppable"]',
//     ondrop: function (event: any) {
//       event.relatedTarget.setAttribute("data-x", 0);
//       event.relatedTarget.setAttribute("data-y", 0);
//       event.relatedTarget.style.transform = "translate3D(0,0,0)";

//       event.target.filesContains.push(event.relatedTarget);
//       event.relatedTarget.style.display = "none";
//     },
//   });
// }

// export function folderWindow() {
//   interact('[data-type="folderWindow"]').dropzone({
//     accept: '[data-drop="droppable"]',
//     ondrop: function (event) {
//       let folderWindow = event.target;
//       let droppedElement = event.relatedTarget;
//       if (droppedElement != folderWindow.parent) {
//         folderWindow.parent.filesContains.push(droppedElement);
//         folderWindow.appendChild(droppedElement);
//       }
//     },
//     ondragleave: function (event) {
//       let folderWindow = event.target;
//       let droppedElement = event.relatedTarget;
//       let newParent = event._interaction._latestPointer.eventTarget;
//       let elementImg = droppedElement.querySelector(".c-desktop__icon-img");
//       if (newParent != elementImg) {
//         newParent.appendChild(droppedElement);
//         let filesContains = folderWindow.parent.filesContains;
//         let index = filesContains.indexOf(droppedElement);
//         filesContains.splice(index, 1);
//       }
//     },
//   });
// }

// export function trash() {
//   interact(".trash").dropzone({
//     accept: ".trashdrop",
//     ondrop: function (event) {
//       event.target.classList.add("drop-activated");
//       event.relatedTarget.classList.add("dropped");
//       event.relatedTarget.style.opacity = 0;
//     },
//     ondragleave: function (event) {
//       event.target.classList.remove("drop-activated");
//       event.relatedTarget.classList.remove("dropped");
//       event.target.parentElement.appendChild(event.relatedTarget);
//     },
//   });
// }
