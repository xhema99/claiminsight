# ClaimInsight — Sistema Inteligente de Gesti\u00f3n de Reclamos

Proyecto full-stack para el \u00e1rea de seguros: gesti\u00f3n de reclamos con recomendaciones impulsadas por IA.

**Stack**: Java 21 + Spring Boot 3 + Angular 18 + Groq AI

---

## Arquitectura (Hexagonal / Clean Architecture)

```
                     ┌──────────────────────────────────────┐
                     │         Angular 18 (Frontend)        │
                     │   Tailwind CSS   |   Signals API     │
                     └──────────────┬───────────────────────┘
                                    │ HTTP (JWT)
┌───────────────────────────────────┼───────────────────────────┐
│                     ┌─────────────┴─────────────┐            │
│                     │     REST Controllers      │            │
│                     │  (infrastructure/web/rest)│            │
│                     └─────────────┬─────────────┘            │
│                                   │                          │
│                     ┌─────────────┴─────────────┐            │
│                     │   Application Services    │            │
│                     │    (application/service)  │            │
│                     └─────────────┬─────────────┘            │
│                                   │                          │
│                     ┌─────────────┴─────────────┐            │
│                     │   Domain (domain/model)   │            │
│                     │  Entidades + Puertos      │            │
│                     └─────────────┬─────────────┘            │
│                                   │                          │
│        ┌──────────────────────────┼──────────────────┐       │
│        v                          v                  v       │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────┐ │
│  │   JPA    │  │ Security │  │   AI     │  │     CORS     │ │
│  │  (H2/DB) │  │  (JWT)   │  │ (Groq)   │  │              │ │
│  └──────────┘  └──────────┘  └──────────┘  └──────────────┘ │
│             Infrastructure Adapters                          │
└──────────────────────────────────────────────────────────────┘
```

### Por qu\u00e9 Clean Architecture (respond\u00e9 esto en la entrevista)

- **Domain** no sabe de Spring, JPA ni nada externo
- **Application** orquesta casos de uso sin acoplarse a frameworks
- **Infrastructure** son adaptadores intercambiables (H2 para dev, PostgreSQL para prod, Groq o cualquier AI)
- Testeable: cada capa se prueba de forma aislada

---

## API REST

| Endpoint                | M\u00e9todo | Auth     | Descripci\u00f3n                     |
|-------------------------|-----------|----------|-------------------------------------|
| `/api/auth/register`    | POST      | No       | Registrar nuevo usuario             |
| `/api/auth/login`       | POST      | No       | Iniciar sesi\u00f3n (JWT)           |
| `/api/claims`           | GET       | JWT      | Listar reclamos (paginado)          |
| `/api/claims`           | POST      | JWT      | Crear reclamo                       |
| `/api/claims/{id}`      | GET       | JWT      | Detalle del reclamo                 |
| `/api/claims/{id}/recommendation` | GET | JWT    | Recomendaci\u00f3n con IA (Groq)    |
| `/api/dashboard`        | GET       | JWT      | Estad\u00edsticas del dashboard      |

---

## Inteligencia Artificial

Usa **Groq API** (gratis, compatible con OpenAI, modelos LLaMA 3 70B) para analizar reclamos.

**Qu\u00e9 hace**:
1. Toma tipo, descripci\u00f3n y monto del reclamo
2. Env\u00eda prompt a Groq con contexto de ajustador de seguros
3. Devuelve prioridad, especialidad recomendada y acciones sugeridas

**Fallback**: si la API no responde, usa reglas de negocio (por monto y tipo).

---

## C\u00f3mo ejecutar

### Requisitos
- Java 21+
- Maven
- Node.js 22+
- Angular CLI (`npm install -g @angular/cli`)
- Groq API Key (gratis en https://console.groq.com)

### Local
```bash
# Terminal 1: Backend
cd backend
mvn spring-boot:run

# Terminal 2: Frontend
cd frontend
npm install --legacy-peer-deps
ng serve
```

Abr\u00ed http://localhost:4200

### Docker
```bash
export GROQ_API_KEY=tu_api_key
docker compose up --build
```

---

## Entrevista: posibles preguntas y respuestas

### "\u00bfPor qu\u00e9 Clean Architecture?"
Separamos dominio de infraestructura. El core del negocio (reglas de reclamos) no depende de Spring, JPA ni la base de datos. Si ma\u00f1ana cambiamos de H2 a PostgreSQL o de REST a GraphQL, el dominio no se toca.

### "\u00bfC\u00f3mo funciona la IA?"
Integramos Groq (LLaMA 3 70B v\u00eda API REST). Enviamos datos del reclamo con un prompt dise\u00f1ado para que act\u00fae como ajustador senior. La respuesta se parsea como JSON. Si la API falla, hay un fallback con reglas de negocio.

### "\u00bfQu\u00e9 har\u00edas diferente en producci\u00f3n?"
- Base de datos real (PostgreSQL) con Flyway migraciones
- Logging estructurado (ELK)
- M\u00e9tricas con Micrometer + Prometheus
- Rate limiting en la API de IA
- Tests de integraci\u00f3n con Testcontainers

---

## Tecnolog\u00edas

| Capa        | Tecnolog\u00eda                            |
|------------|-------------------------------------------|
| Backend     | Java 21, Spring Boot 3, Spring Security   |
| Frontend    | Angular 18, Tailwind CSS                  |
| IA          | Groq API (LLaMA 3 70B)                    |
| Base datos  | H2 (dev) / PostgreSQL (prod)             |
| Auth        | JWT (jjwt 0.12)                           |
| Build       | Maven, npm                                |
| CI/CD       | GitHub Actions                            |
| Contenedores| Docker + Docker Compose                   |
