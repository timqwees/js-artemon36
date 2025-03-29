// Version Manager
function VersionManager(version = '0.0.1') {
 if (version === '') version = '0.0.1';

 const parts = version.split('.').map(Number);
 if (parts.length !== 3 || parts.some(isNaN)) {
  throw new Error('Некорректный формат версии!');
 }

 this.major = parts[0];
 this.minor = parts[1];
 this.patch = parts[2];
 this.history = [];

 this.major = function () {
  this.history.push([this.major, this.minor, this.patch]);
  this.major++;
  this.minor = 0;
  this.patch = 0;
  return this;
 };

 this.minor = function () {
  this.history.push([this.major, this.minor, this.patch]);
  this.minor++;
  this.patch = 0;
  return this;
 };

 this.patch = function () {
  this.history.push([this.major, this.minor, this.patch]);
  this.patch++;
  return this;
 };

 this.rollback = function () {
  if (this.history.length === 0) {
   throw new Error('Невозможно выполнить откат!');
  }
  [this.major, this.minor, this.patch] = this.history.pop();
  return this;
 };

 this.release = function () {
  return `${this.major}.${this.minor}.${this.patch}`;
 };
}

// Rectangle and Square
class Rectangle {
 constructor(width, height) {
  this.width = width;
  this.height = height;
 }

 getArea() {
  return this.width * this.height;
 }

 getPerimeter() {
  return 2 * (this.width + this.height);
 }
}

class Square extends Rectangle {
 constructor(side) {
  super(side, side);
 }
}

// Temperature
class Temperature {
 constructor(celsius) {
  this.setCelsius(celsius);
 }

 setCelsius(value) {
  if (value < -273.16 || value > 1.41e32) {
   throw new Error('Некорректное значение температуры!');
  }
  this._celsius = value;
 }

 getCelsius() {
  return this._celsius;
 }

 getKelvin() {
  return Number((this._celsius + 273.15).toFixed(2));
 }

 getFahrenheit() {
  return Number((this._celsius * 9 / 5 + 32).toFixed(2));
 }

 toString() {
  return `${this.getKelvin()} К`;
 }

 static add(temp1, temp2) {
  if (!(temp1 instanceof Temperature) || !(temp2 instanceof Temperature)) {
   throw new Error('Оба аргумента должны быть экземплярами класса Temperature');
  }
  return new Temperature(temp1.getCelsius() + temp2.getCelsius());
 }

 static subtract(temp1, temp2) {
  if (!(temp1 instanceof Temperature) || !(temp2 instanceof Temperature)) {
   throw new Error('Оба аргумента должны быть экземплярами класса Temperature');
  }
  return new Temperature(temp1.getCelsius() - temp2.getCelsius());
 }
}

// Rock Paper Scissors Observer Pattern
class RPSObserver {
 constructor() {
  this.observers = new Map();
 }

 subscribe(id, callback) {
  if (!this.observers.has(id)) {
   this.observers.set(id, new Set());
  }
  this.observers.get(id).add(callback);
 }

 unsubscribe(id, callback) {
  if (this.observers.has(id)) {
   this.observers.get(id).delete(callback);
  }
 }

 notify(id, data) {
  if (this.observers.has(id)) {
   this.observers.get(id).forEach(callback => callback(data));
  }
 }
}

// UI Event Handlers
document.addEventListener('DOMContentLoaded', () => {
 // Version Manager
 let versionManager = null;
 const versionInput = document.getElementById('version-input');
 const createVersionBtn = document.getElementById('create-version');
 const versionDisplay = document.getElementById('version-display');
 const majorBtn = document.getElementById('major-btn');
 const minorBtn = document.getElementById('minor-btn');
 const patchBtn = document.getElementById('patch-btn');
 const rollbackBtn = document.getElementById('rollback-btn');

 createVersionBtn.addEventListener('click', () => {
  try {
   versionManager = new VersionManager(versionInput.value);
   versionDisplay.textContent = versionManager.release();
   versionInput.value = '';
   [majorBtn, minorBtn, patchBtn, rollbackBtn].forEach(btn => btn.disabled = false);
  } catch (error) {
   alert(error.message);
  }
 });

 majorBtn.addEventListener('click', () => {
  versionManager.major();
  versionDisplay.textContent = versionManager.release();
 });

 minorBtn.addEventListener('click', () => {
  versionManager.minor();
  versionDisplay.textContent = versionManager.release();
 });

 patchBtn.addEventListener('click', () => {
  versionManager.patch();
  versionDisplay.textContent = versionManager.release();
 });

 rollbackBtn.addEventListener('click', () => {
  try {
   versionManager.rollback();
   versionDisplay.textContent = versionManager.release();
  } catch (error) {
   alert(error.message);
  }
 });

 // Rectangle and Square
 const widthInput = document.getElementById('width-input');
 const heightInput = document.getElementById('height-input');
 const calculateBtn = document.getElementById('calculate-btn');
 const shapeResult = document.getElementById('shape-result');

 calculateBtn.addEventListener('click', () => {
  const width = Number(widthInput.value);
  const height = Number(heightInput.value);

  if (isNaN(width) || isNaN(height)) {
   alert('Пожалуйста, введите корректные числовые значения');
   return;
  }

  const shape = width === height ? new Square(width) : new Rectangle(width, height);
  shapeResult.textContent = `Площадь: ${shape.getArea()}, Периметр: ${shape.getPerimeter()}`;
 });

 // Temperature
 const temp1Input = document.getElementById('temp1-input');
 const temp2Input = document.getElementById('temp2-input');
 const tempResult = document.getElementById('temp-result');
 const addTempBtn = document.getElementById('add-temp');
 const subtractTempBtn = document.getElementById('subtract-temp');
 let temp1 = null;
 let temp2 = null;

 function updateTemperatureDisplay() {
  const unit1 = document.querySelector('input[name="unit1"]:checked').value;
  const unit2 = document.querySelector('input[name="unit2"]:checked').value;

  let display = '';
  if (temp1) {
   const value1 = unit1 === 'celsius' ? temp1.getCelsius() :
    unit1 === 'kelvin' ? temp1.getKelvin() :
     temp1.getFahrenheit();
   display += `Температура 1: ${value1}°${unit1 === 'celsius' ? 'C' : unit1 === 'kelvin' ? 'K' : 'F'}\n`;
  }
  if (temp2) {
   const value2 = unit2 === 'celsius' ? temp2.getCelsius() :
    unit2 === 'kelvin' ? temp2.getKelvin() :
     temp2.getFahrenheit();
   display += `Температура 2: ${value2}°${unit2 === 'celsius' ? 'C' : unit2 === 'kelvin' ? 'K' : 'F'}`;
  }
  tempResult.textContent = display;
 }

 temp1Input.addEventListener('change', () => {
  try {
   temp1 = new Temperature(Number(temp1Input.value));
   updateTemperatureDisplay();
  } catch (error) {
   alert(error.message);
  }
 });

 temp2Input.addEventListener('change', () => {
  try {
   temp2 = new Temperature(Number(temp2Input.value));
   updateTemperatureDisplay();
  } catch (error) {
   alert(error.message);
  }
 });

 document.querySelectorAll('input[name="unit1"], input[name="unit2"]').forEach(radio => {
  radio.addEventListener('change', updateTemperatureDisplay);
 });

 addTempBtn.addEventListener('click', () => {
  if (temp1 && temp2) {
   try {
    const result = Temperature.add(temp1, temp2);
    tempResult.textContent += `\nСумма: ${result.getCelsius()}°C`;
   } catch (error) {
    alert(error.message);
   }
  }
 });

 subtractTempBtn.addEventListener('click', () => {
  if (temp1 && temp2) {
   try {
    const result = Temperature.subtract(temp1, temp2);
    tempResult.textContent += `\nРазность: ${result.getCelsius()}°C`;
   } catch (error) {
    alert(error.message);
   }
  }
 });

 // Rock Paper Scissors
 const startWatchingBtn = document.getElementById('start-watching');
 const stopWatchingBtn = document.getElementById('stop-watching');
 const rpsHistory = document.getElementById('rps-history');
 const player1Stats = document.getElementById('player1-stats');
 const player2Stats = document.getElementById('player2-stats');
 let eventSource = null;
 const rpsObserver = new RPSObserver();
 const stats = {
  player1: { wins: 0, choices: { Камень: 0, Ножницы: 0, Бумага: 0 } },
  player2: { wins: 0, choices: { Камень: 0, Ножницы: 0, Бумага: 0 } }
 };

 function determineWinner(player1Choice, player2Choice) {
  if (player1Choice === player2Choice) return null;
  if (
   (player1Choice === 'Камень' && player2Choice === 'Ножницы') ||
   (player1Choice === 'Ножницы' && player2Choice === 'Бумага') ||
   (player1Choice === 'Бумага' && player2Choice === 'Камень')
  ) {
   return 1;
  }
  return 2;
 }

 function updateStats(data) {
  stats.player1.choices[data.player1]++;
  stats.player2.choices[data.player2]++;

  const winner = determineWinner(data.player1, data.player2);
  if (winner === 1) stats.player1.wins++;
  if (winner === 2) stats.player2.wins++;

  player1Stats.textContent = `Игрок 1:\nПобеды: ${stats.player1.wins}\nКамень: ${stats.player1.choices.Камень}\nНожницы: ${stats.player1.choices.Ножницы}\nБумага: ${stats.player1.choices.Бумага}`;
  player2Stats.textContent = `Игрок 2:\nПобеды: ${stats.player2.wins}\nКамень: ${stats.player2.choices.Камень}\nНожницы: ${stats.player2.choices.Ножницы}\nБумага: ${stats.player2.choices.Бумага}`;
 }

 startWatchingBtn.addEventListener('click', () => {
  eventSource = new EventSource('http://194.67.93.117:80/rps/stream');

  eventSource.addEventListener('round', (event) => {
   const data = JSON.parse(event.data);
   const roundElement = document.createElement('div');
   roundElement.textContent = `Игрок 1: ${data.player1}, Игрок 2: ${data.player2}`;
   rpsHistory.insertBefore(roundElement, rpsHistory.firstChild);
   updateStats(data);
  });

  startWatchingBtn.disabled = true;
  stopWatchingBtn.disabled = false;
 });

 stopWatchingBtn.addEventListener('click', () => {
  if (eventSource) {
   eventSource.close();
   eventSource = null;
   startWatchingBtn.disabled = false;
   stopWatchingBtn.disabled = true;
  }
 });
}); 