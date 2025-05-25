# CRUD Frontend - Codesa 

Este proyecto es la interfaz web desarrollada en **Angular** para gestionar estudiantes, profesores y personas. Se conecta a un backend Spring Boot mediante API REST.

## 🌐 Tecnologías utilizadas

- Angular 19+
- Standalone Components
- Formulario reactivo
- MatTable + MatPaginator
- SweetAlert2 (mensajes visuales)
- Http Interceptor para manejo global de errores

## 🚀 ¿Cómo ejecutar el proyecto?

### 1. Clona el repositorio

```bash
git clone https://github.com/santiagoafl/crud-frontend-codesa.git
```

### 2. Instala dependencias

```bash
npm install
```

### 3. Ejecuta el proyecto

```bash
ng serve
```

La aplicación estará disponible en:  
'http://localhost:4200/'

---

## 📄 Funcionalidades implementadas

- ✅ Listado de estudiantes y profesores con paginación
- ✅ Formularios para crear y editar registros
- ✅ Confirmación y eliminación con SweetAlert2
- ✅ Validaciones de formularios (fechas, campos numéricos, email)
- ✅ Vista de personas combinando estudiantes y profesores
- ✅ Manejador global de errores HTTP con alertas visuales

---

## 📂 Estructura del proyecto

```
├── core/
│   ├── models/
│   ├── services/
├── features/
│   ├── estudiantes/
│   ├── profesores/
│   ├── personas/
├── shared/
```

---

## 😎 Autor

Desarrollado por Santiago Angulo. Proyecto Angular para  la prueba técnica Codesa, "Sistema de Registro Escolar".
