import { useState, useEffect } from "react";
import "./App.css";
import AdminPortal from "./components/AdminPortal";
import StaffPortal from "./components/StaffPortal";
import { validateIdentity, fetchEmployees, initialEmployees } from "./api";

function App() {
  // Active role portal tab: "employee" or "admin"
  const [activePortalTab, setActivePortalTab] = useState("employee");

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(false);
  const [accessGranted, setAccessGranted] = useState(false);
  const [error, setError] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  const [employees, setEmployees] = useState(initialEmployees);

  const [checks, setChecks] = useState({
    identity: false,
    device: false,
    policy: false,
  });

  // Load employee directory on mount
  useEffect(() => {
    fetchEmployees().then((data) => {
      if (data && data.length > 0) {
        setEmployees(data);
      }
    });
  }, []);

  // When switching tabs, clear inputs or autofill for Admin
  const handleSwitchTab = (tab) => {
    setActivePortalTab(tab);
    setError("");
    if (tab === "admin") {
      setEmail("admin@company.com");
      setPassword("Admin@123");
    } else {
      setEmail("");
      setPassword("");
    }
  };

  const validateAccess = async () => {
    setError("");
    setChecking(true);
    setAccessGranted(false);

    setChecks({
      identity: false,
      device: false,
      policy: false,
    });

    // Step 1: Identity validation
    const result = await validateIdentity(email, password);

    setTimeout(() => {
      if (!result.success || !result.user) {
        setChecking(false);
        setError(result.error || "Identity verification failed.");
        return;
      }

      const verifiedUser = result.user;

      setChecks((prev) => ({
        ...prev,
        identity: true,
      }));

      // Step 2: Device validation (Zero Trust check)
      setTimeout(() => {
        if (verifiedUser.deviceTrusted === false) {
          setChecking(false);
          setError("Device verification failed. Device has been quarantined by administrator.");
          return;
        }

        setChecks((prev) => ({
          ...prev,
          device: true,
        }));

        // Step 3: Policy validation
        setTimeout(() => {
          if (verifiedUser.policyCompliant === false) {
            setChecking(false);
            setError("Access policy violation. Role permissions revoked by Administrator.");
            return;
          }

          setChecks((prev) => ({
            ...prev,
            policy: true,
          }));

          setChecking(false);
          setAuthenticated(true);
          setAccessGranted(true);
          setCurrentUser(verifiedUser);
        }, 700);
      }, 700);
    }, 700);
  };

  const logout = () => {
    setAuthenticated(false);
    setAccessGranted(false);
    setCurrentUser(null);
    setEmail("");
    setPassword("");

    setChecks({
      identity: false,
      device: false,
      policy: false,
    });

    fetchEmployees().then((data) => {
      if (data && data.length > 0) setEmployees(data);
    });
  };

  // If authenticated and access granted
  if (authenticated && accessGranted && currentUser) {
    if (currentUser.role === "ADMIN") {
      return (
        <AdminPortal
          user={currentUser}
          onLogout={logout}
          employees={employees}
          onEmployeesChange={setEmployees}
        />
      );
    }

    return <StaffPortal user={currentUser} onLogout={logout} />;
  }

  return (
    <div className="login-page">
      {/* Left Hero Section */}
      <div className="login-left">
        <div className="brand login-brand">
          <div className="logo">I</div>
          <div>
            <h2>SecureGate</h2>
            <span>Identity-Aware Proxy</span>
          </div>
        </div>

        <div className="hero">
          <div className="security-pill">
            <span>●</span>
            ZERO TRUST ACCESS
          </div>

          <h1>
            Secure access.
            <br />
            <span>Verified identity.</span>
          </h1>

          <p>
            Access internal applications securely without a traditional VPN. Every
            request is evaluated using identity, device, and security policies.
          </p>

          <div className="features">
            <div className="feature">
              <div>✓</div>
              <span>Identity Verification</span>
            </div>

            <div className="feature">
              <div>✓</div>
              <span>Trusted Device Detection</span>
            </div>

            <div className="feature">
              <div>✓</div>
              <span>Policy-Based Access</span>
            </div>

            <div className="feature">
              <div>✓</div>
              <span>Admin Policy & Workforce Attendance Telemetry</span>
            </div>
          </div>
        </div>

        <div className="left-footer">
          © 2026 SecureGate Security Platform • Enterprise Zero-Trust Proxy
        </div>
      </div>

      {/* Right Login Section with Two-Side Role Portal */}
      <div className="login-right">
        {/* Two-Side / Dual Role Tabs */}
        <div className="portal-role-tabs">
          <button
            type="button"
            className={`role-tab ${activePortalTab === "employee" ? "active" : ""}`}
            onClick={() => handleSwitchTab("employee")}
          >
            👤 Employee Portal
          </button>
          <button
            type="button"
            className={`role-tab ${activePortalTab === "admin" ? "active" : ""}`}
            onClick={() => handleSwitchTab("admin")}
          >
            🛡️ Admin Portal (Auto-Filled)
          </button>
        </div>

        <div className="login-card">
          {activePortalTab === "employee" ? (
            /* EMPLOYEE PORTAL SIDE */
            <div>
              <div className="login-header">
                <div className="shield employee-shield">👤</div>
                <h2>Employee Sign In</h2>
                <p>Private Zero-Trust Portal • Enter your credentials</p>
              </div>

              <div className="form">
                <label>Work ID / Name / Initial</label>
                <div className="input-box">
                  <span>✉</span>
                  <input
                    type="text"
                    placeholder="e.g. m, h, p, r, s, v or your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <label>Password</label>
                <div className="input-box">
                  <span>🔑</span>
                  <input
                    type="password"
                    placeholder="e.g. m@123, h@123, or Staff@123"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                {error && <div className="error">✕ {error}</div>}

                <button
                  className="login-button"
                  onClick={validateAccess}
                  disabled={checking}
                >
                  {checking ? "Verifying Identity..." : "Continue Securely →"}
                </button>
              </div>

              <div className="demo-account privacy-focused">
                <strong>🔒 Zero-Trust Privacy Shield</strong>
                <p>
                  You are accessing your isolated employee container. Other team members’ records and credentials are protected and not visible here.
                </p>
                <div className="quick-hint-box">
                  <span>💡 Quick Access:</span> Use your initial (e.g. <b>m</b> for Mohith, <b>h</b> for Harshith, <b>p</b> for Prasanth, <b>r</b> for Rohith) and password like <b>m@123</b> or <b>Staff@123</b>.
                </div>
              </div>
            </div>
          ) : (
            /* ADMIN PORTAL SIDE */
            <div>
              <div className="login-header">
                <div className="shield admin-shield">🛡️</div>
                <h2>Admin Command Center</h2>
                <p>Global Security & Access Policy Administration</p>
              </div>

              <div className="form">
                <label>Admin Account</label>
                <div className="input-box">
                  <span>✉</span>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <label>Admin Key</label>
                <div className="input-box">
                  <span>🔑</span>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                {error && <div className="error">✕ {error}</div>}

                <button
                  className="login-button admin-btn"
                  onClick={validateAccess}
                  disabled={checking}
                >
                  {checking ? "Verifying Root Identity..." : "Authenticate as Admin →"}
                </button>
              </div>

              <div className="demo-account admin-box">
                <strong>🛡️ Admin Credentials Auto-Filled</strong>
                <p>Account: <b>admin@company.com</b></p>
                <p>Password: <b>Admin@123</b></p>
                <small>Full governance over employee permissions, fixed passwords & attendance.</small>
              </div>
            </div>
          )}

          <div className="trust-message">
            🔒 Your access is protected by identity-aware security
          </div>
        </div>

        {/* 3-Step Verification Drawer */}
        {checking && (
          <div className="verification">
            <div className="verification-title">Security verification</div>

            <div className="check">
              <span className={checks.identity ? "done" : ""}>
                {checks.identity ? "✓" : "○"}
              </span>
              Identity verification
              <small>{checks.identity ? "Verified" : "Checking..."}</small>
            </div>

            <div className="check">
              <span className={checks.device ? "done" : ""}>
                {checks.device ? "✓" : "○"}
              </span>
              Device verification
              <small>{checks.device ? "Trusted" : "Waiting"}</small>
            </div>

            <div className="check">
              <span className={checks.policy ? "done" : ""}>
                {checks.policy ? "✓" : "○"}
              </span>
              Access policy
              <small>{checks.policy ? "Allowed" : "Waiting"}</small>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
