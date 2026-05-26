import { useState } from 'react'
import './PatientListTab.css'

// Clinical-grade patient mock data with EMR elements matching the wireframe exactly
// Clinical-grade patient mock data with EMR elements matching the wireframe exactly
const initialPatients = [
  {
    id: '2',
    code: 'BN-2026-002',
    name: 'Trần Thị B',
    age: 28,
    gender: 'Nữ',
    status: 'Đang chờ',
    appointmentType: 'Tư vấn',
    triage: 'Khẩn cấp', // mapped for stats
    lastVisit: '24/05/2026',
    phone: '0987654321',
    disease: 'Đau ngực trái kéo dài',
    bloodType: 'O+',
    allergies: ['Hải sản'],
    history: ['Rối loạn lipid máu phát hiện năm 2024', 'Tiền sử gia đình: Bố bị nhồi máu cơ tim ở tuổi 50'],
    vitals: { bp: '135/85', hr: 104, temp: 36.8, spo2: 98, weight: 55, height: 158, bmi: 22.0 },
    pastEncounters: [
      {
        date: '24/05/2026',
        doctor: 'BS. Trần Hùng',
        diagnosis: 'Đau ngực trái không điển hình / Theo dõi thiếu máu cơ tim',
        symptoms: 'Đau nhói vùng ngực trái kéo dài khoảng 2-3 phút khi gắng sức, lan ra vai trái, không khó thở.',
        prescription: ['Nitroglycerin 0.5mg - Ngậm dưới lưỡi khi đau ngực dữ dội', 'Atorvastatin 10mg - 1 viên/ngày, uống tối trước đi ngủ', 'Aspirin 81mg - 1 viên/ngày, uống sáng sau ăn']
      },
      {
        date: '10/04/2026',
        doctor: 'BS. Trần Hùng',
        diagnosis: 'Rối loạn lipid máu hỗn hợp / Tăng huyết áp độ I',
        symptoms: 'Khám định kỳ sức khỏe tim mạch, thỉnh thoảng đau đầu nhẹ khi căng thẳng, không đau ngực.',
        prescription: ['Atorvastatin 10mg - 1 viên/ngày, uống tối trước đi ngủ', 'Amlodipin 5mg - 1 viên/ngày, uống sáng sau ăn']
      }
    ]
  },
  {
    id: '3',
    code: 'BN-2026-003',
    name: 'Lê Văn C',
    age: 45,
    gender: 'Nam',
    status: 'Đã kết thúc',
    appointmentType: 'Khám trực tiếp',
    triage: 'Bình thường',
    lastVisit: '20/05/2026',
    phone: '0901234567',
    disease: 'Ho khan kéo dài về đêm',
    bloodType: 'B+',
    allergies: [],
    history: ['Dị ứng thời tiết', 'Trào ngược dạ dày thực quản (GERD)'],
    vitals: { bp: '118/78', hr: 72, temp: 36.5, spo2: 99, weight: 74, height: 175, bmi: 24.2 },
    pastEncounters: [
      {
        date: '20/05/2026',
        doctor: 'BS. Lê Minh',
        diagnosis: 'Ho khan do trào ngược dạ dày thực quản (GERD)',
        symptoms: 'Ho khan nhiều về đêm và sáng sớm, kèm ợ chua, rát nóng sau xương ức.',
        prescription: ['Nexium (Esomeprazole) 40mg - 1 viên/ngày, uống trước ăn sáng 30 phút', 'Gaviscon - 3 gói/ngày, uống sau ăn 1 giờ và trước đi ngủ', 'Siro ho Prospan - 5ml/lần, 3 lần/ngày']
      },
      {
        date: '05/03/2026',
        doctor: 'BS. Lê Minh',
        diagnosis: 'Viêm phế quản cấp tính trên nền trào ngược GERD',
        symptoms: 'Ho khạc đờm trắng đục nhiều ngày, mệt mỏi, đau rát cổ họng, sốt nhẹ 37.8 °C.',
        prescription: ['Augmentin 1g - 2 viên/ngày, uống sáng-tối sau ăn', 'Paracetamol 500mg - 3 viên/ngày khi sốt > 38.5 °C', 'Acetylcystein 200mg - 3 gói/ngày, uống sau ăn']
      }
    ]
  },
  {
    id: '4',
    code: 'BN-2026-004',
    name: 'Phạm Thị D',
    age: 50,
    gender: 'Nữ',
    status: 'Đang khám',
    appointmentType: 'Cả hai',
    triage: 'Khẩn cấp',
    lastVisit: '18/05/2026',
    phone: '0923456789',
    disease: 'Tiền sử huyết áp cao',
    bloodType: 'O+',
    allergies: [],
    history: ['Tăng huyết áp vô căn (đã 5 năm, đang uống thuốc duy trì)', 'Gút mãn tính'],
    vitals: { bp: '128/82', hr: 76, temp: 36.6, spo2: 97, weight: 80, height: 170, bmi: 27.7 },
    pastEncounters: [
      {
        date: '18/05/2026',
        doctor: 'BS. Nguyễn An',
        diagnosis: 'Tăng huyết áp vô căn - Giai đoạn 2 ổn định / Rối loạn acid uric máu',
        symptoms: 'Khám định kỳ, không đau đầu, không chóng mặt. Acid uric tăng nhẹ.',
        prescription: ['Amlodipin 5mg - 1 viên/ngày, uống sáng', 'Allopurinol 300mg - 1 viên/ngày, uống sáng sau ăn']
      },
      {
        date: '12/02/2026',
        doctor: 'BS. Nguyễn An',
        diagnosis: 'Cơn gút cấp tính khớp cổ chân trái',
        symptoms: 'Khớp cổ chân trái sưng nóng đỏ và đau dữ dội sau khi ăn lẩu hải sản, hạn chế đi lại.',
        prescription: ['Colchicine 1mg - ngày 1 uống 3 viên (sáng-trưa-tối), ngày 2 uống 2 viên', 'Meloxicam 7.5mg - 1 viên/ngày, uống sau ăn trưa để giảm đau kháng viêm']
      }
    ]
  },
  {
    id: '1',
    code: 'BN-2026-001',
    name: 'Nguyễn Văn E',
    age: 22,
    gender: 'Nam',
    status: 'Đang chờ',
    appointmentType: 'Tư vấn',
    triage: 'Cần khám',
    lastVisit: '25/05/2026',
    phone: '0934567890',
    disease: 'Sốt cao co giật nhẹ',
    bloodType: 'A+',
    allergies: ['Penicillin', 'Aspirin'],
    history: ['Chưa ghi nhận tiền sử bệnh lý mãn tính', 'Mổ ruột thừa năm 2021 tại Bệnh viện Bạch Mai'],
    vitals: { bp: '142/95', hr: 98, temp: 39.2, spo2: 97, weight: 68, height: 172, bmi: 23.0 },
    pastEncounters: [
      {
        date: '25/05/2026',
        doctor: 'BS. Lê Minh',
        diagnosis: 'Sốt co giật do nhiễm siêu vi cấp tính',
        symptoms: 'Sốt cao liên tục 39.2 độ, co giật nhẹ cơ mặt và chi, đau họng, mệt mỏi nhiều.',
        prescription: ['Paracetamol 500mg - 3 viên/ngày, uống khi sốt > 38.5 độ', 'Oresol - Pha 1 gói với 1 lít nước lọc, uống rải rác', 'Hapacol 150mg (sẵn trong tủ thuốc gia đình) - dự phòng']
      },
      {
        date: '15/01/2026',
        doctor: 'BS. Lê Minh',
        diagnosis: 'Viêm họng cấp tính',
        symptoms: 'Đau rát họng nuốt vướng, ho khan nhiều về đêm, sốt nhẹ 38.0 °C, mệt mỏi.',
        prescription: ['Amoxicillin 500mg - 3 viên/ngày, uống sáng-trưa-tối sau ăn', 'Siro ho thảo dược - 10ml/lần, 3 lần/ngày để dịu họng']
      }
    ]
  },
  {
    id: '5',
    code: 'BN-2026-005',
    name: 'Đỗ Thị F',
    age: 39,
    gender: 'Nữ',
    status: 'Đã kết thúc',
    appointmentType: 'Khám trực tiếp',
    triage: 'Bình thường',
    lastVisit: '15/05/2026',
    phone: '0945678901',
    disease: 'Đau khớp gối mãn tính',
    bloodType: 'AB-',
    allergies: ['Sulfonamides'],
    history: ['Thoái hóa khớp gối độ III', 'Loét dạ dày tá tràng đã điều trị ổn định'],
    vitals: { bp: '130/80', hr: 82, temp: 36.9, spo2: 96, weight: 62, height: 155, bmi: 25.8 },
    pastEncounters: [
      {
        date: '15/05/2026',
        doctor: 'BS. Trần Hùng',
        diagnosis: 'Thoái hóa khớp gối hai bên tiến triển nặng',
        symptoms: 'Đau dữ dội hai khớp gối, khớp sưng đau, hạn chế vận động nhiều, khó đứng lên ngồi xuống.',
        prescription: ['Meloxicam 7.5mg - 1 viên/ngày, uống trưa sau ăn (dùng ngắn ngày)', 'Glucosamin Sulfat 1500mg - 1 gói/ngày, uống sáng', 'Esomeprazole 20mg - 1 viên/ngày, uống trước ăn sáng 30 phút để bảo vệ dạ dày']
      },
      {
        date: '20/12/2025',
        doctor: 'BS. Trần Hùng',
        diagnosis: 'Viêm loét dạ dày tá tràng đợt cấp tính',
        symptoms: 'Đau thượng vị âm ỉ kèm ợ nóng rát nhiều sau khi ăn đồ chua cay hoặc khi đói.',
        prescription: ['Nexium (Esomeprazole) 40mg - 1 viên/ngày, uống trước ăn sáng 30 phút', 'Phosphalugel - 3 gói/ngày, uống khi đau thượng vị nhiều']
      }
    ]
  }
]

export function PatientListTab({ onBackToDashboard }: { onBackToDashboard?: () => void }) {
  const [activePatientId, setActivePatientId] = useState<string | null>(null)
  const [selectedEncounterIdx, setSelectedEncounterIdx] = useState<number>(0)
  const [searchTerm, setSearchTerm] = useState('')
  const [serviceFilter, setServiceFilter] = useState<'Tất cả' | 'Tư vấn' | 'Khám trực tiếp' | 'Cả hai'>('Tất cả')
  const [statusFilter, setStatusFilter] = useState<'Tất cả' | 'Đang chờ' | 'Đang khám' | 'Đã kết thúc'>('Tất cả')
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(1)

  // Find active patient details
  const activePatient = initialPatients.find(p => p.id === activePatientId)

  // Handler for toast messages
  const triggerToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => {
      setToastMessage(null)
    }, 3000)
  }

  // Calculate statistics for the 4 wireframe summary cards
  const stats = {
    total: 50,      // Total patients (Tổng số bệnh nhân: 50)
    waiting: 12,    // Waiting (Đang chờ: 12)
    processing: 5,  // In progress (Đang xử lý: 5)
    urgent: 2,      // High priority (Ưu tiên cao: 2)
  }

  // Filter & Search logic
  const filteredPatients = initialPatients.filter(p => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.phone.includes(searchTerm)
    
    const matchesService = serviceFilter === 'Tất cả' || p.appointmentType === serviceFilter
    const matchesStatus = statusFilter === 'Tất cả' || p.status === statusFilter

    return matchesSearch && matchesService && matchesStatus
  })

  // EMR Details view render (Matches the EMR Patient Detail Wireframe exactly + Interactive Visit History)
  if (activePatientId && activePatient) {
    const p = activePatient
    const enc = p.pastEncounters[selectedEncounterIdx] || p.pastEncounters[0]

    return (
      <div className="emr-view-container">
        {toastMessage && <div className="emr-toast">{toastMessage}</div>}

        {/* Return Button at top left */}
        <button className="back-to-dashboard-btn" title="Quay lại danh sách" type="button" onClick={() => { setActivePatientId(null); setSelectedEncounterIdx(0); }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '16px', height: '16px' }}>
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
        </button>

        {/* EMR Top Title Header */}
        <div className="emr-view-header-block">
          <span className="emr-view-title">HỒ SƠ BỆNH ÁN CHI TIẾT</span>
          <h2 className="emr-view-subtitle">Mã bệnh nhân: {p.code}</h2>
        </div>

        {/* Profile Card Section */}
        <section className="emr-profile-section">
          <div className="emr-avatar-circle">
            {p.name.split(' ').pop()?.[0]}
          </div>

          <div className="emr-profile-box">
            <div className="profile-detail-item">
              <span className="detail-label">Họ tên & Tuổi:</span>
              <strong className="detail-value">{p.name} ({p.age} tuổi)</strong>
            </div>
            <div className="profile-detail-item">
              <span className="detail-label">Giới tính & Nhóm máu:</span>
              <strong className="detail-value">{p.gender} • Nhóm máu {p.bloodType}</strong>
            </div>
            <div className="profile-detail-item">
              <span className="detail-label">Số điện thoại:</span>
              <strong className="detail-value">{p.phone}</strong>
            </div>
          </div>
        </section>

        <hr className="emr-divider" />

        {/* Two-Column Info Cards (Vitals & History in Left Column, Visit History in Right Column) */}
        <div className="emr-two-columns">
          {/* Column 1: Chỉ số sinh tồn & Tiền sử (Stacked Card Left) */}
          <div className="emr-col-left">
            <article className="emr-column-card">
              <h3 className="emr-column-title">Chỉ số sinh tồn (Vitals)</h3>
              <div className="emr-vitals-list">
                <div className="vital-item-row">
                  <span>Nhiệt độ:</span>
                  <strong>{p.vitals.temp} °C</strong>
                </div>
                <div className="vital-item-row">
                  <span>Huyết áp:</span>
                  <strong>{p.vitals.bp} mmHg</strong>
                </div>
                <div className="vital-item-row">
                  <span>Nhịp tim:</span>
                  <strong>{p.vitals.hr} bpm</strong>
                </div>
                <div className="vital-item-row">
                  <span>SpO2 (Oxy máu):</span>
                  <strong>{p.vitals.spo2} %</strong>
                </div>
                <div className="vital-item-row">
                  <span>Thể trạng (BMI):</span>
                  <strong>{p.vitals.bmi} ({p.vitals.bmi >= 25 ? 'Thừa cân' : 'Bình thường'})</strong>
                </div>
              </div>
            </article>

            <article className="emr-column-card" style={{ marginTop: '20px' }}>
              <h3 className="emr-column-title">Tiền sử & Cảnh báo dị ứng</h3>
              <div className="emr-history-allergy-content">
                <div className="allergy-warn-box">
                  <span className="warn-label">Dị ứng ghi nhận:</span>
                  <strong className={`warn-val ${p.allergies.length > 0 ? 'alert-red' : ''}`}>
                    {p.allergies.length > 0 ? p.allergies.join(', ') : 'Chưa ghi nhận dị ứng'}
                  </strong>
                </div>

                <div className="history-box-section">
                  <span className="warn-label">Tiền sử bệnh lý:</span>
                  <ul className="history-bullets">
                    {p.history.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                 </div>
              </div>
            </article>
          </div>

          {/* Column 2: Lịch sử lượt khám tương tác (Right) */}
          <div className="emr-col-right">
            <article className="emr-column-card" style={{ height: '100%' }}>
              <h3 className="emr-column-title">Lịch sử lượt khám gần đây</h3>
              <div className="encounter-history-list">
                {p.pastEncounters.map((item, idx) => (
                  <div
                    key={idx}
                    className={`encounter-history-item ${selectedEncounterIdx === idx ? 'active' : ''}`}
                    onClick={() => setSelectedEncounterIdx(idx)}
                  >
                    <div className="history-item-meta">
                      <span className="visit-meta">{item.date} • {item.doctor}</span>
                      {selectedEncounterIdx === idx && <span className="active-badge">Đang chọn</span>}
                    </div>
                    <div className="history-item-diag">{item.diagnosis}</div>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>

        {/* Vertical Records List Section (Displays detailed info of selected encounter) */}
        <section className="emr-records-section">
          <div className="emr-encounter-block">
            {/* Row 1: Triệu chứng & Khám lâm sàng */}
            <div className="emr-records-row">
              <span className="emr-records-label">Triệu chứng & Lâm sàng</span>
              <div className="emr-records-value-box">
                <strong style={{ display: 'block', marginBottom: '6px' }}>Khám ngày: {enc.date} (Đảm nhận: {enc.doctor})</strong>
                <p style={{ margin: 0 }}>{enc.symptoms}</p>
              </div>
            </div>

            {/* Row 2: Chẩn đoán y khoa */}
            <div className="emr-records-row">
              <span className="emr-records-label">Chẩn đoán y khoa</span>
              <div className="emr-records-value-box">
                <strong style={{ color: '#2563EB', fontWeight: 700 }}>{enc.diagnosis}</strong>
              </div>
            </div>

            {/* Row 3: Đơn thuốc chỉ định */}
            <div className="emr-records-row">
              <span className="emr-records-label">Đơn thuốc kê chi tiết</span>
              <div className="emr-records-value-box">
                <ul style={{ margin: 0, paddingLeft: '18px' }}>
                  {enc.prescription.map((drug, dIdx) => (
                    <li key={dIdx} style={{ fontWeight: 600 }}>{drug}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Function Actions Buttons at bottom right */}
        <div className="emr-buttons-group">
          <button className="emr-btn-outline" type="button" onClick={() => triggerToast(`Đang kết nối máy in để in đơn thuốc của bệnh nhân ${p.name}...`)}>
            In đơn thuốc
          </button>
          <button className="emr-btn-filled" type="button" onClick={() => triggerToast(`Đang xuất file bệnh án EMR (PDF) của bệnh nhân ${p.name}...`)}>
            Xuất file bệnh án (PDF)
          </button>
        </div>
      </div>
    )
  }

  // Dashboard / Table View Render (Perfect Wireframe representation + Clinically Valued Fields)
  return (
    <div className="patient-list-tab-content">
      {toastMessage && <div className="emr-toast">{toastMessage}</div>}

      {onBackToDashboard && (
        <button className="back-to-dashboard-btn" title="Quay lại Dashboard" onClick={onBackToDashboard}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '16px', height: '16px' }}>
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
        </button>
      )}

      {/* Wireframe Metric Stats Summary Bar */}
      <section className="triage-stats-row">
        {/* Card 1: Tổng số bệnh nhân */}
        <div className="triage-stat-card">
          <div className="icon-wrap bg-blue">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="stat-icon">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <div className="card-info-wrap">
            <span className="label">Tổng số bệnh nhân</span>
            <strong className="value">{stats.total}</strong>
          </div>
        </div>

        {/* Card 2: Đang chờ */}
        <div className="triage-stat-card">
          <div className="icon-wrap bg-yellow">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="stat-icon">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <div className="card-info-wrap">
            <span className="label">Đang chờ</span>
            <strong className="value">{stats.waiting}</strong>
          </div>
        </div>

        {/* Card 3: Đang xử lý */}
        <div className="triage-stat-card">
          <div className="icon-wrap bg-green">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="stat-icon">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </div>
          <div className="card-info-wrap">
            <span className="label">Đang xử lý</span>
            <strong className="value">{stats.processing}</strong>
          </div>
        </div>

        {/* Card 4: Ưu tiên cao */}
        <div className="triage-stat-card">
          <div className="icon-wrap bg-red">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="stat-icon">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <div className="card-info-wrap">
            <span className="label">Ưu tiên cao</span>
            <strong className="value">{stats.urgent}</strong>
          </div>
        </div>
      </section>

      {/* Title & Controls Toolbar */}
      <div className="tab-header-row unified-controls">
        <div className="tab-titles">
          <h1>Danh sách bệnh nhân</h1>
          <p>Trang quản lý hồ sơ bệnh nhân trong chuỗi phòng khám.</p>
        </div>

        {/* Filters and Actions group */}
        <div className="patient-controls-group">
          {/* Smart Search */}
          <div className="search-bar-container-smart">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="search-icon">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Tìm kiếm bệnh nhân..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button className="clear-search-btn" onClick={() => setSearchTerm('')} type="button">
                &times;
              </button>
            )}
          </div>

          {/* Service Dropdown Filter */}
          <div className="sort-selector-container">
            <select
              className="sort-dropdown-smart"
              value={serviceFilter}
              onChange={e => setServiceFilter(e.target.value as any)}
            >
              <option value="Tất cả">Dịch vụ</option>
              <option value="Tư vấn">Tư vấn</option>
              <option value="Khám trực tiếp">Khám trực tiếp</option>
              <option value="Cả hai">Cả hai</option>
            </select>
          </div>

          {/* Status Dropdown Filter */}
          <div className="sort-selector-container">
            <select
              className="sort-dropdown-smart"
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value as any)}
            >
              <option value="Tất cả">Trạng thái</option>
              <option value="Đang chờ">Đang chờ</option>
              <option value="Đang khám">Đang khám</option>
              <option value="Đã kết thúc">Đã kết thúc</option>
            </select>
          </div>
        </div>
      </div>

      {/* Upgraded Table Layout of Patients */}
      {filteredPatients.length > 0 ? (
        <div className="patient-table-frame">
          <table className="upgraded-patient-table">
            <thead>
              <tr>
                <th className="th-stt">STT</th>
                <th>Họ tên</th>
                <th>Số điện thoại</th>
                <th>Lý do khám</th>
                <th>Loại khám</th>
                <th>Trạng thái</th>
                <th className="th-actions">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((p, idx) => (
                <tr key={p.id}>
                  {/* Column 1: Index */}
                  <td className="td-stt">{idx + 1}</td>

                  {/* Column 2: Họ tên (avatar + name + details) */}
                  <td className="td-patient">
                    <div className="patient-avatar-cell-group">
                      <div className="patient-avatar-circle-gray">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="avatar-placeholder-icon">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                      </div>
                      <div className="patient-meta-text">
                        <strong className="p-name">{p.name}</strong>
                        <span className="p-sub-details">
                          {p.gender} • {p.age} tuổi
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Column 3: Số điện thoại */}
                  <td className="td-phone">{p.phone}</td>

                  {/* Column 4: Lý do khám (Chief Complaint) */}
                  <td className="td-complaint">{p.disease}</td>

                  {/* Column 5: Loại khám */}
                  <td className="td-type">{p.appointmentType}</td>

                  {/* Column 6: Trạng thái (pill badges) */}
                  <td className="td-status">
                    <span className={`status-pill ${p.status === 'Đang chờ' ? 'waiting' : p.status === 'Đang khám' ? 'processing' : 'done'}`}>
                      {p.status}
                    </span>
                  </td>

                  {/* Column 7: Hành động (eye button) */}
                  <td className="td-actions">
                    <button 
                      className="eye-action-btn" 
                      title="Xem bệnh án EMR" 
                      type="button" 
                      onClick={() => { setActivePatientId(p.id); setSelectedEncounterIdx(0); }}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="no-patients-empty-state">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="empty-icon">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <line x1="23" y1="11" x2="17" y2="11" />
          </svg>
          <h3>Không tìm thấy bệnh nhân nào</h3>
          <p>Hãy thử thay đổi từ khóa tìm kiếm hoặc các tiêu chí bộ lọc.</p>
        </div>
      )}

      {/* Pagination component at bottom centered */}
      <footer className="patient-pagination">
        <button className="pag-nav-btn prev" disabled={currentPage === 1} onClick={() => setCurrentPage(1)} type="button">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="pag-icon">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button className={`pag-num-btn ${currentPage === 1 ? 'active' : ''}`} onClick={() => setCurrentPage(1)} type="button">1</button>
        <button className={`pag-num-btn ${currentPage === 2 ? 'active' : ''}`} onClick={() => triggerToast("Đây là bản ghi thử nghiệm, trang 2 hiện chưa có dữ liệu bệnh nhân.")} type="button">2</button>
        <button className={`pag-num-btn ${currentPage === 3 ? 'active' : ''}`} onClick={() => triggerToast("Đây là bản ghi thử nghiệm, trang 3 hiện chưa có dữ liệu bệnh nhân.")} type="button">3</button>
        <button className="pag-nav-btn next" onClick={() => triggerToast("Đây là bản ghi thử nghiệm, trang sau hiện chưa có dữ liệu bệnh nhân.")} type="button">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="pag-icon">
            <polyline points="9 6 15 12 9 18" />
          </svg>
        </button>
      </footer>
    </div>
  )
}
