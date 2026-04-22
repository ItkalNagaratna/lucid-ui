import { HashRouter, Routes, Route } from 'react-router-dom'
import UIKit from './pages/UIKit'
import LoginPage from './pages/LoginPage'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/uikit" element={<UIKit />} />
      </Routes>
    </HashRouter>
  )
}
