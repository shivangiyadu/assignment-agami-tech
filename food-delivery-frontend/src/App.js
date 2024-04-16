
import './App.css';

import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import { RegisterStaff } from './components/RegisterStaff';
import { PlaceOrder } from './components/PlaceOrder';

function App() {
  return (
    <Router>
   <Routes>
     
        <Route path='/' element={<RegisterStaff/>}/>
        <Route path='/place-order' element={<PlaceOrder/>}/>
       
  </Routes>
    </Router>
  );
}

export default App;
