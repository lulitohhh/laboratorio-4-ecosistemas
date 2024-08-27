document.addEventListener('DOMContentLoaded', function () {
  const postForm = document.getElementById('post-form');
  const postsList = document.getElementById('posts-list');

  function loadPosts() {
      const posts = JSON.parse(localStorage.getItem('posts')) || [];
      postsList.innerHTML = '';

      posts.forEach((post, index) => {
          const postElement = document.createElement('div');
          postElement.classList.add('post-item');
          postElement.innerHTML = `
              <div class="post-content">
                  <img src="${post.imagenData}" alt="Imagen del post">
                  <div class="post-text">
                      <h1>${post.titulo}</h1>
                      <p>${post.descripcion}</p>
                      <button onclick="removePost(${index})">Eliminar</button>
                  </div>
              </div>
          `;
          postsList.appendChild(postElement);
      });
  }

  loadPosts();

  postForm.addEventListener('submit', function (event) {
      event.preventDefault();

      const title = document.getElementById('post-title').value.trim();
      const description = document.getElementById('post-description').value.trim();
      const imageFile = document.getElementById('image-file').files[0];

      if (!title || !description) {
          alert('El título y la descripción son obligatorios.');
          return;
      }

      if (imageFile) {
          const reader = new FileReader();
          reader.onload = function (e) {
              const imageData = e.target.result;

              const postData = {
                  imagenData: imageData,
                  titulo: title,
                  descripcion: description,
              };

              savePostToLocalStorage(postData);
              sendPostToServer(postData);

              postForm.reset();
              loadPosts();
          };
          reader.readAsDataURL(imageFile);
      } else {
          alert('Por favor, selecciona una imagen.');
      }
  });

  function savePostToLocalStorage(post) {
      const posts = JSON.parse(localStorage.getItem('posts')) || [];
      posts.push(post);
      localStorage.setItem('posts', JSON.stringify(posts));
      console.log('Posts guardados en localStorage:', posts);
  }

  async function sendPostToServer(post) {
      try {
          const response = await fetch('http://localhost:5050/post', { // Asegúrate de que la URL sea correcta
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(post),
          });

          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          console.log('Post enviado al servidor:', data);
      } catch (error) {
          console.error('Error al enviar el post al servidor:', error);
      }
  }

  window.removePost = function (index) {
      const posts = JSON.parse(localStorage.getItem('posts')) || [];
      posts.splice(index, 1);
      localStorage.setItem('posts', JSON.stringify(posts));
      loadPosts();
  };
});
