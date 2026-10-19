# Sistema Backend de Turnos y Reservas (API REST con MongoDB y Mongoose)

Backend para la gestión integral de servicios y reservas de turnos, desarrollado sobre Node.js y Express con persistencia en MongoDB mediante Mongoose. El sistema implementa una arquitectura por capas (Router, Controller, Service, DAO, Repository), paginación y filtros avanzados con `mongoose-paginate-v2`, relaciones mediante referencias (`ObjectId`) y `populate`, además de validación de esquemas con Zod y comunicación en tiempo real con Socket.io.

---

## Estructura del Proyecto

El proyecto está diseñado bajo una arquitectura en capas, separando responsabilidades entre ruteo, control HTTP, lógica de negocio, abstracción de datos y persistencia:

```text
src/
├── config/
│   ├── db.config.js          # Conexión a la base de datos (MongoDB / Mongoose)
│   └── env.config.js         # Variables de entorno y configuración general
├── controllers/
│   ├── bookings.controller.js # Controladores para reservas
│   ├── services.controller.js # Controladores para servicios (paginación, filtros)
│   └── views.controller.js    # Controladores para vistas Handlebars
├── dao/
│   ├── bookings.dao.js       # Data Access Object de reservas
│   ├── messages.dao.js       # Data Access Object de mensajes
│   └── services.dao.js       # Data Access Object de servicios
├── middlewares/
│   └── validate.js           # Middleware de validación de esquemas (Zod)
├── models/
│   ├── booking.models.js     # Modelo Mongoose de reservas (referencias y populate)
│   ├── message.models.js     # Modelo Mongoose de mensajes
│   └── service.models.js     # Modelo Mongoose de servicios (plugin de paginación)
├── public/
│   ├── css/
│   │   └── styles.css        # Estilos para vistas Handlebars
│   └── js/
│       └── socket.js         # Cliente Socket.io para tiempo real
├── repositories/
│   ├── bookings.repository.js # Abstracción de acceso a datos de reservas
│   └── services.repository.js # Abstracción de acceso a datos de servicios
├── routes/
│   ├── bookings.router.js    # Rutas para el recurso /api/bookings
│   ├── services.router.js    # Rutas para el recurso /api/services
│   └── views.router.js       # Rutas para renderizado de vistas
├── services/
│   ├── bookings.service.js   # Lógica de negocio de reservas
│   └── services.service.js   # Lógica de negocio de servicios
├── validations/
│   ├── bookings.validation.js # Esquemas Zod para reservas
│   └── services.validation.js # Esquemas Zod para servicios
├── views/
│   ├── layouts/
│   │   └── main.handlebars   # Layout principal
│   ├── availability.handlebars
│   └── services.handlebars
├── app.js                    # Configuración de Express, middlewares y routers
└── server.js                 # Inicialización del servidor HTTP y Socket.io
```
---

## Arquitectura por Capas

1. **Routes (`src/routes/`)**: Define las rutas y asocia cada endpoint HTTP con sus respectivos middlewares de validación y controladores.
2. **Middlewares (`src/middlewares/`)**: Intercepta y valida de forma síncrona el cuerpo de las peticiones mediante esquemas de Zod antes de alcanzar los controladores.
3. **Controllers (`src/controllers/`)**: Maneja el ciclo de solicitud y respuesta (`req`, `res`), parsea parámetros de consulta (`query params`), gestiona códigos de estado HTTP y estructura las respuestas estandarizadas (incluyendo metadatos de paginación).
4. **Services (`src/services/`)**: Centraliza las reglas y la lógica de negocio del sistema.
5. **Repositories (`src/repositories/`)**: Abstrae las operaciones de acceso a datos de la capa de negocio, ofreciendo una interfaz desacoplada.
6. **DAOs (`src/dao/`)**: Gestiona las operaciones directas de persistencia sobre MongoDB interactuando con los modelos de Mongoose, ejecutando consultas paginadas (`paginate`) y relaciones con `populate`.

---

## ⚙️ Requisitos e Instalación

1. Clonar el repositorio:

```bash
git clone <URL_DE_TU_REPOSITORIO>
cd <NOMBRE_DEL_PROYECTO>
```

---

2. Instalar dependencias:

```bash
npm install
```

---

3. Variables de entorno: Crear un archivo `.env` en la raíz tomando como base `.env.example`:

```env
PORT=8080
MONGO_URI=mongodb+srv://<usuario>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
```

---

4. Iniciar el servidor:

Modo desarrollo:
```bash
npm run dev
```

Modo producción:
```bash
npm start
```

---

## 📌 Endpoints de la API

### 1. Servicios (`/api/services`)

| Método | Endpoint | Descripción | Respuestas HTTP |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/services` | Lista servicios con paginación, filtros y ordenamiento. Parámetros opcionales: `?limit=`, `?page=`, `?sort=asc\|desc`, `?query=` | `200`, `500` |
| **GET** | `/api/services/:sid` | Obtiene un servicio específico por su `ObjectId` de MongoDB | `200`, `404`, `500` |
| **POST** | `/api/services` | Valida con Zod y persiste un nuevo servicio en MongoDB | `201`, `400`, `500` |
| **PUT** | `/api/services/:sid` | Valida con Zod y actualiza las propiedades de un servicio existente | `200`, `400`, `404`, `500` |
| **DELETE** | `/api/services/:sid` | Elimina un servicio de la base de datos por su `ObjectId` | `200`, `404`, `500` |

**Cuerpo de solicitud (POST y PUT de servicio):**

```json
{
  "name": "Corte y peinado",
  "description": "Servicio de peluquería completo",
  "duration": 45,
  "price": 8500,
  "category": "Peluquería",
  "available": true
}
```

**Estructura de respuesta de paginación (`GET /api/services`):**

```json
{
  "status": "success",
  "payload": [
    {
      "_id": "67123abc456def7890123456",
      "name": "Corte y peinado",
      "description": "Servicio de peluquería completo",
      "duration": 45,
      "price": 8500,
      "category": "Peluquería",
      "available": true
    }
  ],
  "totalPages": 5,
  "prevPage": null,
  "nextPage": 2,
  "page": 1,
  "hasPrevPage": false,
  "hasNextPage": true,
  "prevLink": null,
  "nextLink": "/api/services?page=2&limit=10"
}
```
---

### Parámetros de Consulta para Servicios (`GET /api/services`)

* **`limit`** *(opcional, default: 10)*: Cantidad máxima de registros por página.
* **`page`** *(opcional, default: 1)*: Número de página a consultar.
* **`sort`** *(opcional)*: Ordenamiento por precio. Valores admitidos: `asc` (ascendente) o `desc` (descendente).
* **`query`** *(opcional)*: Filtro por categoría o disponibilidad. Permite buscar servicios coincidentes con una categoría específica o filtrar por estado activo/inactivo.

---

### 2. Reservas (`/api/bookings`)

| Método | Endpoint | Descripción | Respuestas HTTP |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/bookings` | Valida con Zod y registra una nueva reserva inicializada con `services: []` y estado `pending` | `201`, `400`, `500` |
| **GET** | `/api/bookings/:bid` | Obtiene una reserva por su `ObjectId` con los servicios asociados resueltos mediante `populate` | `200`, `404`, `500` |
| **POST** | `/api/bookings/:bid/services/:sid` | Agrega un servicio a la reserva o incrementa su cantidad si ya formaba parte de ella | `200`, `400`, `404`, `500` |

---

**Cuerpo de solicitud (`POST /api/bookings`):**

```json
{
  "clientName": "Juan Pérez",
  "clientEmail": "juan.perez@example.com",
  "date": "2026-11-01T10:00:00.000Z",
  "time": "14:30",
  "status": "pending"
}
```

---

**Estructura del objeto de reserva persistido con `populate` (`GET /api/bookings/:bid`):**

```json
{
  "status": "success",
  "payload": {
    "_id": "67123abc456def7890123450",
    "clientName": "Juan Pérez",
    "clientEmail": "juan.perez@example.com",
    "date": "2026-11-01T10:00:00.000Z",
    "time": "14:30",
    "status": "pending",
    "services": [
      {
        "service": {
          "_id": "67123abc456def7890123456",
          "name": "Corte y peinado",
          "description": "Servicio de peluquería completo",
          "duration": 45,
          "price": 8500,
          "category": "Peluquería",
          "available": true
        },
        "quantity": 2,
        "_id": "67123abc456def7890123459"
      }
    ],
    "createdAt": "2026-10-19T20:00:00.000Z",
    "updatedAt": "2026-10-19T20:05:00.000Z"
  }
}
```

---

## 💾 Persistencia de Datos

La información se gestiona de manera centralizada en una base de datos **MongoDB** a través de modelos definidos con **Mongoose**:

* **Colección `services` (`service.models.js`)**: Almacena el catálogo de servicios ofrecidos. Incorpora el plugin `mongoose-paginate-v2` para soportar consultas paginadas, filtros por categoría o disponibilidad y ordenamientos dinámicos por precio.
* **Colección `bookings` (`booking.models.js`)**: Gestiona las reservas de turnos. Los servicios vinculados se almacenan como referencias (`ObjectId`) apuntando a la colección `services`, permitiendo recuperar la información completa del servicio en las consultas mediante `populate`.

---

## 🛡️ Validación de Datos (Zod)
El middleware `validate` intercepta las peticiones `POST` y `PUT` antes de los controladores. Si los datos no cumplen con el esquema definido en `src/validations/`, la API responde con código HTTP `400` y un detalle estructurado de los errores:
```json
{
  "status": "error",
  "message": "Datos de entrada inválidos",
  "errors": [
    {
      "field": "price",
      "message": "El precio debe ser un número positivo"
    },
    {
      "field": "clientEmail",
      "message": "Formato de correo electrónico inválido"
    }
  ]
}
```