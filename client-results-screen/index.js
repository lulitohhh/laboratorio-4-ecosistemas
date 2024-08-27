const API_URL = 'http://localhost:5050';

async function fetchUsersAndPosts() {
  try {
    const [usersResponse, postsResponse] = await Promise.all([
      fetch(`${API_URL}/users`),
      fetch(`${API_URL}/posts`)
    ]);

    // Verificar si las respuestas son correctas
    if (!usersResponse.ok) {
      throw new Error('Error al obtener los usuarios');
    }
    if (!postsResponse.ok) {
      throw new Error('Error al obtener los posts');
    }

    // Obtener los datos JSON
    const users = await usersResponse.json();
    const posts = await postsResponse.json();

    // Imprimir los datos para depuración
    console.log('Usuarios:', users);
    console.log('Posts:', posts);

    // Actualizar la lista de usuarios
    const usersList = document.getElementById('users-list');
    usersList.innerHTML = ''; // Limpiar lista antes de agregar nuevos elementos
    if (users.length > 0) {
      users.forEach(user => {
        // Asegúrate de que las propiedades existen en el objeto de usuario
        const name = user.name || 'Nombre no disponible';
        const username = user.username || 'Nombre de usuario no disponible';
        const li = document.createElement('li');
        li.textContent = `${name} (${username})`;
        usersList.appendChild(li);
      });
    } else {
      usersList.innerHTML = '<li>No hay usuarios para mostrar</li>';
    }

    // Actualizar la lista de posts
    const postsList = document.getElementById('posts-list');
    postsList.innerHTML = ''; // Limpiar lista antes de agregar nuevos elementos
    if (posts.length > 0) {
      posts.forEach(post => {
        console.log('Post:', post); // Imprimir cada post para verificar la estructura
        const postElement = document.createElement('div');
        postElement.classList.add('post-item');
        postElement.innerHTML = `
          <div class="post-content">
            <img src="${post.imagenData}" alt="Imagen del post">
            <div class="post-text">
              <h1>${post.titulo}</h1>
              <p>${post.descripcion}</p>
            </div>
          </div>
        `;
        postsList.appendChild(postElement);
      });
    } else {
      postsList.innerHTML = '<li>No hay posts para mostrar</li>';
    }
  } catch (error) {
    console.error('Error al obtener usuarios y posts:', error);
    // Mostrar mensaje de error al usuario
    const usersList = document.getElementById('users-list');
    const postsList = document.getElementById('posts-list');
    usersList.innerHTML = '<li>Error al cargar usuarios</li>';
    postsList.innerHTML = '<li>Error al cargar publicaciones</li>';
  }
}

document.addEventListener('DOMContentLoaded', fetchUsersAndPosts);
