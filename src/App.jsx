import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Result from './pages/Result'
import BaziResult from './pages/BaziResult2'
function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/result" element={<Result/>}/>
      </Routes>
    </Router>
  )
}

export default App
