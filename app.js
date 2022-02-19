//convertor

const input =  document.getElementById("input");
const lengthParagraph = document.getElementById("lengthParagraph");
const volumeParagraph = document.getElementById("volumeParagraph");
const massParagraph = document.getElementById("massParagraph");

input.addEventListener('change', updateValues);

function updateValues(){
  lengthParagraph.textContent = `${input.value} meters = ${metersToFeet(this.value)} feet | ${input.value} feet = ${feetToMeters(this.value)} meters`;
  volumeParagraph.textContent = `${input.value} liters = ${litersToGallons(this.value)} gallons | ${input.value} gallons = ${gallonsToLiters(this.value)} liters`;
  massParagraph.textContent = `${input.value} kilos = ${killogramsToPounds(this.value)} pounds | ${input.value} pounds = ${poundsToKillograms(this.value)} kilos`
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