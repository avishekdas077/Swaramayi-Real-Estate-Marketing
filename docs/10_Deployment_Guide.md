# Cloud Deployment Guide & DevOps Infrastructure
## Swaramayi Real Estate Marketing – Enterprise Real Estate Brokerage ERP, CRM & AI Business Operating System

---

## 1. Cloud Architecture Overview
The platform deploys on **AWS EC2 / ECS** behind an Elastic Load Balancer (ALB) with **AWS RDS PostgreSQL** multi-AZ instances, **ElastiCache Redis**, and **AWS S3** bucket storage for documents.

```
                  +-----------------------------------+
                  |   AWS ROUTE 53 (DNS / DOMAIN)     |
                  +-----------------+-----------------+
                                    |
                                    v
                  +-----------------------------------+
                  | AWS CLOUDFRONT / ELASTIC LOAD BAL |
                  +-----------------+-----------------+
                                    |
            +-----------------------+-----------------------+
            | (Public Subnet)                               | (Public Subnet)
            v                                               v
  +-------------------+                           +-------------------+
  | NGINX / Next.js   |                           | NGINX / Next.js   |
  | Frontend Node #1  |                           | Frontend Node #2  |
  +---------+---------+                           +---------+---------+
            |                                               |
            +-----------------------+-----------------------+
                                    |
            +-----------------------+-----------------------+
            | (Private Subnet)                              | (Private Subnet)
            v                                               v
  +-------------------+                           +-------------------+
  | Django DRF        |                           | Django DRF        |
  | Backend Node #1   |                           | Backend Node #2   |
  +---------+---------+                           +---------+---------+
            |                                               |
            +-----------------------+-----------------------+
                                    |
            +-----------------------+-----------------------+
            v                                               v
  +-------------------+                           +-------------------+
  | AWS RDS PostgreSQL|                           | AWS ELASTICACHE   |
  | (Primary DB)      |                           | REDIS             |
  +-------------------+                           +-------------------+
```

---

## 2. Docker & Container Orchestration

### `docker-compose.yml` Structure
```yaml
version: '3.8'

services:
  db:
    image: postgres:16-alpine
    container_name: swaramayi_db
    environment:
      POSTGRES_DB: swaramayi_crm
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  redis:
    image: redis:7-alpine
    container_name: swaramayi_redis
    ports:
      - "6379:6379"

  backend:
    build: ./backend
    container_name: swaramayi_backend
    command: gunicorn config.wsgi:application --bind 0.0.0.0:8000 --workers 4
    volumes:
      - ./backend:/app
    environment:
      - DATABASE_URL=postgres://postgres:${DB_PASSWORD}@db:5432/swaramayi_crm
      - REDIS_URL=redis://redis:6379/0
    depends_on:
      - db
      - redis
    ports:
      - "8000:8000"

  celery_worker:
    build: ./backend
    container_name: swaramayi_celery
    command: celery -A config worker -l info
    depends_on:
      - backend
      - redis

  frontend:
    build: ./frontend
    container_name: swaramayi_frontend
    command: npm start
    ports:
      - "3000:3000"
    depends_on:
      - backend

volumes:
  postgres_data:
```

---

## 3. GitHub Actions CI/CD Pipeline
- `.github/workflows/deploy.yml`: Automated testing, Docker image build, push to AWS ECR, and zero-downtime deployment to AWS ECS on `main` branch push.
