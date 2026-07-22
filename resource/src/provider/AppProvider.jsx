import { createContext, useEffect, useContext, useState, useMemo } from 'react';
import { api } from '../lib/axios';

const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [movies, setMovies] = useState([]);
    const [users, setUsers] = useState([]);
    const [booking, setBookings] = useState([]);
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await api.get('/movies');
                setMovies(response.data ?? []);
                const response1 = await api.get('/users');
                setUsers(response1.data ?? []);
                const response2 = await api.get('/bookings');
                setBookings(response2.data ?? []);
            } catch (err) {
                console.error(err);
                setError(err.message || 'Failed to fetch products');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, []);

    const value = useMemo(
        () => ({
            movies, setMovies,
            users, setUsers,
            booking, setBookings,
            
            loading,
            error
        }),
        [movies, setMovies,
            users, setUsers,
            booking, setBookings,
            
            loading,
            error]
    );

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);
export { AppContext, AppProvider };
export default AppProvider;
