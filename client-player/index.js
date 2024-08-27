document.getElementById('create-button').addEventListener('click', createUser);
document.getElementById('login-button').addEventListener('click', loginUser);

document.getElementById('create-button').addEventListener('click', function () {
	window.location.href = 'http://127.0.0.1:3000/signup/index.html';
});

document.getElementById('login-button').addEventListener('click', function () {
	window.location.href = 'http://127.0.0.1:3000/login/index.html';
});

async function createUser() {
	renderLoadingState();
	try {
		const player = {
			name: 'John Doe',
			profilePicture: 'https://avatar.iran.liara.run/public/13',
		};
		const response = await fetch('http://localhost:5050/user', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(player),
		});
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		renderData('Usuario creado exitosamente');
	} catch (error) {
		renderErrorState();
	}
}

async function loginUser() {
	renderLoadingState();
	try {
		const response = await fetch('http://localhost:5050/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ name: 'John Doe' }),
		});
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		renderData('Inicio de sesión exitoso');
	} catch (error) {
		renderErrorState();
	}
}

function renderErrorState() {
	const container = document.getElementById('data-container');
	container.innerHTML = '';
	container.innerHTML = '<p>Ocurrió un error</p>';
	console.log('Ocurrió un error');
}

function renderLoadingState() {
	const container = document.getElementById('data-container');
	container.innerHTML = '';
	container.innerHTML = '<p>Cargando...</p>';
	console.log('Cargando...');
}

function renderData(message) {
	const container = document.getElementById('data-container');
	container.innerHTML = '';
	const div = document.createElement('div');
	div.className = 'item';
	div.innerHTML = message;
	container.appendChild(div);
}