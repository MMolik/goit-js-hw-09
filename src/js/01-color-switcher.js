// Dobieramy się do przycisków
const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');
// Przypisuje funkcje zmiany kolorów do stałej
const colorSwitcher = function () {
  const getRandomHexColor = function () {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  };

  // Tworze interwal funkcji zmiany kolorow co 1 sekunde
  const intervalId = setInterval(function () {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  // Wyłączamy przycisk "Start"
  startButton.disabled = true;

  // Zatrzymanie interwału po naciśnięciu przycisku STOP

  stopButton.addEventListener('click', function () {
    clearInterval(intervalId);
    // Usuwamy atrybut disabled, aby włączyć przycisk "Start" ponownie
    startButton.disabled = false;
  });
};

startButton.addEventListener('click', colorSwitcher);
