# Database Design & PostgreSQL Schema Specifications
## Swaramayi Real Estate Marketing – Enterprise Real Estate Brokerage ERP, CRM & AI Business Operating System

---

## 1. Overview
The database architecture uses **PostgreSQL 16** with strong relational integrity constraints, foreign key cascades, JSONB fields for dynamic metadata, GIN/B-tree indexes, and trigger-based immutable audit logging.

---

## 2. Core Relational Schema (DDL Specifications)

```sql
-- ENABLE EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. COMPANIES & BRANCHES
CREATE TABLE companies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    code VARCHAR(50) UNIQUE NOT NULL,
    tax_id VARCHAR(50),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE branches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(50) UNIQUE NOT NULL,
    city VARCHAR(100) NOT NULL,
    address TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. USERS & ROLES
CREATE TYPE user_role_enum AS ENUM (
    'SUPER_ADMIN', 'BRANCH_MANAGER', 'TEAM_LEAD', 
    'SALES_EXECUTIVE', 'FINANCE_SPECIALIST', 'HR_SPECIALIST', 
    'BUILDER_PARTNER', 'CUSTOMER'
);

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id),
    branch_id UUID REFERENCES branches(id),
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    role user_role_enum NOT NULL DEFAULT 'SALES_EXECUTIVE',
    is_mfa_enabled BOOLEAN DEFAULT FALSE,
    mfa_secret VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    is_locked BOOLEAN DEFAULT FALSE,
    last_login_ip VARCHAR(45),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. CRM & LEADS
CREATE TYPE lead_status_enum AS ENUM (
    'NEW', 'QUALIFIED', 'ASSIGNED', 'SITE_VISIT_SCHEDULED', 
    'SITE_VISIT_COMPLETED', 'BOOKING_INITIATED', 'WON', 'LOST'
);

CREATE TABLE leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    branch_id UUID REFERENCES branches(id),
    assigned_to_user_id UUID REFERENCES users(id),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100),
    phone_masked VARCHAR(20) NOT NULL,
    phone_hash VARCHAR(64) UNIQUE NOT NULL, -- SHA256 hash for duplicate checks
    email_masked VARCHAR(255),
    source VARCHAR(100) NOT NULL, -- Meta, Google, Portal, Direct
    budget_min NUMERIC(15, 2),
    budget_max NUMERIC(15, 2),
    preferred_location VARCHAR(255),
    ai_score INT DEFAULT 50, -- 0 to 100 AI lead score
    status lead_status_enum DEFAULT 'NEW',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. PROPERTIES & INVENTORY
CREATE TABLE builders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    contact_person VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(20),
    commission_percentage NUMERIC(5, 2) NOT NULL DEFAULT 2.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    builder_id UUID NOT NULL REFERENCES builders(id),
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    geo_latitude NUMERIC(10, 8),
    geo_longitude NUMERIC(11, 8),
    geo_fence_radius_meters INT DEFAULT 200,
    total_units INT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TYPE unit_status_enum AS ENUM ('AVAILABLE', 'HOLD', 'BOOKED', 'REGISTERED');

CREATE TABLE units (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES projects(id),
    unit_number VARCHAR(50) NOT NULL,
    floor_number INT NOT NULL,
    bhk_type VARCHAR(20) NOT NULL, -- 1BHK, 2BHK, 3BHK, Villa
    carpet_area_sqft NUMERIC(10, 2) NOT NULL,
    base_price NUMERIC(15, 2) NOT NULL,
    plc_charges NUMERIC(15, 2) DEFAULT 0.00,
    total_price NUMERIC(15, 2) NOT NULL,
    status unit_status_enum DEFAULT 'AVAILABLE',
    hold_until TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. SITE VISITS & BOOKINGS
CREATE TABLE site_visits (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lead_id UUID NOT NULL REFERENCES leads(id),
    project_id UUID NOT NULL REFERENCES projects(id),
    sales_executive_id UUID NOT NULL REFERENCES users(id),
    scheduled_time TIMESTAMP WITH TIME ZONE NOT NULL,
    checkin_time TIMESTAMP WITH TIME ZONE,
    checkin_latitude NUMERIC(10, 8),
    checkin_longitude NUMERIC(11, 8),
    is_gps_verified BOOLEAN DEFAULT FALSE,
    feedback TEXT,
    status VARCHAR(50) DEFAULT 'SCHEDULED', -- SCHEDULED, COMPLETED, CANCELLED
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lead_id UUID NOT NULL REFERENCES leads(id),
    unit_id UUID NOT NULL REFERENCES units(id),
    sales_executive_id UUID NOT NULL REFERENCES users(id),
    agreed_price NUMERIC(15, 2) NOT NULL,
    booking_amount NUMERIC(15, 2) NOT NULL,
    booking_date DATE NOT NULL DEFAULT CURRENT_DATE,
    status VARCHAR(50) DEFAULT 'PENDING_APPROVAL', -- PENDING_APPROVAL, APPROVED, REJECTED, CANCELLED
    kyc_status VARCHAR(50) DEFAULT 'VERIFIED',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. COMMISSIONS & PAYOUTS
CREATE TABLE commission_splits (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID NOT NULL REFERENCES bookings(id),
    total_commission_amount NUMERIC(15, 2) NOT NULL,
    agent_share_amount NUMERIC(15, 2) NOT NULL,
    team_lead_share_amount NUMERIC(15, 2) NOT NULL,
    branch_share_amount NUMERIC(15, 2) NOT NULL,
    company_share_amount NUMERIC(15, 2) NOT NULL,
    is_approved BOOLEAN DEFAULT FALSE,
    approved_by_user_id UUID REFERENCES users(id),
    payout_status VARCHAR(50) DEFAULT 'PENDING',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. IMMUTABLE AUDIT LOG & THREAT MONITORING
CREATE TABLE system_audit_log (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    user_ip VARCHAR(45),
    user_agent TEXT,
    action_type VARCHAR(100) NOT NULL, -- READ, WRITE, EXPORT, LOGIN_FAILED, LOCKDOWN
    table_name VARCHAR(100),
    record_id UUID,
    old_values JSONB,
    new_values JSONB,
    severity VARCHAR(20) DEFAULT 'INFO', -- INFO, WARNING, CRITICAL, SECURITY_ALERT
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

---

## 3. Immutable Audit Log Trigger Functions

```sql
-- FUNCTION TO PREVENT DELETE/UPDATE ON AUDIT LOG
CREATE OR REPLACE FUNCTION prevent_audit_tampering()
RETURNS TRIGGER AS $$
BEGIN
    RAISE EXCEPTION 'TAMPER ERROR: Database audit records cannot be updated or deleted!';
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_audit_tamper_shield
BEFORE UPDATE OR DELETE ON system_audit_log
FOR EACH ROW EXECUTE FUNCTION prevent_audit_tampering();
```

---

## 4. Key Performance Indexes
```sql
CREATE INDEX idx_leads_phone_hash ON leads(phone_hash);
CREATE INDEX idx_leads_assigned_user ON leads(assigned_to_user_id);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_units_project_status ON units(project_id, status);
CREATE INDEX idx_site_visits_executive ON site_visits(sales_executive_id, scheduled_time);
CREATE INDEX idx_audit_log_timestamp ON system_audit_log(created_at DESC);
CREATE INDEX idx_audit_log_user ON system_audit_log(user_id);
```
