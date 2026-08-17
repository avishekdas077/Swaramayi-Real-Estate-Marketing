# Entity Relationship (ER) Diagram
## Swaramayi Real Estate Marketing – Enterprise Real Estate Brokerage ERP, CRM & AI Business Operating System

---

## 1. Overview & Data Architecture Models
The relational entity diagram maps out the multi-tenant branch structure, CRM lead acquisition engine, property inventory catalog, sales booking workflows, commission splits, HRMS, and audit shield layer.

---

## 2. Global Entity Relationship Diagram (Mermaid)

```mermaid
erDiagram
    COMPANIES ||--|{ BRANCHES : "operates"
    COMPANIES ||--|{ USERS : "employs"
    BRANCHES ||--|{ USERS : "houses"
    BRANCHES ||--|{ LEADS : "manages"

    USERS ||--o{ LEADS : "assigned_to"
    USERS ||--o{ SITE_VISITS : "conducts"
    USERS ||--o{ BOOKINGS : "closes"
    USERS ||--o{ SYSTEM_AUDIT_LOG : "triggers"

    LEADS ||--o{ SITE_VISITS : "participates_in"
    LEADS ||--o{ BOOKINGS : "initiates"

    BUILDERS ||--|{ PROJECTS : "develops"
    PROJECTS ||--|{ UNITS : "contains"
    PROJECTS ||--o{ SITE_VISITS : "target_location"
    UNITS ||--o{ BOOKINGS : "allocated_in"

    BOOKINGS ||--|| COMMISSION_SPLITS : "generates"
    BOOKINGS ||--|{ FINANCIAL_LEDGER : "creates_transactions"

    USERS ||--o{ ATTENDANCE_LOGS : "registers"
    USERS ||--o{ PAYROLL_RECORDS : "receives"
```

---

## 3. Module-Specific Sub-Schemas

### 3.1 Lead Management & CRM Sub-Schema
```mermaid
erDiagram
    LEADS {
        uuid id PK
        uuid branch_id FK
        uuid assigned_to_user_id FK
        string first_name
        string phone_masked
        string phone_hash UK
        string email_masked
        string source
        int ai_score
        enum status
    }
    LEAD_INTERACTIONS {
        uuid id PK
        uuid lead_id FK
        uuid user_id FK
        string channel
        text notes
        timestamp created_at
    }
    LEADS ||--|{ LEAD_INTERACTIONS : "logs"
```

### 3.2 Property & Inventory Grid Sub-Schema
```mermaid
erDiagram
    BUILDERS {
        uuid id PK
        string name
        numeric commission_percentage
    }
    PROJECTS {
        uuid id PK
        uuid builder_id FK
        string name
        numeric geo_latitude
        numeric geo_longitude
        int total_units
    }
    UNITS {
        uuid id PK
        uuid project_id FK
        string unit_number
        string bhk_type
        numeric carpet_area_sqft
        numeric total_price
        enum status
    }
    BUILDERS ||--|{ PROJECTS : "owns"
    PROJECTS ||--|{ UNITS : "houses"
```

### 3.3 Commission & Payout Sub-Schema
```mermaid
erDiagram
    BOOKINGS {
        uuid id PK
        uuid lead_id FK
        uuid unit_id FK
        uuid sales_executive_id FK
        numeric agreed_price
        numeric booking_amount
        string status
    }
    COMMISSION_SPLITS {
        uuid id PK
        uuid booking_id FK
        numeric total_commission_amount
        numeric agent_share_amount
        numeric team_lead_share_amount
        numeric branch_share_amount
        numeric company_share_amount
        boolean is_approved
    }
    BOOKINGS ||--|| COMMISSION_SPLITS : "triggers"
```
