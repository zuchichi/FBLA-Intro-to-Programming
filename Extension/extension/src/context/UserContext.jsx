import { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../Pages/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const UserContext = createContext(null);

export function UserProvider({ children }) {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const unsubscribeSnapshot = onSnapshot(
                    doc(db, 'users', user.uid),
                    (snap) => {
                        if (snap.exists()) {
                            setUserData(snap.data());
                        }
                        setLoading(false);
                    },
                    (error) => {
                        console.error('Error fetching user data:', error);
                        setLoading(false);
                    }
                );
                return unsubscribeSnapshot;
            } else {
                setUserData(null);
                setLoading(false);
            }
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