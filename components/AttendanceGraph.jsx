import { useState } from "react";

export default function AttendanceGraph({ employees = [] }) {
  const staff = employees.filter((e) => e.role === "STAFF");
  const [selectedEmpId, setSelectedEmpId] = useState(staff[0]?.id || "");

  const activeEmp = staff.find((e) => e.id === selectedEmpId) || staff[0];

  return (
    <div className="attendance-card">
      <div className="attendance-header">
        <div>
          <span className="eyebrow">WORKFORCE TELEMETRY & ATTENDANCE</span>
          <h2>Employee Attendance & Hours Analytics</h2>
          <p>Real-time attendance rates, check-in logs, and daily hour tracking evaluated post-admin verification.</p>
        </div>
        <div className="attendance-stats-pill">
          <span className="dot online">●</span>
          <strong>95.2% Avg Attendance</strong>
          <small>{staff.length} Active Staff</small>
        </div>
      </div>

      <div className="attendance-grid-layout">
        {/* Left Column: Bar Graph Comparing All Employees */}
        <div className="chart-box">
          <div className="chart-title-bar">
            <h4>Attendance Rate by Employee</h4>
            <span className="chart-legend">
              <span className="legend-indicator"></span> Monthly Rate (%)
            </span>
          </div>

          <div className="bars-container">
            {staff.map((emp) => {
              const rate = emp.attendance?.rate || 90;
              const isSelected = emp.id === activeEmp?.id;
              return (
                <div
                  key={emp.id}
                  className={`bar-row ${isSelected ? "selected" : ""}`}
                  onClick={() => setSelectedEmpId(emp.id)}
                  title={`Click to view ${emp.name}'s detailed attendance`}
                >
                  <div className="bar-label">
                    <strong>{emp.name}</strong>
                    <small>{emp.department}</small>
                  </div>

                  <div className="bar-track">
                    <div
                      className="bar-fill"
                      style={{
                        width: `${rate}%`,
                        backgroundColor: rate >= 95 ? "#10b981" : rate >= 92 ? "#2563eb" : "#f59e0b",
                      }}
                    >
                      <span className="bar-value">{rate}%</span>
                    </div>
                  </div>

                  <div className="bar-meta">
                    <span>{emp.attendance?.daysPresent || 22}/23 d</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Detailed Punch & Hours Card for Selected Employee */}
        {activeEmp && (
          <div className="emp-detail-punch">
            <div className="punch-header">
              <div className="avatar-mini">{activeEmp.avatar || "EM"}</div>
              <div>
                <h4>{activeEmp.name}</h4>
                <p>{activeEmp.department} • {activeEmp.email}</p>
              </div>
            </div>

            <div className="punch-stats-row">
              <div className="p-stat">
                <span>Check-in Time</span>
                <strong>{activeEmp.attendance?.checkIn || "09:00 AM"}</strong>
                <small className="online">On Time</small>
              </div>
              <div className="p-stat">
                <span>Avg Daily Hours</span>
                <strong>{activeEmp.attendance?.avgHours || 8.2} hrs</strong>
                <small>Standard: 8.0h</small>
              </div>
              <div className="p-stat">
                <span>Days Present</span>
                <strong>{activeEmp.attendance?.daysPresent || 22} / 23</strong>
                <small className="online">Present Today</small>
              </div>
            </div>

            {/* Weekly Daily Hours Mini Bar Visualizer */}
            <div className="weekly-hours-box">
              <h5>Weekly Hours Breakdown (Mon - Fri)</h5>
              <div className="week-bars">
                {(activeEmp.attendance?.weekly || [
                  { day: "Mon", hours: 8.5 },
                  { day: "Tue", hours: 8.2 },
                  { day: "Wed", hours: 8.8 },
                  { day: "Thu", hours: 8.0 },
                  { day: "Fri", hours: 8.4 },
                ]).map((d, idx) => {
                  const maxH = 10;
                  const heightPct = Math.min(100, Math.round((d.hours / maxH) * 100));
                  return (
                    <div key={idx} className="day-col">
                      <div className="day-bar-track">
                        <div
                          className="day-bar-fill"
                          style={{ height: `${heightPct}%` }}
                        ></div>
                      </div>
                      <span className="day-hours">{d.hours}h</span>
                      <span className="day-name">{d.day}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
