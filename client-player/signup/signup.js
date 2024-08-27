document.getElementById('signup-form').addEventListener('submit', createUser);

async function createUser(event) {
    event.preventDefault(); // Evita el envío del formulario por defecto

    renderLoadingState();

    try {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const profilePicture = document.getElementById('profile-picture').files[0]; // Obtener archivo subido

        if (!username || !password) {
            renderErrorState('Todos los campos son obligatorios. Por favor, complétalos.');
            return;
        }

        // Convertir la imagen de perfil a una URL base64 si se ha subido una
        let profilePictureUrl = 'https://avatar.iran.liara.run/public/13'; // Imagen por defecto

        if (profilePicture) {
            profilePictureUrl = await convertToBase64(profilePicture);
        }

        const response = await fetch('http://localhost:5050/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password, profilePicture: profilePictureUrl }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        if (data.username) {
            renderData('Usuario creado exitosamente');
            // Redirigir a la página de inicio de sesión después de crear el usuario
            setTimeout(() => {
                window.location.href = 'http://127.0.0.1:3000/login/index.html';
            }, 1000); // Esperar 1 segundo para mostrar el mensaje
        } else {
            renderErrorState('Error inesperado al crear el usuario.');
        }
    } catch (error) {
        renderErrorState('Fallo al crear el usuario. Por favor, intenta de nuevo.');
    }
}

function renderErrorState(message) {
    const container = document.getElementById('data-container');
    container.innerHTML = '';
    container.innerHTML = `<p class="error">${message}</p>`;
    console.log(message);
}

function renderLoadingState() {
    const container = document.getElementById('data-container');
    container.innerHTML = '';
    container.innerHTML = '<p class="loading">Cargando...</p>';
    console.log('Cargando...');
}

function renderData(message) {
    const container = document.getElementById('data-container');
    container.innerHTML = '';
    const div = document.createElement('div');
    div.className = 'success';
    div.innerHTML = message;
    container.appendChild(div);
}

function convertToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
}
