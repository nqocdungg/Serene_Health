import { useState } from 'react'
import CalendarMonth from '../../../components/doctor-schedule/CalendarMonth'
import { MetricCard } from '../../../components/ui/MetricCard'
import { SCHEDULE_DATA } from '../../../data/scheduleData'
import './DashboardTab.css'

type MetricCardProps = {
  title: string
  value: string | number
  color: string
  iconType: 'calendar' | 'clock' | 'message' | 'check'
}

// return (
//   <article className="figma-metric-card">
//     <div className="card-icon-container" style={{ borderColor: `${color}40`, backgroundColor: `${color}0A`, color }}>
//       {iconPaths[iconType]}
//     </div>
//     <div className="card-info">
//       <span className="card-label">{title}</span>
//       <strong className="card-number">{value}</strong>
//     </div>
//   </article>
// )

const ChevronIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export function DashboardTab({ onNavigateTab }: { onNavigateTab?: (tab: string) => void }) {
  const [selectedMonth, setSelectedMonth] = useState<number>(5)
  const [selectedDay, setSelectedDay] = useState<number>(10)
  const [isMonthPickerOpen, setIsMonthPickerOpen] = useState<boolean>(false)
  const [selectedDate, setSelectedDate] = useState('2026-05-10');

  // States for Date Filter (Hôm nay, Ngày mai, ...)
  const [selectedFilter, setSelectedFilter] = useState<string>('Hôm nay')
  const [isFilterPickerOpen, setIsFilterPickerOpen] = useState<boolean>(false)

  const filterOptions = ['Hôm nay', 'Ngày mai', 'Tuần này', 'Tháng này']

  const patients = [
    { name: 'Nguyễn Văn A', age: 45, time: '2 giờ trước', symptoms: 'Sốt, đau đầu, ho' },
    { name: 'Trần Thị B', age: 36, time: '5 giờ trước', symptoms: 'Đau bụng, buồn nôn' },
    { name: 'Lê Văn C', age: 58, time: '1 ngày trước', symptoms: 'Đau ngực, khó thở' },
  ]

  const messages = [
    { name: 'Nguyễn Văn A', text: 'Bác sĩ ơi, dạo này tôi hay thấy chóng mặt và suy ...', time: '09:36' },
    { name: 'Nguyễn Thị N', text: 'Xin chào bác sĩ, tôi đang gặp tình trạng đau đầu...', time: '09:36' },
  ]

  // Programmatically generate calendar rows for selectedMonth in 2026
  const getCalendarRows = (month: number) => {
    const year = 2026
    const firstDayIndex = new Date(year, month - 1, 1).getDay() // 0 = Sun, 1 = Mon, ..., 6 = Sat
    const totalDays = new Date(year, month, 0).getDate()

    const rows = []
    let currentRow = []

    // Fill initial empty cells
    for (let i = 0; i < firstDayIndex; i++) currentRow.push(null)

    for (let day = 1; day <= totalDays; day++) {
      const dateStr = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
      const hasEvent = !!SCHEDULE_DATA[dateStr]
      currentRow.push({ day, hasEvent, active: day === selectedDay })
      if (currentRow.length === 7) { rows.push(currentRow); currentRow = [] }
    }
    if (currentRow.length > 0) {
      while (currentRow.length < 7) currentRow.push(null)
      rows.push(currentRow)
    }
    return rows
  }
  const calendarRows = getCalendarRows(selectedMonth)

  // Dynamic metrics computed based on the selected month AND the filter
  const filterMultiplier = selectedFilter === 'Ngày mai' ? 1.5 : selectedFilter === 'Tuần này' ? 5 : selectedFilter === 'Tháng này' ? 20 : 1
  const appointmentsCount = Math.floor((12 + (selectedMonth - 5) * 2) * filterMultiplier)
  const pendingCount = Math.floor((8 + (selectedMonth - 5)) * filterMultiplier)
  const processingCount = Math.floor((5 + Math.floor((selectedMonth - 5) / 2)) * filterMultiplier)
  const completedCount = Math.floor((5 + Math.floor((selectedMonth - 5) / 3)) * filterMultiplier)

  return (
    <div className="figma-dashboard-tab">
      <header className="figma-dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p>Trang xem thống kê của bác sĩ</p>
        </div>

        <div className="filter-container">
          <button className="filter-dropdown" onClick={() => setIsFilterPickerOpen(!isFilterPickerOpen)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="dropdown-filter-icon">
              <line x1="4" y1="21" x2="4" y2="14" /><line x1="4" y1="10" x2="4" y2="3" /><line x1="12" y1="21" x2="12" y2="12" /><line x1="12" y1="8" x2="12" y2="3" /><line x1="20" y1="21" x2="20" y2="16" /><line x1="20" y1="12" x2="20" y2="3" /><line x1="1" y1="14" x2="7" y2="14" /><line x1="9" y1="8" x2="15" y2="8" /><line x1="17" y1="16" x2="23" y2="16" />
            </svg>
            <span>{selectedFilter}</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="dropdown-arrow-icon"><polyline points="6 9 12 15 18 9" /></svg>
          </button>
          {isFilterPickerOpen && (
            <div className="filter-dropdown-popup">
              {filterOptions.map(opt => (
                <button key={opt} className={`filter-popup-item ${selectedFilter === opt ? 'active' : ''}`} onClick={() => { setSelectedFilter(opt); setIsFilterPickerOpen(false) }}>
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* REUSE METRIC CARD: Sử dụng đúng Component bạn D đã tạo */}
      <section className="figma-metrics-row">
        <MetricCard label="Tổng số lịch hẹn" value={12} delta="+2%" tone="blue" icon="pulse" />
        <MetricCard label="Ca chờ tư vấn" value={8} delta="-1" tone="yellow" icon="clock" />
        <MetricCard label="Ca đang xử lý" value={5} delta="+0" tone="pink" icon="message" />
        <MetricCard label="Ca hoàn thành" value={5} delta="+12%" tone="green" icon="star" />
      </section>

      <div className="figma-dashboard-grid">
        <div className="grid-column-left">
          {/* Bệnh nhân gần đây */}
          <section className="figma-section-card">
            <div className="section-header">
              <h2>Các bệnh nhân gần đây</h2>
              <button className="view-all-btn" onClick={() => onNavigateTab?.('Danh sách bệnh nhân')}>Xem tất cả {ChevronIcon()}</button>
            </div>
            <div className="list-container">
              {patients.map((p, idx) => (
                <div className="patient-list-row" key={idx}>
                  <div className="row-left">
                    <div className="avatar-placeholder" />
                    <div className="meta-details">
                      <h3>{p.name} • {p.age} tuổi</h3>
                      <span className="time-sub">{p.time}</span>
                    </div>
                  </div>
                  <span className="symptom-text">{p.symptoms}</span>
                  <button className="action-btn-outline" onClick={() => onNavigateTab?.('Tư vấn trực tiếp')}>Xem ca</button>
                </div>
              ))}
            </div>
          </section>

          {/* Tin nhắn mới */}
          <section className="figma-section-card">
            <div className="section-header">
              <h2>Tin nhắn mới</h2>
              <button className="view-all-btn" onClick={() => onNavigateTab?.('Tư vấn trực tiếp')}>Xem tất cả {ChevronIcon()}</button>
            </div>
            <div className="list-container">
              {messages.map((m, idx) => (
                <div className="message-list-row" key={idx}>
                  <div className="row-left">
                    <div className="avatar-placeholder" />
                    <div className="meta-details">
                      <h3>{m.name}</h3>
                      <p className="message-preview-text">{m.text}</p>
                    </div>
                  </div>
                  <span className="message-time-text">{m.time}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="grid-column-right">
          {/* Lịch tháng */}
          <section className="figma-section-card calendar-card dashboard-version">
            <CalendarMonth
              selectedDate={selectedDate}
              onDateSelect={(date) => setSelectedDate(date)}
              className="dashboard-calendar"
            />
            {/* Lịch hẹn sắp tới */}
            <div className="upcoming-section">
              <div className="section-header" style={{ marginTop: '24px' }}>
                <h2>Lịch hẹn sắp tới</h2>
                <button className="view-all-btn" onClick={() => onNavigateTab?.('Lịch hẹn khám')}>Xem tất cả {ChevronIcon()}</button>
              </div>
              <div className="appointment-mini-card">
                <div className="avatar-placeholder" />
                <div className="meta-details">
                  <h3>Phạm Văn X</h3>
                  <span className="code-sub">Mã BN: #12346</span>
                </div>
                <span className="appointment-time">09:00</span>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}