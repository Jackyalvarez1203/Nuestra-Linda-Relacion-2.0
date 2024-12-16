// Lista de archivos que se deben descargar
const archivos = ["../Pdf/prueba.pdf", "../Pdf/prueba2.pdf", "../Pdf/prueba3.pdf"]; // Nombres de los archivos en orden
let archivoIndex = 0; // Controlar el índice del archivo que se va a descargar

// Calcular la fecha objetivo para el contador (20 de diciembre de 2024 a las 00:00 en la zona horaria local)
const targetDate = new Date();
targetDate.setFullYear(2024, 11, 20); // Año: 2024, mes: 11 (diciembre), día: 20
targetDate.setHours(0, 0, 0, 0); // A las 00:00 horas del 20 de diciembre, hora local

// Función para actualizar el contador
function updateCountdown() {
  const now = new Date(); // Hora local del usuario
  const timeLeft = targetDate - now; // Diferencia de tiempo entre el ahora y la fecha objetivo

  // Calculamos los días, horas, minutos y segundos restantes
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  // Mostrar el contador en el HTML
  document.getElementById("timer").textContent =
    `${days}d ${hours}h ${minutes}m ${seconds}s`;

  // Si la cuenta regresiva llega a cero, cambiar el texto y permitir la descarga
  if (timeLeft <= 0) {
    clearInterval(countdownInterval);
    document.getElementById("timer").textContent = "¡Ya llegó una carta nueva!";
    // Llamamos a la función de descarga para permitir la descarga automática
    downloadPDF(); 
  }
}

// Función para descargar el PDF
function downloadPDF() {
  const link = document.createElement("a");
  const archivoDescargar = archivos[archivoIndex]; // Obtener el archivo correspondiente
  link.href = archivoDescargar;
  link.download = archivoDescargar; // Nombre del archivo al descargar

  // Verificar si el enlace tiene una URL válida
  if (link.href) {
    document.body.appendChild(link); // Agregar el enlace al DOM
    link.click(); // Hacer clic en el enlace
    document.body.removeChild(link); // Eliminar el enlace después de hacer clic
  }

  // Cambiar al siguiente archivo de la lista cada vez que se descargue uno
  archivoIndex = (archivoIndex + 1) % archivos.length;
}

// Iniciar la cuenta regresiva
const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown();

// Función para mostrar el popup
function showPopup() {
  const now = new Date(); // Hora actual
  const timeLeft = targetDate - now; // Diferencia de tiempo

  // Solo mostrar el popup si la cuenta regresiva no ha llegado a cero
  if (timeLeft > 0) {
    document.getElementById("popup").style.display = "block"; // Mostrar el popup
  }
}

// Cerrar el popup cuando el usuario hace clic en el botón de cerrar
document.getElementById("closePopup").addEventListener("click", () => {
  document.getElementById("popup").style.display = "none"; // Ocultar el popup
});

// Asegurarse de que el evento se agregue correctamente al emoji de la carta
document.addEventListener("DOMContentLoaded", () => {
  const emoji = document.getElementById("downloadLetter");

  emoji.addEventListener("click", function () {
    showPopup(); // Mostrar el popup si se hace clic en el emoji
    // Cuando se hace clic, también se actualiza la cuenta regresiva
    updateCountdown();  
  });
});
