
import { useState } from "react";
import { format, differenceInMonths } from "date-fns";

export default function LeaveTracker() {
  const [yearsOfService, setYearsOfService] = useState(0);
  const [sickBalance, setSickBalance] = useState(0);
  const [vacationBalance, setVacationBalance] = useState(0);
  const [compBalance, setCompBalance] = useState(0);

  const [futureSick, setFutureSick] = useState(0);
  const [futureVacation, setFutureVacation] = useState(0);
  const [futureComp, setFutureComp] = useState(0);

  const [targetDate, setTargetDate] = useState("");

  const getVacationAccrualRate = () => {
    if (yearsOfService >= 20) return 0.09225;
    if (yearsOfService >= 15) return 0.08075;
    if (yearsOfService >= 10) return 0.06925;
    return 0.05775;
  };

  const getAccruedHours = (rate) => {
    if (!targetDate) return 0;
    const months = differenceInMonths(new Date(targetDate), new Date());
    return Math.max(0, months * rate * 173.33);
  };

  const sickAccrualRate = 0.046125;
  const vacationAccrualRate = getVacationAccrualRate();

  const projectedSick = sickBalance + getAccruedHours(sickAccrualRate) - futureSick;
  const projectedVacation = vacationBalance + getAccruedHours(vacationAccrualRate) - futureVacation;
  const projectedComp = compBalance - futureComp;

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", padding: "1rem", fontFamily: "Arial" }}>
      <h1>Leave Tracker</h1>

      <div style={{ background: "#f1f5f9", padding: "1rem", marginBottom: "1rem", borderRadius: "8px" }}>
        <p><strong>How to Use This Leave Tracker</strong></p>
        <ul>
          <li>Enter your <strong>Years of Service</strong> — this determines your vacation accrual rate:
            <ul>
              <li>0–9 years: 0.05775/hr</li>
              <li>10–14 years: 0.06925/hr</li>
              <li>15–19 years: 0.08075/hr</li>
              <li>20+ years: 0.09225/hr</li>
            </ul>
          </li>
          <li>Enter current balances and any future leave you plan to take.</li>
          <li>Set a <strong>Target Date</strong> to project future balances.</li>
        </ul>
        <p><strong>Formula:</strong> Accrued = Rate × 173.33 × Months<br/>
        Projected = Current + Accrued − Planned Leave</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <label>
          Years of Service
          <input type="number" value={yearsOfService} onChange={(e) => setYearsOfService(+e.target.value)} />
        </label>
        <label>
          Target Date
          <input type="date" value={targetDate} onChange={(e) => setTargetDate(e.target.value)} />
        </label>
        <label>
          Sick Balance
          <input type="number" value={sickBalance} onChange={(e) => setSickBalance(+e.target.value)} />
        </label>
        <label>
          Vacation Balance
          <input type="number" value={vacationBalance} onChange={(e) => setVacationBalance(+e.target.value)} />
        </label>
        <label>
          Comp Balance
          <input type="number" value={compBalance} onChange={(e) => setCompBalance(+e.target.value)} />
        </label>
        <label>
          Future Sick Taken
          <input type="number" value={futureSick} onChange={(e) => setFutureSick(+e.target.value)} />
        </label>
        <label>
          Future Vacation Taken
          <input type="number" value={futureVacation} onChange={(e) => setFutureVacation(+e.target.value)} />
        </label>
        <label>
          Future Comp Taken
          <input type="number" value={futureComp} onChange={(e) => setFutureComp(+e.target.value)} />
        </label>
      </div>

      <div style={{ marginTop: "1rem" }}>
        <p><strong>Projected Sick:</strong> {projectedSick.toFixed(2)} hrs</p>
        <p><strong>Projected Vacation:</strong> {projectedVacation.toFixed(2)} hrs</p>
        <p><strong>Projected Comp:</strong> {projectedComp.toFixed(2)} hrs</p>
      </div>
    </div>
  );
}
