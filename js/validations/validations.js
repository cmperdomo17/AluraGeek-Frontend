window.validateForm = function validateForm() {
    const id = document.getElementById('productId').value;
    const name = document.getElementById('productName').value;
    const price = document.getElementById('productPrice').value;
    const imageUrl = document.getElementById('productImage').value;

    if (!id || !name || !price || !imageUrl) {
        alert('Todos los campos son obligatorios');
        return false;
    }

    if (isNaN(price) || price <= 0) {
        alert('El precio debe ser un número positivo');
        return false;
    }

    if (!imageUrl.startsWith('http')) {
        alert('La URL de la imagen no es válida');
        return false;
    }

    if (id < 0) {
        alert('El id debe ser un número positivo');
        return false;
    }

    return true;
}
