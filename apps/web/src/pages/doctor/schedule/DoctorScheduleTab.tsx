import './DoctorScheduleTab.css'

const shifts = [
  { day: 'Thứ 2', date: '25/05', shift: 'Sáng (08:00 - 12:00)', room: 'Phòng 204', status: 'Active' },
  { day: 'Thứ 3', date: '26/05', shift: 'Chiều (13:30 - 17:30)', room: 'Phòng 204', status: 'Active' },
  { day: 'Thứ 4', date: '27/05', shift: 'Cả ngày (08:00 - 17:30)', room: 'Phòng 204', status: 'Active' },
  { day: 'Thứ 5', date: '28/05', shift: 'Nghỉ', room: '-', status: 'Off' },
  { day: 'Thứ 6', date: '29/05', shift: 'Sáng (08:00 - 12:00)', room: 'Phòng Hội Chẩn A', status: 'Active' },
  { day: 'Thứ 7', date: '30/05', shift: 'Sáng (08:00 - 12:00)', room: 'Phòng 204', status: 'Active' },
  { day: 'Chủ Nhật', date: '31/05', shift: 'Nghỉ', room: '-', status: 'Off' }
]

export function DoctorScheduleTab() {
  return (
    <div className="doctor-schedule-tab-content">
      <div className="tab-header-row">
        <div>
          <h1>Lịch làm việc</h1>
          <p>Xem chi tiết lịch trực khám trực tiếp và phòng làm việc phân công trong tuần này.</p>
        </div>
      </div>

      <div className="schedule-timeline-container">
        {shifts.map((s) => (
          <div className={`schedule-day-row ${s.status.toLowerCase()}`} key={s.day}>
            <div className="day-meta">
              <span className="day-name">{s.day}</span>
              <span className="day-date">{s.date}</span>
            </div>
            <div className="shift-info">
              <span className="label">Ca làm việc</span>
              <strong className="value">{s.shift}</strong>
            </div>
            <div className="room-info">
              <span className="label">Phòng khám</span>
              <span className="value">{s.room}</span>
            </div>
            <div className="status-info">
              <span className={`status-badge ${s.status.toLowerCase()}`}>
                {s.status === 'Active' ? 'Làm việc' : 'Nghỉ'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
