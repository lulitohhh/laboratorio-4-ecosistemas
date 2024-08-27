document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', loginUser);
    }
});

async function loginUser(event) {
    event.preventDefault(); // Evita el envío del formulario por defecto

    renderLoadingState();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!username || !password) {
        renderErrorState('Todos los campos son obligatorios. Por favor, complétalos.');
        return;
    }

    try {
        const response = await fetch('http://localhost:5050/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        if (data.success) {
            renderData('Inicio de sesión exitoso');
            // Redirigir a la página de creación de publicaciones después del inicio de sesión
            setTimeout(() => {
                window.location.href = 'http://127.0.0.1:3000/post/post.html';
            }, 1000); // Esperar 1 segundo para mostrar el mensaje
        } else {
            renderErrorState('Credenciales incorrectas. Por favor, intenta de nuevo.');
        }
    } catch (error) {
        renderErrorState('Fallo al iniciar sesión. Por favor, intenta de nuevo.');
    }
}

function renderErrorState(message) {
    const container = document.getElementById('data-container');
    container.innerHTML = `<p class="error">${message}</p>`;
    console.log(message);
}

function renderLoadingState() {
    const container = document.getElementById('data-container');
    container.innerHTML = '<p class="loading">Cargando...</p>';
    console.log('Cargando...');
}

function renderData(message) {
    const container = document.getElementById('data-container');
    container.innerHTML = `<p class="success">${message}</p>`;
}
