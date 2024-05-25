export function clickTrashButton() {
    const buttons = document.getElementsByClassName("button_trash");

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", () => {
            const id = Number(buttons[i].getAttribute('data-id'));
            deleteProduct(id);
        });
    }
}

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

    if(!validateForm()) {
        return;
    }

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