import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import AppProvider from './provider/AppProvider';
import ReviewPage from './components/pages/ReviewPage';
function App() {
    return (
        <AppProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/movies" element={<HomePage />} />
                    <Route path="/booking/create" element={<ReviewPage />} />
                </Routes>
            </BrowserRouter>
        </AppProvider>
    );
}

export default App;