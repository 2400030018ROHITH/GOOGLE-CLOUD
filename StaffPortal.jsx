import { useState } from "react";

export default function StaffPortal({ user, onLogout }) {
  const [activeModal, setActiveModal] = useState(null);

  const permissions = user.permissions || {
    employee_records: true,
    company_documents: true,
    system_status: true,
  };

  const attendance = user.attendance || {
    rate: 96,
    daysPresent: 22,
    totalDays: 23,
    avgHours: 8.4,
    checkIn: "09:15 AM",
    weekly: [
      { day: "Mon", hours: 8.5 },
      { day: "Tue", hours: 8.2 },
      { day: "Wed", hours: 9.0 },
      { day: "Thu", hours: 8.1 },
      { day: "Fri", hours: 8.3 },
    ],
  };

  // Open resource viewer / restricted vault
  const handleOpenResource = (key, title, isAllowed) => {
    setActiveModal({
      key,
      title,
      isAllowed,
    });
  };

  return (
    <div className="app">
      <nav className="navbar">
        <div className="brand">
          <div className="logo">I</div>
          <div>
            <h2>SecureGate</h2>
            <span>Identity-Aware Proxy</span>
          </div>
        </div>

        <div className="nav-right">
          <div className="user-info">
            <div className="avatar">{user.avatar || "EM"}</div>
            <div>
              <strong>{user.name}</strong>
              <small>{user.role} • {user.department || "Staff"}</small>
            </div>
          </div>

          <button className="logout" onClick={onLogout}>
            Logout
          </button>
        </div>
      </nav>

      <main className="dashboard">
        {/* Welcome Section */}
        <section className="welcome">
          <div>
            <p className="eyebrow">INTERNAL APPLICATION</p>
            <h1>Welcome, {user.name}</h1>
            <p>
              Your identity and device have been successfully verified by SecureGate.
            </p>
          </div>

          <div className="access-badge">
            <span>●</span>
            ACCESS GRANTED
          </div>
        </section>

        {/* Security Grid */}
        <section className="security-grid">
          <div className="security-card">
            <div className="card-icon">✓</div>
            <div>
              <span>IDENTITY</span>
              <h3>Verified</h3>
              <p>{user.email}</p>
            </div>
          </div>

          <div className="security-card">
            <div className="card-icon">✓</div>
            <div>
              <span>DEVICE</span>
              <h3>Trusted</h3>
              <p>{user.device || "Company Managed Device"}</p>
            </div>
          </div>

          <div className="security-card">
            <div className="card-icon">✓</div>
            <div>
              <span>POLICY</span>
              <h3>Compliant</h3>
              <p>{user.policyName || "Staff Application Policy"}</p>
            </div>
          </div>
        </section>

        {/* Protected Resource Panel with Clickable Modules */}
        <section className="application-panel">
          <div className="panel-header">
            <div>
              <span className="eyebrow">PROTECTED RESOURCE</span>
              <h2>Internal Staff Portal</h2>
            </div>

            <span className="secure-tag">
              🔒 SECURE CONNECTION
            </span>
          </div>

          <div className="resource-grid">
            <div className="resource">
              <span>Application</span>
              <strong>Employee Management</strong>
            </div>

            <div className="resource">
              <span>Access Level</span>
              <strong>Staff ({user.department || "General"})</strong>
            </div>

            <div className="resource">
              <span>Authentication</span>
              <strong>Identity Verified</strong>
            </div>

            <div className="resource">
              <span>Device Status</span>
              <strong>Trusted</strong>
            </div>
          </div>

          <div className="portal-content">
            <h3>Internal Application Content</h3>
            <p>
              Click any module below to inspect documents. Access is dynamically governed by your Administrator.
            </p>

            <div className="data-row interactive-modules">
              {/* Employee Records */}
              <div
                className={`resource-status-box clickable ${permissions.employee_records ? "active" : "disabled"}`}
                onClick={() =>
                  handleOpenResource("records", "Employee Records & Directory", Boolean(permissions.employee_records))
                }
              >
                <span>Employee Records</span>
                <strong>
                  {permissions.employee_records ? (
                    <span className="online">Available (Click to open) ↗</span>
                  ) : (
                    <span className="restricted">🔒 Restricted (Click to inspect)</span>
                  )}
                </strong>
                <small className="module-desc">Personnel files & org hierarchy</small>
              </div>

              {/* Company Documents */}
              <div
                className={`resource-status-box clickable ${permissions.company_documents ? "active" : "disabled"}`}
                onClick={() =>
                  handleOpenResource("documents", "Confidential Company Documents", Boolean(permissions.company_documents))
                }
              >
                <span>Company Documents</span>
                <strong>
                  {permissions.company_documents ? (
                    <span className="online">Available (Click to open) ↗</span>
                  ) : (
                    <span className="restricted">🔒 Restricted (Click to inspect)</span>
                  )}
                </strong>
                <small className="module-desc">Internal wikis, briefs & policies</small>
              </div>

              {/* System Status */}
              <div
                className={`resource-status-box clickable ${permissions.system_status ? "active" : "disabled"}`}
                onClick={() =>
                  handleOpenResource("system", "System Status & Core Gateway", Boolean(permissions.system_status))
                }
              >
                <span>System Status</span>
                <strong>
                  {permissions.system_status ? (
                    <span className="online">Operational ↗</span>
                  ) : (
                    <span className="restricted">🔒 Restricted (Click to inspect)</span>
                  )}
                </strong>
                <small className="module-desc">Gateway uptime & infrastructure logs</small>
              </div>

              {/* Cloud Infrastructure */}
              <div
                className={`resource-status-box clickable ${permissions.cloud_console ? "active" : "disabled"}`}
                onClick={() =>
                  handleOpenResource("cloud", "Production Cloud Console", Boolean(permissions.cloud_console))
                }
              >
                <span>Cloud Infrastructure</span>
                <strong>
                  {permissions.cloud_console ? (
                    <span className="online">Available ↗</span>
                  ) : (
                    <span className="restricted">🔒 Restricted (Click to inspect)</span>
                  )}
                </strong>
                <small className="module-desc">Server clusters & deployments</small>
              </div>

              {/* Payroll & Financial */}
              <div
                className={`resource-status-box clickable ${permissions.financial_reports ? "active" : "disabled"}`}
                onClick={() =>
                  handleOpenResource("payroll", "Compensation & Financial Vault", Boolean(permissions.financial_reports))
                }
              >
                <span>Payroll & Finance</span>
                <strong>
                  {permissions.financial_reports ? (
                    <span className="online">Available ↗</span>
                  ) : (
                    <span className="restricted">🔒 Restricted (Click to inspect)</span>
                  )}
                </strong>
                <small className="module-desc">Executive invoices & payroll</small>
              </div>
            </div>
          </div>
        </section>

        {/* Attendance Summary */}
        <section className="application-panel attendance-summary-panel">
          <div className="panel-header">
            <div>
              <span className="eyebrow">YOUR ATTENDANCE TELEMETRY</span>
              <h2>Verified Work Hours & Attendance Summary</h2>
            </div>
            <span className="badge-attendance-rate">
              ★ {attendance.rate}% Attendance Score
            </span>
          </div>

          <div className="attendance-personal-grid">
            <div className="p-card">
              <span>Days Present</span>
              <strong>{attendance.daysPresent} / {attendance.totalDays} Days</strong>
              <small className="online">Active in Good Standing</small>
            </div>

            <div className="p-card">
              <span>Today's Check-in</span>
              <strong>{attendance.checkIn}</strong>
              <small className="online">Biometric / Gateway Logged</small>
            </div>

            <div className="p-card">
              <span>Avg Daily Hours</span>
              <strong>{attendance.avgHours} Hours/Day</strong>
              <small>Target: 8.0 Hours</small>
            </div>
          </div>

          <div className="portal-content attendance-mini-chart">
            <h4>Weekly Working Hours (Monday – Friday)</h4>
            <div className="week-bars">
              {attendance.weekly?.map((w, i) => (
                <div key={i} className="day-col">
                  <div className="day-bar-track">
                    <div
                      className="day-bar-fill"
                      style={{ height: `${Math.min(100, (w.hours / 10) * 100)}%` }}
                    ></div>
                  </div>
                  <span className="day-hours">{w.hours}h</span>
                  <span className="day-name">{w.day}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* POPUP MODAL: FUNNY BLANK STATE OR AVAILABLE DOCUMENT VIEWER */}
      {activeModal && (
        <div className="modal-backdrop" onClick={() => setActiveModal(null)}>
          <div
            className="modal-content funny-vault-modal"
            onClick={(e) => e.stopPropagation()}
          >
            {activeModal.isAllowed ? (
              /* Allowed Document State */
              <div className="allowed-document-view">
                <div className="modal-header">
                  <div>
                    <span className="eyebrow">AUTHORIZED DOCUMENT VAULT</span>
                    <h3>📄 {activeModal.title}</h3>
                  </div>
                  <button className="modal-close" onClick={() => setActiveModal(null)}>✕</button>
                </div>
                <div className="doc-content-body">
                  <div className="doc-meta-banner">
                    <span>Classification: Internal Staff Only</span>
                    <strong className="online">✓ Decrypted & Verified</strong>
                  </div>
                  <p>
                    Hello <strong>{user.name}</strong>, your access token for <code>{activeModal.key}</code> has been evaluated and approved by Administrator Access Policy.
                  </p>
                  <div className="mock-doc-lines">
                    <div className="doc-line title-line">SECUREGATE INTERNAL DOCUMENTATION v4.2</div>
                    <div className="doc-line">• Organization: SecureGate Enterprise Operations</div>
                    <div className="doc-line">• Department: {user.department || "Engineering"}</div>
                    <div className="doc-line">• Status: Active Policy Compliant (Token ID: #{Math.floor(Math.random() * 89999 + 10000)})</div>
                    <div className="doc-line">• All telemetry and download logs are monitored under Zero Trust protocol.</div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button className="btn-cancel" onClick={() => setActiveModal(null)}>Close Document</button>
                </div>
              </div>
            ) : (
              /* Funny Restricted Blank State */
              <div className="funny-restricted-view">
                <div className="modal-header">
                  <span className="funny-badge">🙈 403: TOP SECRET VAULT</span>
                  <button className="modal-close" onClick={() => setActiveModal(null)}>✕</button>
                </div>
                <div className="funny-body">
                  <div className="funny-art-container">
                    <div className="funny-emoji-bounce">🙈🚪💨</div>
                    <div className="blank-frame">
                      <div className="dust-particle">🌪️</div>
                      <p className="blank-text">[ LITERALLY NOTHING HERE ]</p>
                      <small>Not a single byte for unassigned eyes!</small>
                    </div>
                  </div>

                  <h2>Nothing there! Please close 👀</h2>
                  <p className="funny-subtext">
                    Hey <strong>{user.name}</strong>! Your admin has NOT assigned you access to <strong>{activeModal.title}</strong>.
                  </p>
                  <div className="funny-quote-box">
                    "There are no documents, no secret memos, and definitely no snacks here. Please close this window before security takes notice! 🏃‍♂️💨"
                  </div>
                </div>

                <div className="modal-footer funny-footer">
                  <button
                    className="btn-save btn-funny-close"
                    onClick={() => setActiveModal(null)}
                  >
                    🚶 Close & Walk Away Quietly
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
