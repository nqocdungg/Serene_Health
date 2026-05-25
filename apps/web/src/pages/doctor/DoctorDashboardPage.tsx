import { useState } from 'react'
import { Header } from '../../components/layout/header/Header'
import { Sidebar } from '../../components/layout/sidebar/Sidebar'
import '../../components/layout/DesktopShell.css'
import { doctorSidebarConfig } from './doctorSidebarConfig'
import { DashboardTab } from './dashboard/DashboardTab'
import { LiveConsultationTab } from './consultation/LiveConsultationTab'
import { PatientListTab } from './patients/PatientListTab'
import { DoctorScheduleTab } from './schedule/DoctorScheduleTab'
import { AppointmentListTab } from './appointments/AppointmentListTab'
import './DoctorDashboardPage.css'

export function DoctorDashboardPage() {
  const [activeTab, setActiveTab] = useState<string>('Dashboard')

  // Create a customized config where activeLabel matches current activeTab state
  const dynamicSidebarConfig = {
    ...doctorSidebarConfig,
    activeLabel: activeTab,
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return <DashboardTab onNavigateTab={setActiveTab} />
      case 'Tư vấn trực tiếp':
        return <LiveConsultationTab />
      case 'Danh sách bệnh nhân':
        return <PatientListTab />
      case 'Lịch làm việc':
        return <DoctorScheduleTab />
      case 'Lịch hẹn khám':
        return <AppointmentListTab />
      default:
        return <DashboardTab onNavigateTab={setActiveTab} />
    }
  }

  return (
    <div className="desktop-shell-page doctor-dashboard-page">
      <Sidebar config={dynamicSidebarConfig} onItemClick={setActiveTab} />
      <Header profileRole={dynamicSidebarConfig.profileRole} />
      <main className="desktop-shell-main doctor-dashboard-main" aria-label="Nội dung chính">
        {renderTabContent()}
      </main>
    </div>
  )
}
