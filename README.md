# Nos Ayudamos San Juan

Plataforma digital que conecta sanjuaninos con profesionales locales confiables. Una solución completa para encontrar y ofrecer servicios sin intermediarios.

## 🚀 Características

- **Directorio de Servicios**: Profesionales pueden publicar sus servicios
- **Búsqueda Avanzada**: Filtros por categoría, ubicación y precio
- **Contacto Directo**: Llamadas y WhatsApp sin intermediarios
- **Sistema de Reseñas**: Calificaciones y comentarios verificados
- **Responsive Design**: Optimizado para móviles y desktop
- **Base de Datos Robusta**: PostgreSQL con Prisma ORM

## 🛠️ Tecnologías

### Frontend
- **React 18** con TypeScript
- **Vite** para desarrollo rápido
- **Tailwind CSS** para estilos
- **Lucide React** para iconos

### Backend
- **Node.js** con Express
- **TypeScript** para tipado estático
- **Prisma ORM** para base de datos
- **PostgreSQL** como base de datos
- **JWT** para autenticación

## 📦 Instalación

### Prerrequisitos
- Node.js 18+ 
- PostgreSQL 14+
- npm o yarn

### 1. Clonar el repositorio
```bash
git clone <tu-repo>
cd nos-ayudamos-san-juan
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar base de datos

1. Crear base de datos PostgreSQL:
```sql
CREATE DATABASE nos_ayudamos_san_juan;
```

2. Copiar variables de entorno:
```bash
cp env.example .env
```

3. Editar `.env` con tus credenciales:
```env
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/nos_ayudamos_san_juan"
JWT_SECRET="tu-clave-secreta-muy-segura"
```

### 4. Configurar Prisma
```bash
# Generar cliente Prisma
npm run db:generate

# Aplicar migraciones
npm run db:migrate

# (Opcional) Abrir Prisma Studio
npm run db:studio
```

## 🚀 Desarrollo

### Ejecutar en modo desarrollo
```bash
# Ejecuta frontend y backend simultáneamente
npm run dev

# O ejecutar por separado:
npm run dev:client  # Frontend en http://localhost:5173
npm run dev:server  # Backend en http://localhost:3001
```

### Comandos disponibles

```bash
# Desarrollo
npm run dev              # Frontend + Backend
npm run dev:client       # Solo frontend
npm run dev:server       # Solo backend

# Construcción
npm run build           # Build completo
npm run build:client    # Build frontend
npm run build:server    # Build backend

# Base de datos
npm run db:generate     # Generar cliente Prisma
npm run db:push         # Sincronizar esquema
npm run db:migrate      # Aplicar migraciones
npm run db:studio       # Abrir Prisma Studio

# Linting
npm run lint            # Verificar código
```

## 📁 Estructura del Proyecto

```
nos-ayudamos-san-juan/
├── src/                    # Frontend React
│   ├── components/         # Componentes reutilizables
│   ├── data/              # Datos estáticos
│   ├── types/             # Tipos TypeScript
│   ├── utils/             # Utilidades
│   └── App.tsx            # Componente principal
├── server/                # Backend Node.js
│   ├── src/
│   │   └── index.ts       # Servidor Express
│   └── tsconfig.json      # Config TypeScript backend
├── prisma/                # Base de datos
│   └── schema.prisma      # Esquema de BD
├── public/                # Archivos estáticos
└── package.json           # Dependencias
```

## 🎯 Funcionalidades Principales

### Para Profesionales
- ✅ Publicar servicios con fotos y detalles
- ✅ Gestionar horarios y zonas de cobertura
- ✅ Recibir contactos directos (llamadas/WhatsApp)
- ✅ Mostrar portfolio y reseñas
- ✅ Verificación de cuenta

### Para Clientes
- ✅ Buscar servicios por categoría y ubicación
- ✅ Ver perfiles detallados de profesionales
- ✅ Contactar directamente vía teléfono/WhatsApp
- ✅ Dejar reseñas y calificaciones
- ✅ Filtros avanzados de búsqueda

## 🗄️ Base de Datos

### Modelos Principales
- **User**: Usuarios (clientes y proveedores)
- **Service**: Servicios ofrecidos
- **Category**: Categorías de servicios
- **Review**: Reseñas y calificaciones
- **Portfolio**: Trabajos realizados
- **ContactLog**: Registro de contactos

### Diagrama de Relaciones
Ver diagrama ER en la documentación del código.

## 🔧 API Endpoints

### Servicios
- `GET /api/services` - Listar servicios con filtros
- `GET /api/services/:id` - Obtener servicio específico
- `POST /api/services` - Crear nuevo servicio
- `PUT /api/services/:id` - Actualizar servicio
- `DELETE /api/services/:id` - Eliminar servicio

### Categorías
- `GET /api/categories` - Listar categorías

### Contactos
- `POST /api/contact-log` - Registrar contacto

## 🎨 Diseño y UX

- **Colores**: Esquema amarillo/ámbar que refleja la identidad sanjuanina
- **Responsive**: Diseño mobile-first
- **Accesibilidad**: Contraste adecuado y navegación por teclado
- **Performance**: Imágenes optimizadas y carga lazy

## 🚀 Despliegue

### Frontend (Vercel/Netlify)
```bash
npm run build:client
# Desplegar carpeta dist/
```

### Backend (Railway/Heroku)
```bash
npm run build:server
# Configurar variables de entorno en producción
```

### Base de Datos
- Usar PostgreSQL en la nube (Railway, Supabase, etc.)
- Configurar `DATABASE_URL` en producción

## 🤝 Contribuir

1. Fork del proyecto
2. Crear rama para feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📝 Licencia

Este proyecto está bajo la licencia MIT. Ver `LICENSE` para más detalles.

## 📞 Contacto

**Nos Ayudamos San Juan**
- Email: info@nosayudamossj.com
- Teléfono: 264-XXX-XXXX
- Ubicación: San Juan, Argentina

---

*Conectando nuestra provincia con confianza* 🤝
