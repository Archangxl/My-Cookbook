import {BrowserRouter, Routes, Route}  from 'react-router-dom';
import Registration from './Components/Registration';
import Login from './Components/Login';
import LandingPage from './Components/LandingPage';
import Dashboard from './Components/Dashboard';
import CreateRecipe from './Components/CreateRecipe';

function App() {
    return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<LandingPage />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Registration />}/>
                <Route path='/:userId/dashboard' element={<Dashboard />} />
                <Route path='/:userId/createRecipe' element={<CreateRecipe />} />
            </Routes>
        </BrowserRouter>
    </>
    );
}

export default App;
