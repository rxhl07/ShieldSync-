import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);

    // Keep them logged in if they refresh the page
    useEffect(() => {
        const session = localStorage.getItem('shieldsync_active_session');
        if (session) setCurrentUser(JSON.parse(session));
    }, []);

    const register = async (agentId, passcode) => {
        const res = await fetch('http://localhost:5000/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ agentId, passcode }),
        });
        const data = await res.json();

        if (!res.ok) throw new Error(data.error);

        localStorage.setItem('shieldsync_active_session', JSON.stringify(data.agent));
        setCurrentUser(data.agent);
        return data.agent;
    };

    const login = async (agentId, passcode) => {
        const res = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ agentId, passcode }),
        });
        const data = await res.json();

        if (!res.ok) throw new Error(data.error);

        localStorage.setItem('shieldsync_active_session', JSON.stringify(data.agent));
        setCurrentUser(data.agent);
        return data.agent;
    };

    const logout = () => {
        localStorage.removeItem('shieldsync_active_session');
        setCurrentUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated: !!currentUser, currentUser, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);