# Guía de Desarrollo - Nos Ayudamos San Juan

## 🚀 Configuración Inicial

### 1. Instalar Dependencias
```bash
npm install
```

### 2. Configurar Variables de Entorno

Crear archivo `.env` en la raíz del proyecto:
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/nos_ayudamos_san_juan"

# JWT
JWT_SECRET="tu-clave-secreta-super-segura-aqui"
JWT_EXPIRES_IN="7d"

# Server
PORT=3001
NODE_ENV="development"

# Frontend URL (para CORS)
FRONTEND_URL="http://localhost:5173"

# File Upload
UPLOAD_DIR="uploads"
MAX_FILE_SIZE="5242880"
```

### 3. Configurar Base de Datos PostgreSQL

```bash
# Crear base de datos
createdb nos_ayudamos_san_juan

# Generar cliente Prisma
npm run db:generate

# Aplicar migraciones
npm run db:migrate

# Poblar con datos de ejemplo
npm run db:seed
```

## 🏃‍♂️ Ejecutar en Desarrollo

```bash
# Ejecutar frontend y backend simultáneamente
npm run dev

# O ejecutar por separado:
npm run dev:client    # Frontend en puerto 5173
npm run dev:server    # Backend en puerto 3001
```

## 📊 Base de Datos

### Abrir Prisma Studio
```bash
npm run db:studio
```

### Resetear y Poblar Datos
```bash
npm run db:push --force-reset
npm run db:seed
```

## 🧪 Usuarios de Prueba

Después del seed, puedes usar estos usuarios:

### Proveedores
- **Ana Martínez (Plomería)**: `ana.martinez@email.com` / `123456`
- **Roberto González (Limpieza)**: `roberto.gonzalez@email.com` / `123456`
- **Laura Silva (Electricidad)**: `laura.silva@email.com` / `123456`
- **Sofía Herrera (Belleza)**: `sofia.herrera@email.com` / `123456`
- **Miguel Torres (Pintura)**: `miguel.torres@email.com` / `123456`
- **Carmen López (Jardinería)**: `carmen.lopez@email.com` / `123456`

### Cliente
- **Juan Cliente**: `cliente@email.com` / `123456`

## 🔑 API Endpoints

### Autenticación
- `POST /api/auth/register` - Registro
- `POST /api/auth/login` - Login
- `GET /api/auth/profile` - Perfil actual
- `PUT /api/auth/profile` - Actualizar perfil
- `PUT /api/auth/change-password` - Cambiar contraseña

### Servicios
- `GET /api/services` - Listar servicios (con filtros)
- `GET /api/services/:id` - Obtener servicio específico
- `POST /api/services` - Crear servicio (auth)
- `PUT /api/services/:id` - Actualizar servicio (auth)
- `DELETE /api/services/:id` - Eliminar servicio (auth)
- `GET /api/services/my/services` - Mis servicios (auth)

### Reseñas
- `POST /api/reviews` - Crear reseña (auth)
- `GET /api/reviews/service/:serviceId` - Reseñas de servicio
- `GET /api/reviews/provider/:providerId` - Reseñas de proveedor
- `PUT /api/reviews/:id` - Actualizar reseña (auth)
- `DELETE /api/reviews/:id` - Eliminar reseña (auth)
- `GET /api/reviews/stats/service/:serviceId` - Estadísticas

### Archivos
- `POST /api/upload/images` - Subir múltiples imágenes (auth)
- `POST /api/upload/profile-image` - Subir imagen de perfil (auth)
- `DELETE /api/upload/files/:filename` - Eliminar archivo (auth)
- `GET /api/upload/files/:filename` - Servir archivo
- `GET /api/upload/files/:filename/info` - Info de archivo

### Otros
- `GET /api/categories` - Listar categorías
- `POST /api/contact-log` - Registrar contacto
- `GET /api/health` - Health check

## 🎨 Estructura Frontend

```
src/
├── components/
│   ├── Auth/
│   │   ├── LoginModal.tsx
│   │   └── RegisterModal.tsx
│   └── ...
├── contexts/
│   └── AuthContext.tsx
├── data/
│   ├── categories.ts
│   └── services.ts
├── types/
│   └── index.ts
├── utils/
└── App.tsx
```

## 🗄️ Estructura Backend

```
server/
├── src/
│   ├── middleware/
│   │   ├── auth.ts
│   │   └── upload.ts
│   ├── routes/
│   │   ├── auth.ts
│   │   ├── services.ts
│   │   ├── reviews.ts
│   │   └── upload.ts
│   └── index.ts
└── tsconfig.json
```

## 🔧 Funcionalidades Implementadas

### ✅ Backend Completo
- [x] Sistema de autenticación JWT
- [x] CRUD completo de servicios
- [x] Sistema de reseñas y calificaciones
- [x] Subida de archivos/imágenes
- [x] Filtros avanzados de búsqueda
- [x] Middleware de autenticación
- [x] Validaciones y manejo de errores
- [x] Base de datos con Prisma ORM

### ✅ Frontend Base
- [x] Interfaz principal con servicios
- [x] Sistema de categorías
- [x] Búsqueda y filtros
- [x] Integración WhatsApp
- [x] Diseño responsive
- [x] Contexto de autenticación
- [x] Modales de login/registro

### 🚧 Por Implementar
- [ ] Dashboard de proveedores
- [ ] Gestión completa de servicios desde frontend
- [ ] Sistema de reseñas en frontend
- [ ] Subida de imágenes en frontend
- [ ] Perfil de usuario
- [ ] Notificaciones
- [ ] Sistema de favoritos

## 📱 Características Técnicas

- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS
- **Backend**: Node.js + Express + TypeScript
- **Base de Datos**: PostgreSQL + Prisma ORM
- **Autenticación**: JWT
- **Subida de Archivos**: Multer
- **Validación**: Zod (backend)
- **Iconos**: Lucide React

## 🎯 Flujo de Usuario

1. **Visitante** ve servicios y puede contactar directamente
2. **Cliente** se registra para dejar reseñas
3. **Proveedor** se registra y publica servicios
4. **Sistema** conecta clientes con proveedores vía WhatsApp/teléfono
5. **Cliente** deja reseña después del servicio

## 🔄 Próximos Pasos

1. Implementar dashboard de proveedores
2. Completar sistema de reseñas en frontend
3. Agregar gestión de imágenes
4. Implementar notificaciones por email
5. Agregar sistema de favoritos
6. Optimizar para SEO
7. Agregar tests unitarios e integración

## 🐛 Debugging

### Logs Útiles
```bash
# Logs del servidor
npm run dev:server

# Ver base de datos
npm run db:studio

# Revisar migraciones
npx prisma db push --preview-feature
```

### Problemas Comunes

1. **Error de conexión a BD**: Verificar `DATABASE_URL`
2. **CORS errors**: Verificar `FRONTEND_URL` en .env
3. **JWT errors**: Verificar `JWT_SECRET`
4. **Archivos no suben**: Verificar permisos de directorio `uploads/`

---

¡Happy coding! 🚀
