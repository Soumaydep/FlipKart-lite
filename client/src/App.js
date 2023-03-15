import logo from './logo.svg';
import './App.css';
import Header from './component/header/Header';
import Home from './component/home/Home';
import {Box} from '@mui/material';
import DataProvider from './context/DataProvider';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import DetailView from './component/details/DetailView';
import Cart from './component/cart/Cart';
import PaymentSuccess from './component/PaymentSuccess';



function App() {
  return (
    <DataProvider >
      <BrowserRouter>
      <Header/>
      <Box style={{marginTop:54}}>
        <Routes>

          {/* <Route  path='/' element={<ProtectRoute Component={Home}/>}/> */}
          {/* <Route path='/cart' element={<ProtectRoute Component={Cart}/>}/>  */}
          
          <Route path='/' element={<Home/> }/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/product/:id' element={<DetailView/>}/>
          <Route path='/paymentsuccess' element={<PaymentSuccess/>} />
          
        </Routes>
      </Box>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
