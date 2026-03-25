function toggleMenu() {
const menu = document.querySelector(".menu");
menu.classList.toggle("active");
}

document.querySelectorAll(".menu a").forEach(link => {
link.addEventListener("click", () => {
document.querySelector(".menu").classList.remove("active");
});
});

function searchRooms(event){

event.preventDefault();

const checkin = document.querySelector('[name="checkin"]').value;
const checkout = document.querySelector('[name="checkout"]').value;

const rooms = parseInt(document.querySelector('[name="rooms"]').value);
const adults = parseInt(document.querySelector('[name="adults"]').value);
const children = parseInt(document.querySelector('[name="children"]').value);

if(!checkin || !checkout || !rooms || !adults){
alert("Please fill all booking details");
return;
}

if(adults > rooms * 2){
return;
}

const message =
"Hello Hotel Lakeside,%0A%0A" +
"I want to check room availability.%0A%0A" +
"Check-in: " + checkin + "%0A" +
"Check-out: " + checkout + "%0A" +
"Rooms: " + rooms + "%0A" +
"Adults: " + adults + "%0A" +
"Children: " + children + "%0A%0A" +
"Please confirm availability.";

const phone = "917899358934";

window.open("https://wa.me/" + phone + "?text=" + message, "_blank");

}

window.addEventListener("load", function(){

const today = new Date().toISOString().split("T")[0];

const checkin = document.querySelector('[name="checkin"]');
const checkout = document.querySelector('[name="checkout"]');

if(checkin) checkin.setAttribute("min", today);
if(checkout) checkout.setAttribute("min", today);

});

function updateRooms(){

const adults = parseInt(document.querySelector('[name="adults"]').value) || 0;

const roomsField = document.querySelector('[name="rooms"]');

const suggestedRooms = Math.ceil(adults / 2);

if(suggestedRooms > 0){
roomsField.value = suggestedRooms;
}

}
document.querySelector('[name="adults"]').addEventListener("change", updateRooms);

function changeCount(type, change){

const field = document.querySelector('[name="'+type+'"]');

let value = parseInt(field.value);

value += change;

if(type === "rooms"){
if(value < 1) value = 1;
if(value > 8) value = 8;
}

if(type === "adults"){

if(value < 1) value = 1;

let roomsField = document.querySelector('[name="rooms"]');
let rooms = parseInt(roomsField.value);

let maxAdults = rooms * 2;

const note = document.getElementById("roomNote");

if(value > maxAdults){

rooms = Math.ceil(value / 2);
roomsField.value = rooms;

if(note){
note.innerText = "Rooms increased automatically (2 adults per room)";
}

}else{

if(note){
note.innerText = "Maximum 2 adults per room";
}

}

}

if(type === "children"){
if(value < 0) value = 0;
if(value > 10) value = 10;
}

field.value = value;

updateRooms();

}