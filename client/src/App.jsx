import './App.css'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Skeleton from './component/Skeleton'
import Home from './component/pages/Home'
import Login from './component/pages/Login'
import AddMenu from './component/pages/AddMenu'
import HandleTable from './component/pages/HandleTable'
import AddTable from './component/pages/AddTable'
import ProtectedRoute from './component/pages/ProtectedRoute'
function App() {
  return (
    <>
      <Router>
              <Routes>
                      <Route path='/login' element={<Login></Login>} />
                      <Route path='/' element=
                      {
                        <ProtectedRoute>
                          <Skeleton>
                            <Home/>
                          </Skeleton>
                        </ProtectedRoute>
                      } />
                      <Route path='/menu' element=
                      {
                        <ProtectedRoute>
                          <Skeleton>
                            <AddMenu/>
                          </Skeleton>
                        </ProtectedRoute>
                      } />
                      <Route path='/table' element=
                      {
                        <ProtectedRoute>
                          <Skeleton>
                            <HandleTable/>
                          </Skeleton>
                        </ProtectedRoute>
                      } />
                      <Route path='/add-table' element=
                      {
                        <ProtectedRoute>
                          <Skeleton>
                            <AddTable/>
                          </Skeleton>
                        </ProtectedRoute>
                      } />
              </Routes>
      </Router>
    </>
  )
}


export default App
