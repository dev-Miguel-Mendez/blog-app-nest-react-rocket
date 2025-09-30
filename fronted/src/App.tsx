import { NavLink, Route, Routes } from 'react-router-dom'
import CreatePage from './pages/CreatePage'
import DetailPage from './pages/DetailPage'
import ListPage from './pages/ListPage'
import './App.css'

const App = () => {
  return (
    <div className="appShell">
      <header className="appHeader">
        <h1>Blog Entries</h1>
        <nav>
          <NavLink to="/" end>
            List
          </NavLink>
          <NavLink to="/create">Create</NavLink>
        </nav>
      </header>
      <main className="appMain">
        <Routes>
          <Route element={<ListPage />} path="/" />
          <Route element={<DetailPage />} path="/entries/:id" />
          <Route element={<CreatePage />} path="/create" />
          <Route element={<ListPage />} path="*" />
        </Routes>
      </main>
    </div>
  )
}

export default App
