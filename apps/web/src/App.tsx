import { ManagerDashboardPage } from './pages/manager/ManagerDashboardPage'
import { DoctorDashboardPage } from './pages/doctor/DoctorDashboardPage'

const routeMap = {
  manager: <ManagerDashboardPage />,
  doctor: <DoctorDashboardPage />,
}

function App() {
  const currentRoute = window.location.hash === '#doctor' ? 'doctor' : 'manager'

  return routeMap[currentRoute]
}

export default App
