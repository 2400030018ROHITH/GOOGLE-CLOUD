import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-Memory Database
let users = [
  {
    id: "emp-1",
    name: "Rohith Kumar",
    email: "staff@company.com",
    password: "Staff@123",
    role: "STAFF",
    department: "Core Engineering",
    device: "Company Windows Device",
    deviceTrusted: true,
    policyCompliant: true,
    policyName: "Staff Application Policy",
    avatar: "RK",
    permissions: {
      employee_records: true,
      company_documents: true,
      system_status: true,
      cloud_console: false,
      financial_reports: false,
    },
    attendance: {
      rate: 96,
      daysPresent: 22,
      totalDays: 23,
      avgHours: 8.4,
      checkIn: "09:15 AM",
      weekly: [
        { day: "Mon", hours: 8.5, status: "Present" },
        { day: "Tue", hours: 8.2, status: "Present" },
        { day: "Wed", hours: 9.0, status: "Present" },
        { day: "Thu", hours: 8.1, status: "Present" },
        { day: "Fri", hours: 8.3, status: "Present" },
      ],
    },
  },
  {
    id: "emp-2",
    name: "Sandeep",
    email: "sandeep@company.com",
    password: "Staff@123",
    role: "STAFF",
    department: "Backend Services",
    device: "Managed macOS M2",
    deviceTrusted: true,
    policyCompliant: true,
    policyName: "Backend Services Policy",
    avatar: "SN",
    permissions: {
      employee_records: true,
      company_documents: true,
      system_status: false,
      cloud_console: true,
      financial_reports: false,
    },
    attendance: {
      rate: 92,
      daysPresent: 21,
      totalDays: 23,
      avgHours: 8.1,
      checkIn: "09:30 AM",
      weekly: [
        { day: "Mon", hours: 8.0, status: "Present" },
        { day: "Tue", hours: 8.5, status: "Present" },
        { day: "Wed", hours: 7.8, status: "Present" },
        { day: "Thu", hours: 8.2, status: "Present" },
        { day: "Fri", hours: 8.0, status: "Present" },
      ],
    },
  },
  {
    id: "emp-3",
    name: "Vidhyananth",
    email: "vidhyananth@company.com",
    password: "Staff@123",
    role: "STAFF",
    department: "DevOps & Cloud",
    device: "Managed Ubuntu Workstation",
    deviceTrusted: true,
    policyCompliant: true,
    policyName: "DevOps Security Policy",
    avatar: "VN",
    permissions: {
      employee_records: false,
      company_documents: true,
      system_status: true,
      cloud_console: true,
      financial_reports: false,
    },
    attendance: {
      rate: 98,
      daysPresent: 23,
      totalDays: 23,
      avgHours: 8.7,
      checkIn: "08:55 AM",
      weekly: [
        { day: "Mon", hours: 8.8, status: "Present" },
        { day: "Tue", hours: 9.1, status: "Present" },
        { day: "Wed", hours: 8.6, status: "Present" },
        { day: "Thu", hours: 8.4, status: "Present" },
        { day: "Fri", hours: 8.6, status: "Present" },
      ],
    },
  },
  {
    id: "emp-4",
    name: "Prasanth",
    email: "prasanth@company.com",
    password: "Staff@123",
    role: "STAFF",
    department: "Human Resources",
    device: "Company Windows Device",
    deviceTrusted: true,
    policyCompliant: true,
    policyName: "HR Personnel Policy",
    avatar: "PR",
    permissions: {
      employee_records: true,
      company_documents: true,
      system_status: false,
      cloud_console: false,
      financial_reports: true,
    },
    attendance: {
      rate: 91,
      daysPresent: 20,
      totalDays: 23,
      avgHours: 7.9,
      checkIn: "09:40 AM",
      weekly: [
        { day: "Mon", hours: 8.0, status: "Present" },
        { day: "Tue", hours: 7.5, status: "Present" },
        { day: "Wed", hours: 8.0, status: "Present" },
        { day: "Thu", hours: 8.2, status: "Present" },
        { day: "Fri", hours: 7.8, status: "Present" },
      ],
    },
  },
  {
    id: "emp-5",
    name: "Mohith",
    email: "mohith@company.com",
    password: "Staff@123",
    role: "STAFF",
    department: "Security Operations",
    device: "Company Windows Device",
    deviceTrusted: true,
    policyCompliant: true,
    policyName: "Security Audit Policy",
    avatar: "MO",
    permissions: {
      employee_records: true,
      company_documents: true,
      system_status: true,
      cloud_console: false,
      financial_reports: false,
    },
    attendance: {
      rate: 95,
      daysPresent: 22,
      totalDays: 23,
      avgHours: 8.3,
      checkIn: "09:05 AM",
      weekly: [
        { day: "Mon", hours: 8.4, status: "Present" },
        { day: "Tue", hours: 8.3, status: "Present" },
        { day: "Wed", hours: 8.5, status: "Present" },
        { day: "Thu", hours: 8.0, status: "Present" },
        { day: "Fri", hours: 8.3, status: "Present" },
      ],
    },
  },
  {
    id: "emp-6",
    name: "Harshith",
    email: "harshith@company.com",
    password: "Staff@123",
    role: "STAFF",
    department: "QA & Testing",
    device: "Managed macOS M3",
    deviceTrusted: true,
    policyCompliant: true,
    policyName: "QA Staff Policy",
    avatar: "HA",
    permissions: {
      employee_records: true,
      company_documents: true,
      system_status: true,
      cloud_console: false,
      financial_reports: false,
    },
    attendance: {
      rate: 94,
      daysPresent: 21,
      totalDays: 23,
      avgHours: 8.2,
      checkIn: "09:20 AM",
      weekly: [
        { day: "Mon", hours: 8.1, status: "Present" },
        { day: "Tue", hours: 8.2, status: "Present" },
        { day: "Wed", hours: 8.4, status: "Present" },
        { day: "Thu", hours: 8.0, status: "Present" },
        { day: "Fri", hours: 8.3, status: "Present" },
      ],
    },
  },
  {
    id: "admin-1",
    name: "Admin Controller",
    email: "admin@company.com",
    password: "Admin@123",
    role: "ADMIN",
    department: "Security Architecture",
    device: "SecOps Admin Terminal",
    deviceTrusted: true,
    policyCompliant: true,
    policyName: "Global Security Administrator",
    avatar: "AD",
    permissions: {
      employee_records: true,
      company_documents: true,
      system_status: true,
      cloud_console: true,
      financial_reports: true,
    },
    attendance: {
      rate: 100,
      daysPresent: 23,
      totalDays: 23,
      avgHours: 9.0,
      checkIn: "08:30 AM",
      weekly: [
        { day: "Mon", hours: 9.0, status: "Present" },
        { day: "Tue", hours: 9.2, status: "Present" },
        { day: "Wed", hours: 9.0, status: "Present" },
        { day: "Thu", hours: 8.8, status: "Present" },
        { day: "Fri", hours: 9.0, status: "Present" },
      ],
    },
  },
];

// Helper: safe user info (without exposing passwords to client in list)
const formatUser = (u) => {
  const { password, ...safe } = u;
  return safe;
};

// API: Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString() });
});

// API: Validate Identity (IAP Step 1)
app.post("/api/auth/validate-identity", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, error: "Username/Email and password required." });
  }

  const query = email.trim().toLowerCase();
  const pwd = password.trim();

  // Find user by full email, or matching name prefix / initial
  let user = users.find((u) => u.email.toLowerCase() === query);

  if (!user) {
    // Check initial or name match:
    // 'r' -> Rohith, 'm' -> Mohith, 'h' -> Harshith, 's' -> Sandeep, 'v' -> Vidhyananth, 'p' -> Prasanth
    if (query === "admin" || query === "a") {
      user = users.find((u) => u.role === "ADMIN");
    } else if (query === "r" || query === "rohith" || query === "rohit" || query.startsWith("rohith@")) {
      user = users.find((u) => u.name.toLowerCase().includes("rohith"));
    } else if (query === "m" || query === "mohith" || query === "mohit" || query.startsWith("mohith@")) {
      user = users.find((u) => u.name.toLowerCase().includes("mohith"));
    } else if (query === "h" || query === "harshith" || query === "harshit" || query.startsWith("harshith@")) {
      user = users.find((u) => u.name.toLowerCase().includes("harshith"));
    } else if (query === "s" || query === "sandeep" || query.startsWith("sandeep@")) {
      user = users.find((u) => u.name.toLowerCase().includes("sandeep"));
    } else if (query === "v" || query === "vidhyananth" || query === "vidhya" || query.startsWith("vidhyananth@")) {
      user = users.find((u) => u.name.toLowerCase().includes("vidhyananth"));
    } else if (query === "p" || query === "prasanth" || query === "prashanth" || query.startsWith("prasanth@")) {
      user = users.find((u) => u.name.toLowerCase().includes("prasanth"));
    } else {
      // General search by name or email prefix
      user = users.find(
        (u) =>
          u.name.toLowerCase().startsWith(query) ||
          u.email.toLowerCase().startsWith(query)
      );
    }
  }

  if (!user) {
    return res.status(401).json({
      success: false,
      error: "Employee identity not found in directory.",
    });
  }

  // Password validation:
  // For Admin: exact password check
  // For Employees: exact match OR "Staff@123" OR pattern like [letter]@[numbers] (e.g. m@123, h@123, p@123)
  const isEmployeePattern = /^[a-zA-Z]@[0-9]+/i.test(pwd);
  const isValidPassword =
    user.role === "ADMIN"
      ? user.password === pwd
      : user.password === pwd || pwd === "Staff@123" || isEmployeePattern;

  if (!isValidPassword) {
    return res.status(401).json({
      success: false,
      error: "Invalid password for this account.",
    });
  }

  res.json({
    success: true,
    user: formatUser(user),
  });
});

// API: Get All Employees (Admin portal)
app.get("/api/employees", (req, res) => {
  res.json({
    success: true,
    employees: users.map((u) => ({
      ...formatUser(u),
      hasPasswordConfigured: Boolean(u.password),
    })),
  });
});

// API: Add New Member
app.post("/api/employees", (req, res) => {
  const { name, email, department, role = "STAFF", device = "Company Windows Device", password = "Staff@123", permissions } = req.body;

  if (!name || !email) {
    return res.status(400).json({ success: false, error: "Name and email are required." });
  }

  const existing = users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
  if (existing) {
    return res.status(400).json({ success: false, error: "A member with this email already exists." });
  }

  const initials = name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "EM";

  const newEmployee = {
    id: `emp-${Date.now()}`,
    name: name.trim(),
    email: email.trim().toLowerCase(),
    password: password || "Staff@123",
    role: role.toUpperCase(),
    department: department || "General Staff",
    device: device || "Company Windows Device",
    deviceTrusted: true,
    policyCompliant: true,
    policyName: `${role.toUpperCase()} Application Policy`,
    avatar: initials,
    permissions: permissions || {
      employee_records: true,
      company_documents: true,
      system_status: true,
      cloud_console: false,
      financial_reports: false,
    },
    attendance: {
      rate: 100,
      daysPresent: 1,
      totalDays: 1,
      avgHours: 8.0,
      checkIn: "09:00 AM",
      weekly: [
        { day: "Mon", hours: 8.0, status: "Present" },
        { day: "Tue", hours: 8.0, status: "Present" },
        { day: "Wed", hours: 8.0, status: "Present" },
        { day: "Thu", hours: 8.0, status: "Present" },
        { day: "Fri", hours: 8.0, status: "Present" },
      ],
    },
  };

  users.push(newEmployee);
  res.status(201).json({ success: true, employee: formatUser(newEmployee) });
});

// API: Update Employee Permissions (Admin assigns what employee can do/access)
app.patch("/api/employees/:id/permissions", (req, res) => {
  const { id } = req.params;
  const { permissions } = req.body;

  const user = users.find((u) => u.id === id);
  if (!user) {
    return res.status(404).json({ success: false, error: "Employee not found." });
  }

  user.permissions = { ...user.permissions, ...permissions };
  res.json({ success: true, employee: formatUser(user) });
});

// API: Set / Change Fixed Password for Employee (Admin fixed password)
app.patch("/api/employees/:id/password", (req, res) => {
  const { id } = req.params;
  const { newPassword } = req.body;

  if (!newPassword || newPassword.trim().length < 4) {
    return res.status(400).json({ success: false, error: "Password must be at least 4 characters long." });
  }

  const user = users.find((u) => u.id === id);
  if (!user) {
    return res.status(404).json({ success: false, error: "Employee not found." });
  }

  user.password = newPassword.trim();
  res.json({ success: true, message: `Fixed password updated for ${user.name}.` });
});

// API: Toggle Device Trust or Policy Compliance (for Zero Trust demonstration)
app.patch("/api/employees/:id/security-state", (req, res) => {
  const { id } = req.params;
  const { deviceTrusted, policyCompliant } = req.body;

  const user = users.find((u) => u.id === id);
  if (!user) {
    return res.status(404).json({ success: false, error: "Employee not found." });
  }

  if (deviceTrusted !== undefined) user.deviceTrusted = Boolean(deviceTrusted);
  if (policyCompliant !== undefined) user.policyCompliant = Boolean(policyCompliant);

  res.json({ success: true, employee: formatUser(user) });
});

// API: Attendance Analytics
app.get("/api/attendance", (req, res) => {
  const staffOnly = users.filter((u) => u.role === "STAFF");
  const avgRate = Math.round(
    staffOnly.reduce((acc, u) => acc + (u.attendance?.rate || 90), 0) / (staffOnly.length || 1)
  );

  res.json({
    success: true,
    companyAverageRate: avgRate,
    totalStaff: staffOnly.length,
    presentToday: staffOnly.length,
    records: staffOnly.map((u) => ({
      id: u.id,
      name: u.name,
      department: u.department,
      attendance: u.attendance,
    })),
  });
});

app.listen(PORT, () => {
  console.log(`IAP Backend Server listening on http://localhost:${PORT}`);
});
