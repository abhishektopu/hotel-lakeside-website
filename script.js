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
const adultsField = document.querySelector('[name="adults"]');

if (adultsField) {
    adultsField.addEventListener("change", updateRooms);
}

function changeCount(type, change) {
    const input = document.querySelector(`[name="${type}"]`);
    let value = parseInt(input.value) || 0;

    value += change;

    // Rooms limit
    if (type === "rooms") {
        if (value < 1) value = 1;
        if (value > 8) value = 8;
    }

    // Adults limit (based on rooms)
    if (type === "adults") {
        let rooms = parseInt(document.querySelector('[name="rooms"]').value) || 1;
        let maxAdults = rooms * 2;

        if (value < 1) value = 1;
        if (value > maxAdults) value = maxAdults;
    }

    // Children limit (optional)
    if (type === "children") {
        if (value < 0) value = 0;
        if (value > 10) value = 10; // adjust if needed
    }

    input.value = value;
}
