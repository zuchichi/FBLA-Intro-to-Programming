import { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../Pages/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const UserContext = createContext(null);

export function UserProvider({ children }) {
    const [userData, setUserData] = useState(null);
    const[loading, setLoading] = useState(true);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (user) => {
        if (user) {
            const snap = await getDoc(doc(db, 'users', user.uid));
            if (snap.exists()) setUserData(snap.data());
        } else {
            setUserData(null);
        }
        setLoading(false);
        });
        return () => unsub();
    }, []);

    return (
        <UserContext.Provider value={{ userData, setUserData, loading }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}