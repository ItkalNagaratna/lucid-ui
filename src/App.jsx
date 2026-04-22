import { HashRouter, Routes, Route } from 'react-router-dom'
import UIKit from './pages/UIKit'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<UIKit />} />
      </Routes>
    </HashRouter>
  )
}
