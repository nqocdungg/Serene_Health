import { useState } from 'react';
import AppointmentList from '../../../components/doctor-schedule/AppointmentList';
import CalendarMonth from '../../../components/doctor-schedule/CalendarMonth';
import ShiftCard from '../../../components/doctor-schedule/ShiftCard';
import { MOCK_SHIFTS, Shift } from '../../../data/scheduleData';
import './DoctorSchedulePage.css';

const SchedulePage = ({ onBackToDashboard }: { onBackToDashboard?: () => void }) => {
  const [selectedShift, setSelectedShift] = useState<Shift | null>(null);

  return (
    <div className="schedule-page">
      {onBackToDashboard && (
        <button className="back-to-dashboard-btn" title="Quay lại Dashboard" onClick={onBackToDashboard}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '16px', height: '16px' }}>
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
        </button>
      )}

      <header className="page-header">
        <h2>Lịch làm việc</h2>
        <p>Trang xem lịch làm việc của bác sĩ.</p>
      </header>

      <main className="schedule-content">
        <div className="left-column">
          <CalendarMonth />
        </div>

        <div className="right-column">
          <div className="section-card">
            <h3>Ca làm việc trong ngày</h3>
            {MOCK_SHIFTS.map((shift) => (
              <ShiftCard
                key={shift.id}
                title={shift.title}
                time={shift.time}
                count={shift.count}
                status={shift.status}
                onViewDetail={() => setSelectedShift(shift)}
                isSelected={selectedShift?.id === shift.id}
              />
            ))}
          </div>

          {/* <AppointmentList /> */}
          {selectedShift && (
            <AppointmentList
              shiftTitle={selectedShift.title}
              timeRange={selectedShift.time}
              count={selectedShift.count}
              patients={selectedShift.patients}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default SchedulePage;