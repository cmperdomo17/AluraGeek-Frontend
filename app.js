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

        const buttons = document.getElementsByClassName("button_trash");

        for (let i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener("click", () => {
                const id = Number(buttons[i].getAttribute('data-id'));
                deleteProduct(id)
                .then((data) => {
                    console.log(data);
                })
                .catch((error) => console.log(error));
            });
        }
    })
    .catch((error) => console.log(error));
});

async function createProduct(product) {
    const response = await fetch('http://localhost:3000/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
    });
    
    if (!response.ok) {
        throw new Error('Error al crear el producto');
    }
    return response.json();
}

document.getElementById('productForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const id = document.getElementById('productId').value;
    const name = document.getElementById('productName').value;
    const price = document.getElementById('productPrice').value;
    const imageUrl = document.getElementById('productImage').value;

    const product = {
        id: id,
        nombre: name,
        precio: parseFloat(price),
        imagen: imageUrl
    };

    try {
        const response = await createProduct(product);
        console.log(response);
    } catch (error) {
        console.error('Error:', error);
    }
});

async function deleteProduct(id) {
    const response = await fetch(`http://localhost:3000/products/${id}`, {
        method: 'DELETE',
    });
    
    if (!response.ok) {
        throw new Error('Error al eliminar el producto');
    }
    return response.json();
}