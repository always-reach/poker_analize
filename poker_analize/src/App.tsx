import {BrowserRouter,Routes,Route} from 'react-router-dom'
import {Top} from './component/top'
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Top />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
