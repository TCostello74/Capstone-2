import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext'; 

//logout function
const Logout = () => {
    const { logout } = useContext(AuthContext);
    const history = useHistory();

    useEffect(() => {
        logout(); 
        history.push('/');
    }, [logout, history]);

    return <div>Logging out...</div>;
};

export default Logout;
