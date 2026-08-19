import { Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { PLPPage } from './pages/PLPPage'
import { PDPPage } from './pages/PDPPage'
import { CheckoutPage } from './pages/CheckoutPage'
import { DesignSystemPage } from './pages/DesignSystemPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/produtos" element={<PLPPage />} />
      <Route path="/produtos/:id" element={<PDPPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/design-system" element={<DesignSystemPage />} />
    </Routes>
  )
}

export default App
