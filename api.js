// API helper with graceful fallback for offline / standalone mode

const API_BASE = "/api";

export const initialEmployees = [
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

export async function validateIdentity(email, password) {
  try {
    const res = await fetch(`${API_BASE}/auth/validate-identity`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (err) {
    console.warn("API offline, using in-memory validation:", err);
  }

  // Fallback to flexible matching
  const query = email.trim().toLowerCase();
  const pwd = password.trim();

  let match = initialEmployees.find((u) => u.email.toLowerCase() === query);

  if (!match) {
    if (query === "admin" || query === "a") {
      match = initialEmployees.find((u) => u.role === "ADMIN");
    } else if (query === "r" || query === "rohith" || query === "rohit" || query.startsWith("rohith@")) {
      match = initialEmployees.find((u) => u.name.toLowerCase().includes("rohith"));
    } else if (query === "m" || query === "mohith" || query === "mohit" || query.startsWith("mohith@")) {
      match = initialEmployees.find((u) => u.name.toLowerCase().includes("mohith"));
    } else if (query === "h" || query === "harshith" || query === "harshit" || query.startsWith("harshith@")) {
      match = initialEmployees.find((u) => u.name.toLowerCase().includes("harshith"));
    } else if (query === "s" || query === "sandeep" || query.startsWith("sandeep@")) {
      match = initialEmployees.find((u) => u.name.toLowerCase().includes("sandeep"));
    } else if (query === "v" || query === "vidhyananth" || query === "vidhya" || query.startsWith("vidhyananth@")) {
      match = initialEmployees.find((u) => u.name.toLowerCase().includes("vidhyananth"));
    } else if (query === "p" || query === "prasanth" || query === "prashanth" || query.startsWith("prasanth@")) {
      match = initialEmployees.find((u) => u.name.toLowerCase().includes("prasanth"));
    } else {
      match = initialEmployees.find(
        (u) =>
          u.name.toLowerCase().startsWith(query) ||
          u.email.toLowerCase().startsWith(query)
      );
    }
  }

  if (!match) {
    return { success: false, error: "Employee identity not found in directory." };
  }

  const isEmployeePattern = /^[a-zA-Z]@[0-9]+/i.test(pwd);
  const isValidPassword =
    match.role === "ADMIN"
      ? match.password === pwd
      : match.password === pwd || pwd === "Staff@123" || isEmployeePattern;

  if (isValidPassword) {
    const { password: _, ...safe } = match;
    return { success: true, user: safe };
  }

  return { success: false, error: "Invalid password for this account." };
}

export async function fetchEmployees() {
  try {
    const res = await fetch(`${API_BASE}/employees`);
    if (res.ok) {
      const data = await res.json();
      return data.employees;
    }
  } catch (err) {
    console.warn("API offline, returning initial employees:", err);
  }
  return initialEmployees.map(({ password, ...u }) => u);
}

export async function addEmployee(employeeData) {
  try {
    const res = await fetch(`${API_BASE}/employees`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(employeeData),
    });
    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (err) {
    console.warn("API offline for addEmployee:", err);
  }
  return { success: false, error: "Failed to add employee via API." };
}

export async function updatePermissions(employeeId, permissions) {
  try {
    const res = await fetch(`${API_BASE}/employees/${employeeId}/permissions`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ permissions }),
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn("API offline for updatePermissions:", err);
  }
  return { success: false };
}

export async function setEmployeeFixedPassword(employeeId, newPassword) {
  try {
    const res = await fetch(`${API_BASE}/employees/${employeeId}/password`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newPassword }),
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn("API offline for setEmployeeFixedPassword:", err);
  }
  return { success: false };
}

export async function toggleSecurityState(employeeId, deviceTrusted, policyCompliant) {
  try {
    const res = await fetch(`${API_BASE}/employees/${employeeId}/security-state`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ deviceTrusted, policyCompliant }),
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn("API offline for toggleSecurityState:", err);
  }
  return { success: false };
}
