# Testing Strategy & Quality Assurance Plan
## Swaramayi Real Estate Marketing – Enterprise Real Estate Brokerage ERP, CRM & AI Business Operating System

---

## 1. Test Strategy Overview
The testing plan ensures functional correctness, zero security breaches, high availability, and financial accuracy (commission splits & double-entry accounting).

---

## 2. Test Execution Matrix

| Test Suite | Purpose & Coverage | Tools & Frameworks | Target Metric |
| :--- | :--- | :--- | :--- |
| **Unit Testing** | Models, serializers, commission calculation math, phone hashing logic. | Pytest, Django TestCase | > 85% Code Coverage |
| **Integration Testing**| Lead lifecycle flow, Site Visit check-in API, Booking submission & approval. | DRF APIClient, Pytest-Django | 100% Core Flow Pass |
| **Security Testing** | RBAC permission matrix enforcement, SQLi, XSS, Bulk Data Export Traps. | OWASP ZAP, Custom Security Scripts | Zero High/Critical Vulnerabilities |
| **Load & Stress Testing**| 5,000 concurrent user requests on lead insertion & unit inventory searches. | Locust / k6 | 95th Percentile < 200ms |
| **End-to-End UI Testing**| Next.js frontend user journeys across Admin, Customer, and HRMS panels. | Cypress / Playwright | 100% Critical Path Pass |

---

## 3. Automated Test Command Execution
```bash
# Run backend Django test suite
cd backend
python manage.py test

# Run frontend end-to-end suite
cd frontend
npm run test:e2e
```
