
<p align="center">
  <img src="https://img.shields.io/badge/Java_21-ED8B00?style=for-the-badge&logo=java&logoColor=white" alt="Java 21"/>
  <img src="https://img.shields.io/badge/Spring_Boot_3-6DB33F?style=for-the-badge&logo=spring&logoColor=white" alt="Spring Boot 3"/>
  <img src="https://img.shields.io/badge/Angular_18-DD0031?style=for-the-badge&logo=angular&logoColor=white" alt="Angular 18"/>
  <img src="https://img.shields.io/badge/Groq_AI-10a37f?style=for-the-badge&logo=openai&logoColor=white" alt="Groq AI"/>
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT"/>
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker"/>
</p>

<h1 align="center">🏦 ClaimInsight</h1>
<p align="center"><strong>Sistema Inteligente de Gesti\u00f3n de Reclamos de Seguros</strong></p>
<p align="center">
  Java 21 + Spring Boot 3 + Angular 18 + Groq AI + Clean Architecture
</p>

---

## 📋 Tabla de Contenidos

- [Motivaci\u00f3n](#-motivaci\u00f3n)
- [Arquitectura](#-arquitectura)
- [Stack Tecnol\u00f3gico](#-stack-tecnol\u00f3gico)
- [Modelo de Datos](#-modelo-de-datos)
- [API REST](#-api-rest)
- [Inteligencia Artificial](#-inteligencia-artificial)
- [Seguridad](#-seguridad)
- [C\u00f3mo Ejecutar](#-c\u00f3mo-ejecutar)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Testing y CI/CD](#-testing-y-cicd)
- [Decisiones T\u00e9cnicas](#-decisiones-técnicas)
- [Mejoras Futuras](#-mejoras-futuras)
- [Entrevista: Q&A](#-entrevista-qa)

---

## 🎯 Motivaci\u00f3n

ClaimInsight nace como proyecto para demostrar habilidades full-stack aplicadas al **dominio de seguros**, con un enfoque en:

- **Arquitectura limpia y mantenible** (Hexagonal / Clean Architecture)
- **C\u00f3digo seguro** (JWT, Spring Security, BCrypt)
- **IA aplicada a un caso de uso real** (recomendaciones sobre reclamos v\u00eda Groq)
- **C\u00f3digo de producci\u00f3n** (Docker, CI/CD, perfiles de configuraci\u00f3n)

> *"El mejor c\u00f3digo es el que nunca escribiste."* — **Ponytail**

---

## 🏗️ Arquitectura

### Diagrama de Capas

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              FRONTEND (Angular 18)                          │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────┐  ┌─────────────────┐  │
│  │  Auth Module │  │ Claims Module│  │Dashboard Mod │  │  Shared Module  │  │
│  │ Login/Reg    │  │ List/Create  │  │  Estadisticas│  │  Layout + Nav   │  │
│  └──────┬──────┘  └──────┬───────┘  └──────┬───────┘  └────────┬────────┘  │
│         └────────────────┴─────────────────┴───────────────────┘            │
│                                    │ HTTP (JWT Bearer Token)                 │
├────────────────────────────────────┼────────────────────────────────────────┤
│                           BACKEND (Spring Boot 3)                           │
│                                                                             │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │                   APPLICATION LAYER (Casos de Uso)                    │   │
│  │  ┌─────────────────┐  ┌──────────────────┐  ┌──────────────────┐   │   │
│  │  │  AuthService    │  │  ClaimService    │  │  DashboardSvc    │   │   │
│  │  └────────┬────────┘  └────────┬─────────┘  └────────┬─────────┘   │   │
│  └───────────┼────────────────────┼──────────────────────┼─────────────┘   │
│              │                    │                      │                 │
│  ┌───────────┼────────────────────┼──────────────────────┼─────────────┐   │
│  │           ▼                    ▼                      ▼             │   │
│  │                    DOMAIN LAYER (Entidades + Puertos)                │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌────────────────────────┐   │   │
│  │  │  User        │  │  Claim       │  │  Ports (Inbound/Out)   │   │   │
│  │  │  Policy      │  │  Customer    │  │  UseCase Interfaces    │   │   │
│  │  │  Adjuster    │  │  Enums       │  │  Repository Interfaces │   │   │
│  │  └──────────────┘  └──────────────┘  └────────────────────────┘   │   │
│  └────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │                  INFRASTRUCTURE LAYER (Adaptadores)                   │   │
│  │                                                                       │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────┐ │   │
│  │  │    JPA / H2  │  │  JWT/Security│  │  Groq AI     │  │  REST    │ │   │
│  │  │  Repository  │  │  Filtros     │  │  Adaptador   │  │  Ctrl    │ │   │
│  │  │  Adapters    │  │  Config      │  │  Fallback    │  │          │ │   │
│  │  └──────────────┘  └──────────────┘  └──────────────┘  └──────────┘ │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Principios Aplicados

| Principio | C\u00f3mo se aplica |
|-----------|-------------------|
| **Clean / Hexagonal Architecture** | 3 capas: Domain (reglas de negocio puras), Application (casos de uso), Infrastructure (adaptadores) |
| **Dependency Inversion** | Domain define interfaces (ports), Infrastructure las implementa |
| **Separation of Concerns** | Cada clase tiene UNA responsabilidad |
| **YAGNI** | Solo lo necesario para funcionar, nada de sobreingenier\u00eda |
| **Fail Fast** | Validaciones tempranas, excepciones claras |
| **Principio Ponytail** | Stdlib > dependencias > c\u00f3digo propio. Una l\u00ednea > diez l\u00edneas |

---

## 🛠 Stack Tecnol\u00f3gico

| Capa | Tecnolog\u00eda | Versi\u00f3n | Prop\u00f3sito |
|------|---------------|-----------|-------------|
| **Lenguaje** | Java | 21 | LTS m\u00e1s reciente, records, pattern matching |
| **Framework Backend** | Spring Boot | 3.3.5 | IoC, REST, Data JPA, Security |
| **Frontend** | Angular | 18 | Standalone components, Signals |
| **UI** | Tailwind CSS | 3.4 | Utility-first, responsive |
| **Base de Datos** | H2 (dev) / PostgreSQL (prod) | - | In-memory para dev, robusta para producci\u00f3n |
| **Auth** | JWT (jjwt 0.12) | 0.12.6 | Tokens stateless con HMAC-SHA256 |
| **IA** | Groq API | LLaMA 3 70B | Recomendaciones gratuitas (OpenAI-compatible) |
| **Container** | Docker | - | Entorno reproducible |
| **CI/CD** | GitHub Actions | - | Build + Test autom\u00e1ticos |
| **Build** | Maven | - | Gesti\u00f3n de dependencias |

---

## 📊 Modelo de Datos

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│    User      │     │   Customer   │     │   Policy     │
├──────────────┤     ├──────────────┤     ├──────────────┤
│ id (PK)      │     │ id (PK)      │     │ id (PK)      │
│ email        │     │ name         │────>│ policyNumber │
│ password     │     │ email        │     │ type (enum)  │
│ name         │     │ phone        │     │ customerId   │
│ role (enum)  │     │ address      │     │ startDate    │
└──────────────┘     └──────────────┘     │ endDate      │
                                          │ premium      │
┌──────────────┐     ┌──────────────┐     └──────┬───────┘
│   Adjuster   │     │    Claim     │            │
├──────────────┤     ├──────────────┤            │
│ id (PK)      │     │ id (PK)      │            │
│ name         │<────│ adjusterId   │            │
│ specialty    │     │ claimNumber  │<───────────┘
│ email        │     │ policyId     │
└──────────────┘     │ customerId   │
                     │ type         │
                     │ description  │
                     │ amount       │
                     │ status (enum)│
                     │ createdAt    │
                     │ updatedAt    │
                     └──────────────┘
```

---

## 📡 API REST

### Autenticaci\u00f3n

```http
POST /api/auth/register
Content-Type: application/json

{ "name": "Juan P\u00e9rez", "email": "juan@example.com", "password": "123456" }

Response 200:
{ "token": "eyJhbGci...", "email": "juan@example.com", "name": "Juan P\u00e9rez" }
```

```http
POST /api/auth/login
Content-Type: application/json

{ "email": "juan@example.com", "password": "123456" }

Response 200:
{ "token": "eyJhbGci...", "email": "juan@example.com", "name": "Juan P\u00e9rez" }
```

### Reclamos

```http
GET /api/claims?status=OPEN&page=0&size=10
Authorization: Bearer <token>

Response 200:
[
  {
    "id": 1,
    "claimNumber": "CLM-A1B2C3D4",
    "type": "AUTO",
    "description": "Choque en Av. Rivadavia...",
    "amount": 15000.00,
    "status": "OPEN",
    "createdAt": "2024-06-16T14:00:00"
  }
]
```

```http
POST /api/claims
Authorization: Bearer <token>
Content-Type: application/json

{ "policyId": 1, "type": "AUTO", "description": "Descripci\u00f3n del siniestro", "amount": 25000.00 }
```

```http
GET /api/claims/{id}
Authorization: Bearer <token>
```

### Inteligencia Artificial

```http
GET /api/claims/{id}/recommendation
Authorization: Bearer <token>

Response 200:
{
  "claimId": 1,
  "recommendation": "{\"priority\":\"ALTA\",\"adjuster\":\"Ajustador AUTO\",\"days\":5,\"actions\":[\"Revisar documentacion\",\"Contactar asegurado\"],\"reasoning\":\"Recomendacion basada en analisis de reclamo...\"}"
}
```

### Dashboard

```http
GET /api/dashboard
Authorization: Bearer <token>

Response 200:
{ "total": 10, "open": 3, "inProgress": 4, "resolved": 2, "rejected": 1 }
```

---

## 🤖 Inteligencia Artificial

### C\u00f3mo funciona

El m\u00f3dulo de IA utiliza **Groq API** (gratuita, compatible con OpenAI) para analizar reclamos de seguro y generar recomendaciones autom\u00e1ticas.

```
┌──────────┐     ┌─────────────────────┐     ┌──────────┐
│ Reclamo  │────>│  GroqAiAdapter      │────>│  Groq    │
│ (Claim)  │     │  (Prompt Engineering)│     │  API     │
└──────────┘     └──────────┬──────────┘     └──────────┘
                            │
                   ┌────────▼────────┐
                   │  \u00bfRespuesta OK?  │
                   └────────┬────────┘
                     ┌──────┴──────┐
                     ▼              ▼
                ┌──────────┐  ┌──────────────┐
                │ JSON     │  │ Rule-based   │
                │ Groq     │  │ Fallback     │
                └──────────┘  └──────────────┘
```

### Prompt Engineering

El prompt est\u00e1 dise\u00f1ado para que el modelo act\u00fae como **ajustador de seguros senior**:

```
Eres un ajustador de seguros senior. Analiza este reclamo y responde SOLO JSON:
{
  "priority": "ALTA|MEDIA|BAJA",
  "adjuster": "especialidad del ajustador",
  "days": numero_estimado,
  "actions": ["accion1", "accion2"],
  "reasoning": "explicacion"
}
Tipo: AUTO | Descripcion: ... | Monto: $15000
```

### Fallback por Reglas de Negocio

Si la API de Groq no responde (timeout, error, l\u00edmite de rate), el sistema cae en reglas de negocio:

| Monto | Prioridad | D\u00edas estimados |
|-------|-----------|-------------------|
| > $10.000 | ALTA | 5 |
| $5.000 - $10.000 | MEDIA | 10 |
| < $5.000 | BAJA | 20 |

---

## 🔒 Seguridad

| Aspecto | Implementaci\u00f3n |
|---------|-------------------|
| **Autenticaci\u00f3n** | JWT (JSON Web Tokens) con HMAC-SHA256 |
| **Passwords** | BCrypt con Spring Security |
| **Stateless** | Sin sesiones, cada request lleva su token |
| **CORS** | Configurado s\u00f3lo para el origen del frontend |
| **Validaciones** | Jakarta Validation (@NotBlank, @Email, etc.) |

### Flujo de Autenticaci\u00f3n

```
Cliente                    Servidor
  │                          │
  │  POST /api/auth/login   │
  │  {email, password}      │
  │────────────────────────>│
  │                          │ Validar credenciales
  │                          │ Generar JWT
  │  {token, email, name}   │
  │<────────────────────────│
  │                          │
  │  GET /api/claims        │
  │  Authorization: Bearer  │
  │────────────────────────>│
  │                          │ Validar JWT (filtro)
  │                          │ Extraer usuario
  │                          │ Procesar request
  │  [...claims]            │
  │<────────────────────────│
```

---

## 🚀 C\u00f3mo Ejecutar

### Requisitos

| Herramienta | Versi\u00f3n | Instalaci\u00f3n |
|------------|-----------|----------------|
| Java JDK | 21+ | [Adoptium](https://adoptium.net/) |
| Maven | 3.9+ | `winget install Apache.Maven` |
| Node.js | 22+ | [nodejs.org](https://nodejs.org/) |
| Angular CLI | 18+ | `npm install -g @angular/cli` |
| Docker (opcional) | \u00faltima | [docker.com](https://docker.com/) |

### Local (Backend + Frontend)

```bash
# 1. Clonar el repo
git clone https://github.com/xhema99/claiminsight.git
cd claiminsight

# 2. Configurar API Key de Groq (gratis en https://console.groq.com)
# Windows:
set GROQ_API_KEY=gsk_tu_api_key_aqui
# Mac/Linux:
# export GROQ_API_KEY=gsk_tu_api_key_aqui

# 3. Backend (Terminal 1)
cd backend
mvn spring-boot:run
# API disponible en http://localhost:8080
# Consola H2: http://localhost:8080/h2-console

# 4. Frontend (Terminal 2)
cd frontend
npm install --legacy-peer-deps
ng serve
# App disponible en http://localhost:4200
```

### Docker

```bash
# Asegurate de tener la variable GROQ_API_KEY seteada
docker compose up --build
# Frontend: http://localhost:4200
# Backend: http://localhost:8080
```

### Seed Data

El proyecto incluye datos de prueba que se cargan autom\u00e1ticamente:

| Tipo | Datos |
|------|-------|
| **Clientes** | Juan P\u00e9rez, Mar\u00eda Garc\u00eda |
| **P\u00f3lizas** | AUTO (POL-001), HOME (POL-002), HEALTH (POL-003) |
| **Reclamos** | 3 reclamos en distintos estados (OPEN, IN_PROGRESS, RESOLVED) |
| **Usuario admin** | Registrate via `/api/auth/register` o cre\u00e1 uno desde la UI |

---

## 📁 Estructura del Proyecto

```
claiminsight/
├── backend/
│   ├── pom.xml
│   ├── Dockerfile
│   └── src/main/
│       ├── java/com/claiminsight/
│       │   ├── ClaimInsightApplication.java
│       │   ├── domain/                    # 🌐 CAPA DE DOMINIO
│       │   │   ├── model/                 # Entidades: User, Claim, Policy...
│       │   │   └── port/                  # Interfaces (puertos)
│       │   │       ├── inbound/           # Use cases
│       │   │       └── outbound/          # Repositorios, AI
│       │   ├── application/               # ⚙️ CAPA DE APLICACI\u00d3N
│       │   │   └── service/               # Implementaci\u00f3n de casos de uso
│       │   └── infrastructure/            # 🏗️ CAPA DE INFRAESTRUCTURA
│       │       ├── persistence/           # Adaptadores JPA
│       │       ├── security/              # JWT + Spring Security
│       │       ├── web/rest/              # Controladores REST
│       │       ├── ai/                    # Adaptador Groq AI
│       │       └── config/               # Configuraci\u00f3n CORS
│       └── resources/
│           ├── application.yml
│           └── data.sql                   # Seed data
├── frontend/
│   ├── package.json
│   ├── angular.json
│   ├── Dockerfile
│   └── src/app/
│       ├── core/                          # Servicios, guards, interceptors
│       ├── layouts/                       # Main layout con navbar
│       ├── shared/                        # Componentes compartidos
│       └── features/                      # M\u00f3dulos lazy-loaded
│           ├── auth/                      # Login + Register
│           ├── claims/                    # List, Create, Detail
│           └── dashboard/                 # Dashboard con estad\u00edsticas
├── docker-compose.yml
├── .github/workflows/                     # CI/CD
└── README.md
```

---

## 🔄 Testing y CI/CD

### GitHub Actions

```yaml
# Backend: cada push a main que toque backend/
on: push paths: ['backend/**']
jobs:
  - Setup JDK 21
  - mvn verify (compila + tests)

# Frontend: cada push a main que toque frontend/
on: push paths: ['frontend/**']
jobs:
  - Setup Node 22
  - npm ci && npm run build
```

### Pr\u00f3ximos pasos en testing

- [ ] Tests unitarios con JUnit 5 + Mockito (backend)
- [ ] Tests de integraci\u00f3n con Testcontainers
- [ ] Tests e2e con Playwright (frontend)
- [ ] Tests de seguridad (OWASP ZAP)

---

## 💡 Decisiones T\u00e9cnicas

| Decisi\u00f3n | Alternativa | Por qu\u00e9 esta opci\u00f3n |
|-------------|-----------|------------------------|
| **H2 en dev** | PostgreSQL | Cero configuraci\u00f3n, volcado r\u00e1pido. F\u00e1cil switchear a PostgreSQL en prod |
| **Groq en vez de OpenAI** | OpenAI, Spring AI | Groq es gratis + OpenAI-compatible. Spring AI agrega complejidad innecesaria |
| **Sin Lombok** | Lombok | Evita dependencias de preprocesamiento. Java moderno no lo necesita |
| **JWT sin refresh token** | Refresh + Access | Suficiente para MVP. Agregar refresh es trivial |
| **Standalone components** | NgModules | Angular 18 recomienda standalone. Menos boilerplate |
| **Signals** | NgRx, RxJS | Para el alcance del proyecto, Signals + servicios alcanza |
| **Monolito modular** | Microservicios | Un monolito bien dise\u00f1ado > microservicios mal hechos. F\u00e1cil de migrar |

---

## 🔮 Mejoras Futuras

- [ ] **PostgreSQL + Flyway** — migraciones reales para producci\u00f3n
- [ ] **Refresh tokens** — rotaci\u00f3n segura de tokens
- [ ] **Roles avanzados** — ADMIN/ADJUSTER con permisos granulares
- [ ] **WebSockets** — notificaciones en tiempo real de cambios de estado
- [ ] **Carga de archivos** — fotos, documentos de reclamos
- [ ] **Dashboard con gr\u00e1ficos** — Chart.js o D3 para visualizaciones
- [ ] **Rate limiting** — protecci\u00f3n contra abuso de API
- [ ] **Logging estructurado** — ELK stack para observabilidad
- [ ] **Internacionalizaci\u00f3n** — i18n para multi-idioma
- [ ] **Modo offline** — PWA con service workers

---

## 🎤 Entrevista: Q&A

### "\u00bfPor qu\u00e9 Clean Architecture en un proyecto chico?"

> *"Porque la arquitectura no se define por el tama\u00f1o del proyecto, sino por cu\u00e1nto va a vivir. ClaimInsight est\u00e1 pensado para escalar: hoy es un prototipo, ma\u00f1ana puede tener 50 endpoints y 10 desarrolladores. Si el dominio no depende de Spring, JPA ni la base de datos, cambiar cualquiera de esos no rompe el negocio."*

### "\u00bfC\u00f3mo funciona la IA?"

> *"Integramos Groq, que es una API gratuita y compatible con OpenAI. Cuando un ajustador pide una recomendaci\u00f3n, enviamos los datos del reclamo con un prompt dise\u00f1ado para que el modelo act\u00fae como un ajustador senior. La respuesta vuelve como JSON y se parsea. Si la API no responde, tenemos un fallback con reglas de negocio basadas en monto y tipo de reclamo."*

### "\u00bfQu\u00e9 har\u00edas diferente en producci\u00f3n?"

> *"Varias cosas: base de datos real con PostgreSQL y Flyway, logging con ELK, m\u00e9tricas con Micrometer + Prometheus, rate limiting en endpoints sensibles, tests de integraci\u00f3n con Testcontainers, y un dashboard m\u00e1s robusto con gr\u00e1ficos. Pero la estructura base (Clean Architecture, separaci\u00f3n de capas, puertos y adaptadores) se queda igual — eso es lo que hace que escalar sea posible."*

### "\u00bfPor qu\u00e9 Angular y no React?"

> *"Para una aseguradora, Angular tiene ventajas claras: ecosistema completo (HTTP client, router, forms), tipado fuerte con TypeScript nativo, y una estructura opinionada que facilita el trabajo en equipos grandes. En un contexto enterprise donde el equipo rota, tener convenciones claras es un feature, no un bug."*

### "\u00bfC\u00f3mo manejaste los errores?"

> *"Con excepciones claras en cada capa. El servicio lanza excepciones de negocio ('Reclamo no encontrado', 'P\u00f3liza no existe'), el controlador las captura y devuelve el HTTP status code adecuado. Despu\u00e9s, el frontend muestra el error al usuario de forma amigable. No hay errores silenciosos."*

---

## 📄 Licencia

MIT

---

<p align="center">
  Desarrollado con ❤️ para la entrevista en <strong>Generali</strong>
  <br>
  <a href="https://github.com/xhema99">@xhema99</a>
</p>
