// Ajoutez ce code à la fin de votre fichier HTML ou dans un fichier séparé lié à votre page

// Sélectionner les éléments nécessaires
const popup = document.getElementById('popup');
const closePopupBtn = document.getElementById('close-popup');

// Afficher la fenêtre pop-up
popup.style.display = 'flex';

// Fermer la fenêtre pop-up lorsque le bouton "Fermer" est cliqué
closePopupBtn.addEventListener('click', function() {
  popup.style.display = 'none';
});
