import { Header } from '../../components/layout/header/Header'
import { Sidebar } from '../../components/layout/sidebar/Sidebar'
import '../../components/layout/DesktopShell.css'
import { doctorSidebarConfig } from './doctorSidebarConfig'
import './DoctorDashboardPage.css'

export function DoctorDashboardPage() {
  return (
    <div className="desktop-shell-page doctor-dashboard-page">
      <Sidebar config={doctorSidebarConfig} />
      <Header profileRole={doctorSidebarConfig.profileRole} />
      <main className="desktop-shell-main doctor-dashboard-main" aria-label="Nội dung chính" />
    </div>
  )
}
