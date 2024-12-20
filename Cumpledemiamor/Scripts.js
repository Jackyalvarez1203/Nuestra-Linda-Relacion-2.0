// Lista de archivos que se deben descargar (archivos de audio .opus)
const archivos = ["../audios/Audioo.opus", "../Audio/audio2.opus", "../Audio/audio3.opus"]; // Nombres de los archivos en orden
let archivoIndex = 0; // Controlar el índice del archivo que se va a descargar
let fechaUltimaDescarga = null; // Para guardar la fecha de la última descarga

// Calcular la fecha objetivo para el contador (20 de diciembre de 2024 a las 00:00 en la zona horaria local)
const targetDate = new Date();
targetDate.setFullYear(2024, 11, 20); // Año: 2024, mes: 11 (diciembre), día: 20
targetDate.setHours(0, 0, 0, 0); // A las 00:00 horas del 20 de diciembre, hora local

// Calcular la fecha límite para el popup (19 de diciembre de 2024 a las 12:59)
const fechaLimitePopup = new Date();
fechaLimitePopup.setFullYear(2024, 11, 19); // Año: 2024, mes: 11 (diciembre), día: 19
fechaLimitePopup.setHours(12, 59, 59, 999); // 19 de diciembre a las 12:59:59

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

  // Si la cuenta regresiva llega a cero, cambiar el texto y permitir la interacción con el corazón
  if (timeLeft <= 0) {
    clearInterval(countdownInterval);
    document.getElementById("timer").textContent = "¡Ya llegó una carta nueva!";
    // Mostrar el corazón para permitir la descarga
    document.getElementById("downloadHeart").style.display = "block";
  }
}

// Función para descargar el archivo de audio
function downloadAudio() {
  const now = new Date();

  // Verificar si ha pasado una semana desde la última descarga
  if (fechaUltimaDescarga && now - fechaUltimaDescarga < 7 * 24 * 60 * 60 * 1000) {
    alert("Debes esperar 7 días después de la última descarga.");
    return;
  }

  // Realizar la descarga del archivo correspondiente
  const archivoDescargar = archivos[archivoIndex];
  const link = document.createElement("a");
  link.href = archivoDescargar;
  link.download = archivoDescargar; // Nombre del archivo al descargar

  if (link.href) {
    document.body.appendChild(link); // Agregar el enlace al DOM
    link.click(); // Hacer clic en el enlace para iniciar la descarga
    document.body.removeChild(link); // Eliminar el enlace después de hacer clic
  }

  // Guardar la fecha de la última descarga
  fechaUltimaDescarga = now;

  // Cambiar al siguiente archivo de la lista (y reiniciar la cuenta regresiva para el siguiente archivo)
  archivoIndex = (archivoIndex + 1) % archivos.length;

  // Reiniciar la fecha objetivo para el siguiente archivo (7 días después)
  targetDate.setDate(targetDate.getDate() + 7);
  // Iniciar la cuenta regresiva nuevamente
  clearInterval(countdownInterval);
  countdownInterval = setInterval(updateCountdown, 1000);
  updateCountdown();
}

// Función para mostrar el popup si estamos antes del 19 a las 12:59
function showPopup() {
  const now = new Date(); // Hora actual
  const timeLeft = targetDate - now; // Diferencia de tiempo

  // Solo mostrar el popup si la cuenta regresiva no ha llegado a cero
  // Y si la fecha actual es antes del 19 de diciembre a las 12:59
  if (timeLeft > 0 && now <= fechaLimitePopup) {
    document.getElementById("popup").style.display = "block"; // Mostrar el popup
  }
}

// Cerrar el popup cuando el usuario hace clic en el botón de cerrar
document.getElementById("closePopup").addEventListener("click", () => {
  document.getElementById("popup").style.display = "none"; // Ocultar el popup
});

// Asegurarse de que el evento se agregue correctamente al emoji de la carta
document.addEventListener("DOMContentLoaded", () => {
  const emoji = document.getElementById("downloadHeart");

  emoji.addEventListener("click", function () {
    showPopup(); // Mostrar el popup si se hace clic en el emoji
    // Cuando se hace clic, también se actualiza la cuenta regresiva
    downloadAudio(); // Llamar a la función de descarga
  });
});

// Iniciar la cuenta regresiva
let countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown();
