import { useState } from "react";
import AttendanceGraph from "./AttendanceGraph";
import { updatePermissions, setEmployeeFixedPassword, toggleSecurityState, addEmployee } from "../api";

export default function AdminPortal({ user, onLogout, employees = [], onEmployeesChange }) {
  const [localEmployees, setLocalEmployees] = useState(employees);
  const [statusMessage, setStatusMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Modals state
  const [showAddModal, setShowAddModal] = useState(false);
  const [passwordModalEmp, setPasswordModalEmp] = useState(null);
  const [fixedPasswordInput, setFixedPasswordInput] = useState("Fixed@123");

  // New member form state
  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    department: "Engineering",
    role: "STAFF",
    device: "Company Windows Device",
    password: "Staff@123",
    permissions: {
      employee_records: true,
      company_documents: true,
      system_status: true,
      cloud_console: false,
      financial_reports: false,
    },
  });

  const showNotification = (msg) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(""), 4000);
  };

  // Toggle permission for an employee
  const handleTogglePermission = async (empId, permKey) => {
    const target = localEmployees.find((e) => e.id === empId);
    if (!target) return;

    const newPerms = {
      ...target.permissions,
      [permKey]: !target.permissions[permKey],
    };

    const updated = localEmployees.map((e) =>
      e.id === empId ? { ...e, permissions: newPerms } : e
    );
    setLocalEmployees(updated);
    if (onEmployeesChange) onEmployeesChange(updated);

    await updatePermissions(empId, newPerms);
    showNotification(`Updated ${permKey.replace("_", " ")} access for ${target.name}.`);
  };

  // Toggle device trust or policy compliance
  const handleToggleDeviceTrust = async (empId) => {
    const target = localEmployees.find((e) => e.id === empId);
    if (!target) return;

    const newTrust = !target.deviceTrusted;
    const updated = localEmployees.map((e) =>
      e.id === empId ? { ...e, deviceTrusted: newTrust } : e
    );
    setLocalEmployees(updated);
    if (onEmployeesChange) onEmployeesChange(updated);

    await toggleSecurityState(empId, newTrust, target.policyCompliant);
    showNotification(
      `${target.name}'s device marked as ${newTrust ? "Trusted" : "Untrusted / Quarantined"}.`
    );
  };

  // Submit fixed password
  const handleSaveFixedPassword = async () => {
    if (!passwordModalEmp || !fixedPasswordInput) return;

    await setEmployeeFixedPassword(passwordModalEmp.id, fixedPasswordInput);
    showNotification(`Fixed password set for ${passwordModalEmp.name} to: "${fixedPasswordInput}"`);
    setPasswordModalEmp(null);
  };

  // Submit new member
  const handleCreateMember = async (e) => {
    e.preventDefault();
    if (!newMember.name || !newMember.email) {
      alert("Name and email are required!");
      return;
    }

    const res = await addEmployee(newMember);
    if (res && res.success) {
      const added = res.employee;
      const updated = [...localEmployees, added];
      setLocalEmployees(updated);
      if (onEmployeesChange) onEmployeesChange(updated);
      showNotification(`Added new member: ${added.name} (${added.email})`);
      setShowAddModal(false);
      setNewMember({
        name: "",
        email: "",
        department: "Engineering",
        role: "STAFF",
        device: "Company Windows Device",
        password: "Staff@123",
        permissions: {
          employee_records: true,
          company_documents: true,
          system_status: true,
          cloud_console: false,
          financial_reports: false,
        },
      });
    } else {
      alert(res?.error || "Error adding employee");
    }
  };

  const filteredEmployees = localEmployees
    .filter((e) => e.role === "STAFF")
    .filter(
      (e) =>
        e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.department.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="app admin-view">
      {/* Navbar */}
      <nav className="navbar">
        <div className="brand">
          <div className="logo admin-logo-badge">🛡️</div>
          <div>
            <h2>SecureGate Admin</h2>
            <span>Identity-Aware Proxy • Management Console</span>
          </div>
        </div>

        <div className="nav-right">
          <div className="user-info">
            <div className="avatar admin-avatar">AD</div>
            <div>
              <strong>{user.name}</strong>
              <small className="admin-tag">SECURITY ADMINISTRATOR</small>
            </div>
          </div>

          <button className="logout" onClick={onLogout}>
            Logout
          </button>
        </div>
      </nav>

      {/* Main Container */}
      <main className="dashboard admin-dashboard">
        {/* Toast Status Message */}
        {statusMessage && (
          <div className="status-toast">
            <span>✓</span> {statusMessage}
          </div>
        )}

        {/* Welcome Banner */}
        <section className="welcome">
          <div>
            <p className="eyebrow">GLOBAL ACCESS CONTROL & POLICY GOVERNANCE</p>
            <h1>Administrator Command Center</h1>
            <p>
              Manage workforce identities, assign granular resource permissions, enforce zero-trust policies, and review attendance logs.
            </p>
          </div>

          <div className="admin-pill-badge">
            <span>●</span>
            ROOT PRIVILEGES ACTIVE
          </div>
        </section>

        {/* Security & System Metric Cards */}
        <section className="security-grid admin-metrics-grid">
          <div className="security-card">
            <div className="card-icon">👥</div>
            <div>
              <span>PERSONNEL DIRECTORY</span>
              <h3>{filteredEmployees.length} Employees</h3>
              <p>Rohith, Sandeep, Vidhyananth, Prasanth...</p>
            </div>
          </div>

          <div className="security-card">
            <div className="card-icon">📊</div>
            <div>
              <span>ATTENDANCE TELEMETRY</span>
              <h3>95.2% Overall</h3>
              <p>All members active & verified</p>
            </div>
          </div>

          <div className="security-card">
            <div className="card-icon">🔒</div>
            <div>
              <span>ZERO TRUST POLICIES</span>
              <h3>Active Enforced</h3>
              <p>Device & Identity Gateway Enabled</p>
            </div>
          </div>
        </section>

        {/* Telemetry & Attendance Graphs Section */}
        <section className="analytics-section">
          <AttendanceGraph employees={localEmployees} />
        </section>

        {/* Employee Permissions & Access Assignment Matrix */}
        <section className="application-panel admin-management-panel">
          <div className="panel-header">
            <div>
              <span className="eyebrow">POLICY & ACCESS ASSIGNMENT</span>
              <h2>Employee Access Control Matrix</h2>
              <p className="subtext">
                Assign and revoke what each employee can access in real-time. Changes instantly take effect upon login.
              </p>
            </div>

            <div className="panel-actions">
              <input
                type="text"
                className="search-input"
                placeholder="Search by name, email, department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <button className="add-member-btn" onClick={() => setShowAddModal(true)}>
                + Add New Member
              </button>
            </div>
          </div>

          {/* Employee Table */}
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Device Status</th>
                  <th>Policy Compliance</th>
                  <th>Assigned Permissions (Click to Toggle)</th>
                  <th>Admin Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((emp) => (
                  <tr key={emp.id}>
                    <td>
                      <div className="emp-cell">
                        <div className="avatar-small">{emp.avatar || "EM"}</div>
                        <div>
                          <strong>{emp.name}</strong>
                          <span className="emp-email">{emp.email}</span>
                          <span className="emp-dept">{emp.department}</span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <button
                        className={`trust-badge-btn ${emp.deviceTrusted ? "trusted" : "untrusted"}`}
                        onClick={() => handleToggleDeviceTrust(emp.id)}
                        title="Click to toggle Device Trust (Zero-Trust Simulation)"
                      >
                        {emp.deviceTrusted ? "✓ Trusted Device" : "✕ Quarantined"}
                      </button>
                      <small className="device-desc">{emp.device}</small>
                    </td>

                    <td>
                      <span className="badge-compliant">
                        {emp.policyCompliant ? "✓ Compliant" : "✕ Violation"}
                      </span>
                      <small className="policy-name">{emp.policyName}</small>
                    </td>

                    <td>
                      <div className="permissions-toggle-group">
                        <label className={`perm-chip ${emp.permissions?.employee_records ? "active" : ""}`}>
                          <input
                            type="checkbox"
                            checked={Boolean(emp.permissions?.employee_records)}
                            onChange={() => handleTogglePermission(emp.id, "employee_records")}
                          />
                          Records
                        </label>

                        <label className={`perm-chip ${emp.permissions?.company_documents ? "active" : ""}`}>
                          <input
                            type="checkbox"
                            checked={Boolean(emp.permissions?.company_documents)}
                            onChange={() => handleTogglePermission(emp.id, "company_documents")}
                          />
                          Documents
                        </label>

                        <label className={`perm-chip ${emp.permissions?.system_status ? "active" : ""}`}>
                          <input
                            type="checkbox"
                            checked={Boolean(emp.permissions?.system_status)}
                            onChange={() => handleTogglePermission(emp.id, "system_status")}
                          />
                          System
                        </label>

                        <label className={`perm-chip ${emp.permissions?.cloud_console ? "active" : ""}`}>
                          <input
                            type="checkbox"
                            checked={Boolean(emp.permissions?.cloud_console)}
                            onChange={() => handleTogglePermission(emp.id, "cloud_console")}
                          />
                          Cloud
                        </label>

                        <label className={`perm-chip ${emp.permissions?.financial_reports ? "active" : ""}`}>
                          <input
                            type="checkbox"
                            checked={Boolean(emp.permissions?.financial_reports)}
                            onChange={() => handleTogglePermission(emp.id, "financial_reports")}
                          />
                          Payroll
                        </label>
                      </div>
                    </td>

                    <td>
                      <button
                        className="btn-action-password"
                        onClick={() => {
                          setPasswordModalEmp(emp);
                          setFixedPasswordInput("Staff@123");
                        }}
                        title="Set a fixed password for this user"
                      >
                        🔑 Set Fixed Password
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* MODAL: Set Fixed Password */}
      {passwordModalEmp && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Set Fixed Password</h3>
              <button className="modal-close" onClick={() => setPasswordModalEmp(null)}>✕</button>
            </div>
            <div className="modal-body">
              <p>
                Set a fixed password for <strong>{passwordModalEmp.name}</strong> (<code>{passwordModalEmp.email}</code>).
              </p>
              <label className="modal-label">Fixed Password</label>
              <input
                type="text"
                className="modal-input"
                value={fixedPasswordInput}
                onChange={(e) => setFixedPasswordInput(e.target.value)}
                placeholder="Enter new fixed password"
              />
              <small className="help-text">
                The employee will immediately be able to sign in using this fixed password.
              </small>
            </div>
            <div className="modal-footer">
              <button className="btn-cancel" onClick={() => setPasswordModalEmp(null)}>Cancel</button>
              <button className="btn-save" onClick={handleSaveFixedPassword}>Save Fixed Password</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Add New Member */}
      {showAddModal && (
        <div className="modal-backdrop">
          <div className="modal-content large">
            <div className="modal-header">
              <h3>Add New Employee Member</h3>
              <button className="modal-close" onClick={() => setShowAddModal(false)}>✕</button>
            </div>
            <form onSubmit={handleCreateMember}>
              <div className="modal-body form-grid">
                <div>
                  <label className="modal-label">Full Name</label>
                  <input
                    type="text"
                    required
                    className="modal-input"
                    placeholder="e.g. Karthik Sharma"
                    value={newMember.name}
                    onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                  />
                </div>

                <div>
                  <label className="modal-label">Work Email</label>
                  <input
                    type="email"
                    required
                    className="modal-input"
                    placeholder="e.g. karthik@company.com"
                    value={newMember.email}
                    onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                  />
                </div>

                <div>
                  <label className="modal-label">Department</label>
                  <input
                    type="text"
                    className="modal-input"
                    placeholder="e.g. Product Engineering"
                    value={newMember.department}
                    onChange={(e) => setNewMember({ ...newMember, department: e.target.value })}
                  />
                </div>

                <div>
                  <label className="modal-label">Fixed Initial Password</label>
                  <input
                    type="text"
                    className="modal-input"
                    value={newMember.password}
                    onChange={(e) => setNewMember({ ...newMember, password: e.target.value })}
                  />
                </div>

                <div className="full-width">
                  <label className="modal-label">Device Assignment</label>
                  <input
                    type="text"
                    className="modal-input"
                    value={newMember.device}
                    onChange={(e) => setNewMember({ ...newMember, device: e.target.value })}
                  />
                </div>

                <div className="full-width">
                  <label className="modal-label">Initial Resource Access</label>
                  <div className="checkbox-row">
                    <label>
                      <input
                        type="checkbox"
                        checked={newMember.permissions.employee_records}
                        onChange={(e) =>
                          setNewMember({
                            ...newMember,
                            permissions: { ...newMember.permissions, employee_records: e.target.checked },
                          })
                        }
                      />
                      Employee Records
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        checked={newMember.permissions.company_documents}
                        onChange={(e) =>
                          setNewMember({
                            ...newMember,
                            permissions: { ...newMember.permissions, company_documents: e.target.checked },
                          })
                        }
                      />
                      Documents
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        checked={newMember.permissions.system_status}
                        onChange={(e) =>
                          setNewMember({
                            ...newMember,
                            permissions: { ...newMember.permissions, system_status: e.target.checked },
                          })
                        }
                      />
                      System Status
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        checked={newMember.permissions.cloud_console}
                        onChange={(e) =>
                          setNewMember({
                            ...newMember,
                            permissions: { ...newMember.permissions, cloud_console: e.target.checked },
                          })
                        }
                      />
                      Cloud Console
                    </label>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-cancel" onClick={() => setShowAddModal(false)}>Cancel</button>
                <button type="submit" className="btn-save">+ Create Member</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
