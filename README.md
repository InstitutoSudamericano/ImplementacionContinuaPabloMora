# TindPablo API

![Main CD](https://github.com/InstitutoSudamericano/ImplementacionContinuaPabloMora/actions/workflows/main-cd.yml/badge.svg)
![Develop CI](https://github.com/InstitutoSudamericano/ImplementacionContinuaPabloMora/actions/workflows/develop-ci.yml/badge.svg)
![Feature CI](https://github.com/InstitutoSudamericano/ImplementacionContinuaPabloMora/actions/workflows/feature-ci.yml/badge.svg)

API REST de una app de citas construida con NestJS + Prisma + PostgreSQL.

## CI/CD - Implementación Continua

Este proyecto implementa **Git Flow** con **GitHub Actions** para CI/CD:

| Workflow | Rama | Disparador |
|---|---|---|
| Feature CI | `feature/*` | Push a cualquier rama feature |
| Develop CI | `develop` | Pull Request hacia develop |
| Main CD | `main` | Push/merge a main (deploy) |

## Instalación

```bash
npm install
```

## Base de datos

```bash
npm run prisma:generate
npm run db:push
npm run db:seed
```

## Ejecutar

```bash
npm run start:dev
```

- API: http://localhost:3000
- Swagger UI: http://localhost:3000/api
