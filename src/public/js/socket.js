const socket = io();

const form = document.getElementById('create-service-form');
const servicesList = document.getElementById('services-list');
const emptyServices = document.getElementById('empty-services');

const renderServiceCard = (service) => {
  const card = document.createElement('article');
  card.className = 'service-card';
  card.id = `service-${service._id}`;

  card.innerHTML = `
    <h3>${service.name}</h3>
    <p><strong>Descripción:</strong> ${service.description}</p>
    <p><strong>Categoría:</strong> ${service.category}</p>
    <p><strong>Duración:</strong> ${service.duration} min</p>
    <p><strong>Precio:</strong> $${service.price}</p>
    <p><strong>Estado:</strong> ${service.isAvailable ? 'Disponible' : 'No disponible'}</p>
  `;

  return card;
};

socket.on('serviceCreated', (newService) => {
  if (emptyServices) {
    emptyServices.remove();
  }
  const card = renderServiceCard(newService);
  servicesList.prepend(card);
});

socket.on('serviceError', (data) => {
  alert(`Error al guardar el servicio: ${data.message}`);
});

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const serviceData = {
      name: formData.get('name'),
      description: formData.get('description'),
      duration: Number(formData.get('duration')),
      price: Number(formData.get('price')),
      category: formData.get('category'),
    };

    socket.emit('newService', serviceData);
    form.reset();
  });
}
