import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Converter from '../pages/converter'
import Rate from '../pages/rate'

const AppRouter = () => {


    return (
        <BrowserRouter>
            <Routes>
                <Route path='/rate' element={<Rate />} />
                <Route path='/' element={<Converter />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter