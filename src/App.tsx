import { Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { PLPPage } from './pages/PLPPage'
import { DesignSystemPage } from './pages/DesignSystemPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/produtos" element={<PLPPage />} />
      <Route path="/design-system" element={<DesignSystemPage />} />
    </Routes>
  )
}

export default App
