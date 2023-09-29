import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PaginaPrincipal from './Pages/PaginaPrincipal'
import AdicionarTarefa from './Pages/AdicionarTarefa'
import EditarTarefa from './Pages/EditarTarefa'

export default function App(){
  return(
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<PaginaPrincipal/>}/>
          <Route path='/adicionartarefa' element={<AdicionarTarefa/>}/>
          <Route path='/editartarefa/:id' element={<EditarTarefa/>}/>
        </Routes>
      </Router>
    </div>
  )
}