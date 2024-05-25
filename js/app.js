import { clickTrashButton } from "./api/crud.js";

document.addEventListener("DOMContentLoaded", () => {
    fetch("./db.json")
    .then((response) => response.json())
    .then((data) => {
        const products = data.products;
        let html = products.map((producto) => `
            <div class="card">
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <div class="card_title">
                    <p>${producto.id}.</p>
                    <p>${producto.nombre}</p>
                </div>
                <div class="card_description">
                <p>$${producto.precio.toFixed(2)}</p>
                <button class="button_trash" data-id="${producto.id}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-trash">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M4 7l16 0" />
                    <path d="M10 11l0 6" />
                    <path d="M14 11l0 6" />
                    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                    </svg>
                </button>
                </div>
            </div>
        `
        )
        .join("");
        document.getElementById("products_container").innerHTML = html;
        clickTrashButton();
    })
    .catch((error) => console.log(error));
});