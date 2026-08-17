# API Documentation & OpenAPI Specification
## Swaramayi Real Estate Marketing – Enterprise Real Estate Brokerage ERP, CRM & AI Business Operating System

---

## 1. Overview & Authentication
Base API Path: `https://api.swaramayi-crm.com/api/v1`

### Authentication Scheme
All endpoints (except `/auth/login` and `/auth/mfa/verify`) require a Bearer JWT Token passed in the HTTP Authorization header:
```http
Authorization: Bearer <JWT_ACCESS_TOKEN>
```

---

## 2. Core API Endpoints

### 2.1 Authentication & Security Endpoints
| Method | Endpoint | Description | Access Level |
| :--- | :--- | :--- | :--- |
| `POST` | `/auth/login/` | Authenticates username/password; returns JWT + MFA required flag. | Public |
| `POST` | `/auth/mfa/verify/` | Verifies TOTP / SMS OTP code and returns active session JWT. | Public (Challenge) |
| `POST` | `/auth/device/bind/` | Registers device fingerprint (UUID, Browser Hash, MAC). | Authenticated |
| `POST` | `/security/lockdown/` | Triggers emergency system lockdown (Blocks all non-owner access). | Super Admin |

### 2.2 Lead Management & CRM Endpoints
| Method | Endpoint | Description | Access Level |
| :--- | :--- | :--- | :--- |
| `GET` | `/crm/leads/` | Retrieves filterable lead list (Masked contacts for field agents). | Agent+ |
| `POST` | `/crm/leads/` | Ingests new lead with instant phone hash duplicate check. | Agent+ / Webhook |
| `GET` | `/crm/leads/{id}/` | Fetches 360-degree lead profile & interaction logs. | Assigned Agent+ |
| `POST` | `/crm/leads/{id}/score/` | Triggers AI lead scoring calculation. | System / Manager |
| `POST` | `/crm/leads/{id}/assign/` | Assigns lead to sales agent manually or via round-robin AI. | Team Lead+ |

### 2.3 Property & Inventory Grid Endpoints
| Method | Endpoint | Description | Access Level |
| :--- | :--- | :--- | :--- |
| `GET` | `/properties/projects/` | Lists real estate projects with location and builder data. | Authenticated |
| `GET` | `/properties/projects/{id}/units/` | Fetches visual unit inventory matrix grid with status colors. | Authenticated |
| `POST` | `/properties/units/{id}/hold/` | Places a temporary 2-hour lock on an available unit. | Sales Manager |

### 2.4 Site Visits & Booking Endpoints
| Method | Endpoint | Description | Access Level |
| :--- | :--- | :--- | :--- |
| `POST` | `/sales/site-visits/checkin/` | GPS geo-fenced site visit check-in with customer OTP verification. | Sales Executive |
| `POST` | `/sales/bookings/` | Creates property booking record with initial token payment reference. | Sales Executive |
| `POST` | `/sales/bookings/{id}/approve/` | Approves provisional allotment letter and locks inventory unit. | Branch Manager |

### 2.5 Commission & Payout Endpoints
| Method | Endpoint | Description | Access Level |
| :--- | :--- | :--- | :--- |
| `GET` | `/commissions/splits/` | Retrieves calculated commission splits for confirmed bookings. | Manager / Finance |
| `POST` | `/commissions/splits/{id}/approve/` | Authorizes commission disbursement to accounts payable. | Owner / Finance |

### 2.6 Anti-Fraud & Security Command Center Endpoints
| Method | Endpoint | Description | Access Level |
| :--- | :--- | :--- | :--- |
| `GET` | `/security/audit-logs/` | Fetches filterable, immutable audit trail records. | Super Admin |
| `GET` | `/security/fraud-alerts/` | Retrieves active fraud alerts (duplicate leads, GPS spoof, bulk export). | Super Admin / Mgr |

---

## 3. Sample API Request & Response Schemas

### 3.1 Lead Check-In Endpoint Example
`POST /api/v1/sales/site-visits/checkin/`

#### Request Payload:
```json
{
  "site_visit_id": "8f3b2d10-4e5a-4b2c-8d1e-9f0a1b2c3d4e",
  "latitude": 17.4400802,
  "longitude": 78.3489162,
  "customer_otp": "482901",
  "notes": "Client requested floor plan for 3BHK Unit #1204."
}
```

#### Response Payload (Success `200 OK`):
```json
{
  "status": "SUCCESS",
  "message": "GPS check-in verified successfully.",
  "data": {
    "site_visit_id": "8f3b2d10-4e5a-4b2c-8d1e-9f0a1b2c3d4e",
    "is_gps_verified": true,
    "distance_from_site_meters": 14.2,
    "timestamp": "2026-08-09T14:30:00Z"
  }
}
```

### 3.2 Security Error Payload Example (`403 Forbidden`):
```json
{
  "status": "ERROR",
  "error_code": "DATA_EXPORT_BLOCKED",
  "message": "Bulk data export attempt detected. Account locked pending administrator review.",
  "timestamp": "2026-08-09T14:31:12Z"
}
```
