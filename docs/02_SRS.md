# Software Requirement Specification (SRS)
## Swaramayi Real Estate Marketing – Enterprise Real Estate Brokerage ERP, CRM & AI Business Operating System

---

## 1. Introduction

### 1.1 Purpose
This Software Requirement Specification (SRS) defines the overall software architecture, functional capabilities, non-functional performance guarantees, security standards, and external system integrations for the **Swaramayi Real Estate Marketing Platform**.

### 1.2 System Scope
The system comprises a Django REST Framework backend core, PostgreSQL relational database, Next.js web application (Admin, Customer, Builder, and HRMS Portals), Redis caching layer, Celery asynchronous queue, and an AI Business Operating System.

---

## 2. Overall System Architecture & Technology Stack

```
+-----------------------------------------------------------------------------------+
|                                 CLIENT LAYER                                      |
|  +---------------------+   +---------------------+   +-------------------------+  |
|  | Next.js Web Admin   |   | Customer Portal     |   | Builder / Partner       |  |
|  | & Executive Hub     |   | (PWA / Web App)     |   | Management Console      |  |
|  +----------+----------+   +----------+----------+   +------------+------------+  |
+-------------|-------------------------|---------------------------|---------------+
              |                         |                           |
              +-------------------------+---------------------------+
                                        | (HTTPS / REST API / WSS)
+---------------------------------------v-------------------------------------------+
|                               API GATEWAY & SECURITY                              |
|  - TLS 1.3 Encryption         - Rate Limiting (NGINX / Redis)                     |
|  - JWT Authentication         - WAF & IP / Geo-Location Filtering                 |
+---------------------------------------+-------------------------------------------+
                                        |
+---------------------------------------v-------------------------------------------+
|                              APPLICATION LAYER (DJANGO DRF)                       |
|  +---------------------+   +---------------------+   +-------------------------+  |
|  | Authentication &    |   | CRM & Lead Engine   |   | Inventory & Booking     |  |
|  | Security Middleware |   | & AI Scoring        |   | Management System       |  |
|  +---------------------+   +---------------------+   +-------------------------+  |
|  +---------------------+   +---------------------+   +-------------------------+  |
|  | Commission Split    |   | HRMS & GPS          |   | Anti-Fraud Monitoring   |  |
|  | & Finance Engine    |   | Attendance          |   | & Audit Logging         |  |
|  +---------------------+   +---------------------+   +-------------------------+  |
+-------------------+-+-------------------+--------------------+--------------------+
                    |                     |                    |
                    v                     v                    v
+-----------------------+   +------------------------+   +--------------------------+
|  DATABASE (POSTGRES)  |   | CACHE & QUEUE (REDIS)  |   | AI INTEGRATION SERVICE   |
|  - PostgreSQL 16      |   | - Celery Task Workers  |   | - OpenAI / LLM Engine    |
|  - RLS & Audit Logs   |   | - Session Store        |   | - Vector Store / FAISS   |
+-----------------------+   +------------------------+   +--------------------------+
```

---

## 3. Detailed Non-Functional Requirements

### 3.1 Performance & Scalability
- **API Response Time**: 95% of read requests served within < 150 ms; write requests processed within < 300 ms.
- **Concurrent Users**: Architecture tested to support 5,000+ active concurrent sales executives and customer sessions without performance degradation.
- **Database Indexing**: Full B-Tree and GIN indexes on lead phone hashes, booking IDs, project units, and audit timestamps.
- **Asynchronous Task Processing**: Bulk emails, WhatsApp notifications, daily financial reports, and AI lead scoring dispatched via background Celery queues.

### 3.2 Reliability & Availability
- **System Availability Target**: 99.99% uptime (maximum planned/unplanned downtime < 52 minutes per year).
- **Redundancy**: Multi-AZ PostgreSQL deployment with automatic failover read replicas.
- **Health Checks**: Automated liveness `/api/v1/healthz` and readiness `/api/v1/readyz` endpoints monitored by Grafana/Prometheus.

### 3.3 Data Integrity & Security
- **Encryption at Rest**: PostgreSQL database volume encrypted using AES-256 (AWS KMS or LUKS).
- **Encryption in Transit**: TLS 1.3 mandatory across all endpoints; HTTP automatically redirected to HTTPS.
- **PII Data Protection**: Customer phone numbers and email addresses stored with salt-hashed lookup keys and encrypted fields (`pgcrypto`).
- **Immutable Audit Trail**: Database triggers append changes to an immutable `system_audit_log` table where `UPDATE` and `DELETE` operations are strictly blocked for non-system roles.

### 3.4 Maintainability & Compliance
- **Code Standards**: PEP 8 compliance for Python/Django; ESLint/Prettier rules for TypeScript/Next.js.
- **API Versioning**: URL-based API versioning (e.g., `/api/v1/crm/leads/`).
- **OpenAPI / Swagger Standard**: Self-documenting API schema generated via DRF Spectacular.

---

## 4. Software Interface Requirements

### 4.1 Frontend - Backend Interface
- Protocol: JSON over HTTPS REST APIs.
- Real-time updates (Notifications, Chatbot, Anti-Fraud Alerts): WebSockets via Django Channels (`wss://`).

### 4.2 External Service Integrations
1. **SMS / WhatsApp Gateway**: Twilio / Meta Cloud API for OTP delivery, lead alerts, and automated WhatsApp nurturing.
2. **IVR & Telephony System**: Exotel / Knowlarity integration for masked call forwarding between sales executives and clients.
3. **Location Services**: Google Maps Platform API for geo-fencing site visits, calculating travel distances, and verifying employee check-ins.
4. **Cloud Storage**: AWS S3 with pre-signed URLs for secure document storage (Customer KYC, Agreements, Builder NOCs).
5. **AI Model Engine**: OpenAI GPT-4o / Claude API integration with fallback mechanisms for natural language processing and document summarization.

---

## 5. Security & Protection Requirements

### 5.1 Authentication Infrastructure
- Multi-Factor Authentication (MFA) via Time-based One-Time Passwords (TOTP / Google Authenticator) required for Manager and Super Admin accounts.
- SMS/WhatsApp OTP fallback for field agents.
- JWT Access Token lifespan set to 15 minutes; Refresh Tokens set to 12 hours with automatic rotation.

### 5.2 Authorization & Access Control
- Granular Role-Based Access Control (RBAC) evaluated at Django middleware level.
- Permission scopes: `company:read`, `branch:write`, `lead:mask_override`, `commission:approve`, `system:lockdown`.

### 5.3 Threat Mitigation
- **Rate Limiting**: 60 requests/minute for standard APIs; 5 requests/minute for login and password reset endpoints.
- **SQL Injection & XSS Shield**: Django ORM parameterized queries; Next.js automatic React component escaping.
- **CORS Policy**: Restricted explicitly to authorized Swaramayi domain names.
