function showModel(modelId) {
  // Ocultar todos los modelos
  document.querySelectorAll("model-viewer").forEach(m => m.style.display = "none");

  // Mostrar el modelo seleccionado
  document.getElementById(modelId).style.display = "block";

  // Cambiar el fondo según el modelo
  if (modelId === "Capitan America") {
    document.body.style.backgroundImage = "url('./assets/images/cp.jpg')"; 
  } else if (modelId === "Paleta") {
    document.body.style.backgroundImage = "url('./assets/images/paleta.jpg')";
  } else if (modelId === "Cuarto Rosa") {
    document.body.style.backgroundImage = "url('./assets/images/rosa.jpg')";
  }
}

// Mostrar Capitán América por defecto al cargar la página
window.onload = () => {
  showModel("Capitan America");
};
