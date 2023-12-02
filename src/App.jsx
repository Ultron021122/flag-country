import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Flags } from './components/Flags';
import { Country } from './components/Country';

export function App() {
  return (
    <>
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Flags />} />
          <Route path="/pais/:id" element={<Country />} />
        </Routes>
      </div>
    </Router>
    </>
  )
}