import { HashRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import UIKit from './pages/UIKit'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/ui-kit" element={<UIKit />} />
      </Routes>
    </HashRouter>
  )
}
