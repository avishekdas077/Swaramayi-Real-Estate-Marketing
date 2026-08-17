# Enterprise Security & Anti-Fraud Architecture
## Swaramayi Real Estate Marketing – Enterprise Real Estate Brokerage ERP, CRM & AI Business Operating System

---

## 1. Zero-Trust Security Philosophy
The Swaramayi ERP operates on a strict **Zero-Trust Security Architecture**. Every request—whether originating from an internal executive or an external client—must be explicitly authenticated, authorized according to the RBAC matrix, and logged in an immutable audit ledger.

---

## 2. Dynamic RBAC Permission Matrix

| Module / Operation | Super Admin | Branch Manager | Team Lead | Sales Exec | Finance | HR | Builder | Customer |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **View Full Customer Phone** | Yes | No (Masked) | No (Masked) | No (Masked) | Yes (Invoices) | No | No | Self |
| **Export Lead CSV Data** | OTP Protected | Blocked | Blocked | Blocked | Blocked | Blocked | Blocked | Blocked |
| **Assign / Re-assign Lead** | Yes | Yes | Yes | No | No | No | No | No |
| **Hold Inventory Unit** | Yes | Yes | Yes | No | No | No | No | No |
| **Approve Booking & Price** | Yes | Yes | No | No | No | No | No | No |
| **Approve Commission Split**| Yes | No | No | No | Yes | No | No | No |
| **Modify Financial Ledger** | Yes | No | No | No | Read/Post | No | No | No |
| **Emergency System Lockdown**| Yes | No | No | No | No | No | No | No |

---

## 3. Data Protection & Anti-Theft Guardrails

### 3.1 Contact Information Masking Engine
Sales representatives and team managers never see raw customer phone numbers or email addresses in the UI or backend responses.
- Phone pattern: `+91 98*** **412`
- Email pattern: `j***n@gmail.com`
- Telephony Calling: Executed via double-blinded IVR bridging (`Exec Phone <-> IVR Server <-> Client Phone`).

### 3.2 Anti-Data Exfiltration (Trap System)
- **Copy Protection**: Front-end JavaScript intercepts `Ctrl+C`, context menu right-clicks, and DOM text selection on contact cards.
- **Export Trap**: API limits CSV/Excel export requests to max 20 records per day per user. Any attempt to query >20 records via script triggers an automated account lock, revokes all JWT tokens, and sends an urgent WhatsApp alert to the Executive Owner.

---

## 4. Anti-Fraud & Threat Monitoring Engine

### 4.1 Automated Fraud Alerts Trigger Table

```
   +-----------------------+     +------------------------+     +------------------------+
   |   USER ACTION / API   | --> | ANTI-FRAUD ENGINE RECV | --> | ALERT & AUTO RESPONSE  |
   +-----------------------+     +------------------------+     +------------------------+
   | 1. Bulk Export Request| --> | Triggers Export Trap   | --> | Lock Account + Owner OTP|
   | 2. GPS Mock Location  | --> | Spoof Detector Active  | --> | Invalidates Site Visit |
   | 3. Duplicate Lead     | --> | Phone Hash Collision   | --> | Merges & Notifies Agent|
   | 4. Unit Price Alter   | --> | Price Discount Check   | --> | Blocks Booking Approval|
   +-----------------------+     +------------------------+     +------------------------+
```

1. **GPS Spoofing & Fake Attendance Detection**: Mobile app captures raw GPS provider flags (`isFromMockProvider`). Mock GPS coordinates invalidate site visits and trigger HR compliance flags.
2. **Duplicate Booking Fraud**: Validates that no unit can be booked twice across different sales channels by utilizing atomic database locks (`SELECT FOR UPDATE`).
3. **Commission Manipulation Prevention**: System calculates splits automatically based on immutable builder agreement rules stored in PostgreSQL. Manual overrides require Super Admin digital signature.

---

## 5. Device Binding & Trusted Workstation Management
- During first login, a unique cryptographic device fingerprint (`device_uuid + browser_hash + canvas_fingerprint`) is bound to the user record.
- Users attempting login from an unapproved device must pass secondary OTP validation sent to their registered mobile phone + Manager digital authorization.
- Maximum 2 active trusted devices permitted per sales executive.

---

## 6. Emergency System Lockdown Engine
In the event of a suspected cyber attack or insider threat:
- Super Admin can activate **EMERGENCY LOCKDOWN MODE** with a single click.
- All non-owner JWT session tokens are instantly revoked in Redis.
- Database access switches to read-only mode for external APIs.
- System logs IP traces and initiates automated cloud snapshot backups.
