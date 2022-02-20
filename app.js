//convertor

const input =  document.getElementById("input");
const lengthParagraph = document.getElementById("lengthParagraph");
const volumeParagraph = document.getElementById("volumeParagraph");
const massParagraph = document.getElementById("massParagraph");

input.addEventListener('change', updateValues);

function updateValues(){
  lengthParagraph.innerHTML = `${input.value} meters = ${metersToFeet(this.value)} feet | ${input.value} feet = ${feetToMeters(this.value)} meters`;
  volumeParagraph.innerHTML = `${input.value} liters = ${litersToGallons(this.value)} gallons | ${input.value} gallons = ${gallonsToLiters(this.value)} liters`;
  massParagraph.innerHTML = `${input.value} kilos = ${killogramsToPounds(this.value)} pounds | ${input.value} pounds = ${poundsToKillograms(this.value)} kilos`
}

function metersToFeet(meters) {
  return (meters * 3.281).toFixed(3);
}

function feetToMeters(feet) {
  return (feet / 3.281).toFixed(3);
}

function litersToGallons(liters) {
  return (liters / 3.785).toFixed(3);
}

function gallonsToLiters(gallons) {
  return (gallons * 3.785).toFixed(3);
}

function killogramsToPounds(killograms) {
  return (killograms * 2.205).toFixed(3);
}

function poundsToKillograms(pounds) {
  return (pounds / 2.205).toFixed(3);
}

//password generator

const generateButton = document.getElementById("generate");
const passwordInputs = document.getElementsByClassName("password");
const allChars = ["Q", "W", "E", "R","T","Y","U","I","O","P","A","S","D","F","G","H","J","K","L","Z","X","C","V","B","N","M",
                  "q","w","e","r","t","y","u","i","o","p","a","s","d","f","g","h","j","k","l","z","x","c","v","b","n","m",
                  "1","2","3","4","5","6","7","8","9","0",
                  "!","@","#","$","%","^","&","*"];



function getRandonChar(array) {
  return array[(Math.floor(Math.random() * array.length))]
}

function generatePassword() { 
  const passwordLength = document.getElementById("passwordLength").value;
  for (let i = 0; i < passwordInputs.length; i++) {
    let password = "";
    for (let n = 0; n < passwordLength; n++) {
      password += getRandonChar(allChars);
    }
    passwordInputs[i].value = password;
  }
}

generateButton.addEventListener('click', generatePassword);
  
function copyText(elem) {
  elem.select();
  elem.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(elem.value);
}

//invoice creator

const buttons = document.getElementsByClassName("addToInvoice");
const totalAmount = document.getElementById("totalAmount");
const list = document.getElementById("list");
const send = document.getElementById("send");

let tasksArray = JSON.parse(localStorage.getItem("tasksArray")) || [];

for (let i = 0; i < tasksArray.length; i++) {
  const charIndex = tasksArray[i].search(",");
  const name = tasksArray[i].slice(0, charIndex);
  const price = tasksArray[i].slice(charIndex + 1, tasksArray[i].length);

  countTotal(price);

  list.innerHTML += `<li>${name}: <button value="${tasksArray[i]}" onclick="removeTask(this)">Remove</button>$${price}</li>`;
}

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', addTask);
}

function addTask() {
  if (tasksArray.includes(this.value)) {
    return;
  } else {
    const charIndex = this.value.search(",");
    const name = this.value.slice(0, charIndex);
    const price = this.value.slice(charIndex + 1, this.value.length);
    list.innerHTML += `<li>${name}: <button value="${this.value}" onclick="removeTask(this)">Remove</button>$${price}</li>`;
    countTotal(price);
    tasksArray.push(this.value);
    localStorage.setItem("tasksArray", JSON.stringify(tasksArray));
  }
}

function removeTask(elem) {
  localStorage.clear();
  const index = tasksArray.indexOf(elem.value);
  const charIndex = elem.value.search(",");
  const price = elem.value.slice(charIndex + 1, elem.value.length);
  tasksArray.splice(index, 1);
  elem.parentElement.remove();
  localStorage.setItem("tasksArray", JSON.stringify(tasksArray));
  let total = parseInt(totalAmount.textContent) - parseInt(price);
  totalAmount.textContent = total;
}

function countTotal(price) {
  let total = parseInt(totalAmount.textContent) + parseInt(price);
  totalAmount.textContent = total;
}

function removeAll() {
  list.innerHTML = "";
  totalAmount.textContent = 0;
  localStorage.clear();
  tasksArray = [];
}