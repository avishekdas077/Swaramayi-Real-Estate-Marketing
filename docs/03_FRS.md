# Functional Requirement Specification (FRS)
## Swaramayi Real Estate Marketing – Enterprise Real Estate Brokerage ERP, CRM & AI Business Operating System

---

## 1. Module Functional Breakdown

The Swaramayi ERP consists of 30+ core functional modules divided across 7 key enterprise operational areas:

```
                                 FUNCTIONAL MODULE MAP
                                 
  [CORE SYSTEM]          [CRM & MARKETING]         [INVENTORY & SALES]        [FINANCE & ACCOUNTING]
  - Company Structure    - Multi-Channel Leads     - Property Projects        - Chart of Accounts
  - Branch Management    - AI Lead Scoring         - Unit Inventory Grid      - Double-Entry Ledger
  - User & RBAC Roles    - Auto Queue Router       - Booking Management       - Commission Engine
  - Device Binding       - WhatsApp Automation     - Site Visit GPS Tracker   - Builder Invoicing
  - Audit Trail          - Customer 360 View       - Agreement Generator      - Expense & Payouts

  [HRMS & PAYROLL]       [SECURITY & FRAUD]        [AI BUSINESS SYSTEM]       [PORTALS & APPS]
  - Employee Master      - Anti-Data Export        - AI Lead Qualifier        - Owner Dashboard
  - GPS Attendance       - Duplicate Detector      - AI Proposal Generator    - Manager Console
  - Leave Management     - Fake Booking Alert      - AI Voice Receptionist    - Customer Portal
  - Commission Payroll   - Emergency Lockdown      - Revenue Predictor        - Builder Portal
```

---

## 2. Detailed Module Specifications

### Module 01: Multi-Branch & Entity Management
- **Description**: Configures company entities, regional branches, team hierarchies, and regional cost centers.
- **Key Features**:
  - Global dashboard displaying branch-level revenue, active leads, and conversion metrics.
  - Branch-isolated database query scopes preventing cross-branch unauthorized data access.
  - Cost center allocation for marketing spends and overheads.

### Module 02: User & Role-Based Access Control (RBAC)
- **Description**: Defines access privileges for all operational roles.
- **Permission Matrix Blueprint**:
  - `Super Admin`: Full system permissions, global system configuration, audit log export, emergency lockdown.
  - `Branch Manager`: Branch-level CRUD on leads, bookings, site visits, staff attendance, commission draft review.
  - `Sales Executive`: Read/write access strictly to assigned leads; masked client phone/email; GPS check-in access.
  - `Finance Specialist`: Read/write access to payment logs, builder invoicing, ledger entries, payroll disbursement.
  - `HR Specialist`: Read/write access to employee master data, leave approvals, attendance logs, performance evaluations.

### Module 03: Lead Management & Multi-Channel Ingestion
- **Description**: Captures incoming inquiries from Meta ads, Google Search, housing portals, direct calls, and website forms.
- **Key Features**:
  - Real-time webhook listeners for Meta Lead Ads & Google Ads API.
  - Instant duplicate lead check via normalized phone hash.
  - Round-robin lead distribution based on agent performance score, language skills, and workload.
  - SLA Timer: If an agent fails to respond to a new lead within 15 minutes, the lead automatically escalates to the Team Lead.

### Module 04: Property Catalog & Inventory Grid Matrix
- **Description**: Manages real estate projects, builder agreements, towers, wings, floor plans, and unit status.
- **Key Features**:
  - Interactive Unit Grid: Visual representation of available (Green), reserved (Yellow), booked (Red), and hold (Gray) units.
  - Price Calculation Engine: Calculates base rate, floor rise fees, preferred location charges (PLC), parking charges, and applicable taxes (GST, Stamp Duty).
  - Temporary Hold Feature: Sales managers can hold a unit for a client for up to 2 hours during active negotiations.

### Module 05: Site Visit Management with GPS Validation
- **Description**: Tracks and verifies customer site visits conducted by sales agents.
- **Key Features**:
  - Geo-fenced Check-in: Mobile app captures agent's live GPS coordinates when within 100 meters of project site boundaries.
  - Customer OTP Check-in: Agent triggers an OTP to the customer's phone to verify physical presence.
  - Driver & Fleet Tracking: Reimbursable cab routing log for customer pickups.

### Module 06: Unit Booking & Digital Agreement Engine
- **Description**: Digitizes the customer property purchase workflow.
- **Key Features**:
  - Token Payment Gateway: Accepts initial booking token via credit card, UPI, bank transfer, or net banking.
  - Document Upload: Auto-extracts KYC details from Aadhaar/PAN cards using OCR.
  - Automated Allotment Letter: Generates PDF allotment letter with QR-code security verification.

### Module 07: Tiered Commission Split Engine
- **Description**: Eliminates manual commission disputes by automatically calculating splits upon payment verification.
- **Key Features**:
  - Multi-tier Splits: Calculates primary agent %, team manager %, regional branch %, and company retention.
  - Builder Commission Invoicing: Automatically generates builder commission invoice based on agreed milestone schedule (e.g., 50% on booking, 50% on registration).
  - Clawback Logic: Reverses commission allocations if a booking is cancelled before agreement registration.

### Module 08: HRMS & GPS Geo-Fenced Attendance
- **Description**: Manages staff attendance, leaves, and commission-linked payroll.
- **Key Features**:
  - Mobile Geo-Fencing: Field executives check in using GPS coordinates paired with selfie face verification.
  - Automated Payroll Engine: Calculates base salary + earned commissions - TDS/taxes - advance adjustments.

### Module 09: Real-time Anti-Fraud & Data Protection Engine
- **Description**: Continuously monitors database and user actions to detect fraud and prevent data exfiltration.
- **Key Features**:
  - Data Copy Protection: Disables text selection and right-click copying of customer phone numbers in the web panel.
  - Bulk Export Trap: Any user attempting to export >50 contacts triggers an instant account freeze and SMS alert to the Owner.
  - Fake Attendance Alert: Detects mock location / GPS spoofing applications on mobile devices.

### Module 10: AI Business Operating Assistant
- **Description**: Embedded intelligence providing automated lead qualification, revenue forecasts, and proposal drafting.
- **Key Features**:
  - Predictive Lead Scoring: Machine learning algorithm scores incoming leads (0 to 100) based on budget, timeline, and interaction depth.
  - AI Voice & Call Summarizer: Transcribes IVR call audio and generates concise call notes and actionable follow-ups.
  - Revenue Forecasting Engine: Forecasts next month's sales revenue based on active pipeline velocity and historical closure ratios.
