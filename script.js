// ================= MENU =================
function toggleMenu() {
    const menu = document.querySelector(".menu");
    menu.classList.toggle("active");
}

document.querySelectorAll(".menu a").forEach(link => {
    link.addEventListener("click", () => {
        document.querySelector(".menu").classList.remove("active");
    });
});


// ================= SEARCH (WHATSAPP) =================
function searchRooms(event) {
    event.preventDefault();

    const checkin = document.querySelector('[name="checkin"]').value;
    const checkout = document.querySelector('[name="checkout"]').value;

    const rooms = parseInt(document.querySelector('[name="rooms"]').value) || 1;
    const adults = parseInt(document.querySelector('[name="adults"]').value) || 1;
    const children = parseInt(document.querySelector('[name="children"]').value) || 0;

    if (!checkin || !checkout) {
        alert("Please select dates");
        return;
    }

    if (adults > rooms * 2) {
        alert("Maximum 2 adults per room");
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


// ================= DATE LIMIT =================
window.addEventListener("load", function () {
    const today = new Date().toISOString().split("T")[0];

    const checkin = document.querySelector('[name="checkin"]');
    const checkout = document.querySelector('[name="checkout"]');

    if (checkin) checkin.setAttribute("min", today);
    if (checkout) checkout.setAttribute("min", today);
});


// ================= MAIN COUNTER FUNCTION =================
function changeCount(type, change) {

    const field = document.querySelector('[name="' + type + '"]');
    if (!field) return;

    let value = parseInt(field.value) || 0;

    value += change;

    // ===== ROOMS =====
    if (type === "rooms") {
        if (value < 1) value = 1;
        if (value > 8) value = 8;
    }

    // ===== ADULTS =====
    if (type === "adults") {
        let rooms = parseInt(document.querySelector('[name="rooms"]').value) || 1;
        let maxAdults = rooms * 2;

        if (value < 1) value = 1;
        if (value > maxAdults) value = maxAdults;
    }

    // ===== CHILDREN =====
    if (type === "children") {
        if (value < 0) value = 0;
        if (value > 10) value = 10;
    }

    field.value = value;
}


// ================= FORCE LIMIT SYNC =================
function enforceLimits() {
    let roomsField = document.querySelector('[name="rooms"]');
    let adultsField = document.querySelector('[name="adults"]');

    let rooms = parseInt(roomsField.value) || 1;
    let adults = parseInt(adultsField.value) || 1;

    if (rooms > 8) rooms = 8;
    if (rooms < 1) rooms = 1;

    roomsField.value = rooms;

    let maxAdults = rooms * 2;

    if (adults > maxAdults) {
        adultsField.value = maxAdults;
    }
}


// ================= FIX MANUAL INPUT =================
document.addEventListener("input", function (e) {
    if (!e.target.name) return;

    let type = e.target.name;
    let value = parseInt(e.target.value) || 0;

    if (type === "rooms") {
        if (value < 1) value = 1;
        if (value > 8) value = 8;
    }

    if (type === "adults") {
        let rooms = parseInt(document.querySelector('[name="rooms"]').value) || 1;
        let maxAdults = rooms * 2;

        if (value < 1) value = 1;
        if (value > maxAdults) value = maxAdults;
    }

    if (type === "children") {
        if (value < 0) value = 0;
        if (value > 10) value = 10;
    }

    e.target.value = value;

    enforceLimits();
});
