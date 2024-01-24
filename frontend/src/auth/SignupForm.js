import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import './Form.css';

//form for signing up
function SignupForm() {
    const { login } = useContext(AuthContext);
    const history = useHistory();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`{process.env.REACT_APP_API_BASE_URL}/users/register`, { username, password });
            login(response.data.token, username); 
            history.push('/'); 
        } catch (err) {
            if (err.response) {
                setError(err.response.data.error.message);
            } else {
                setError("The server did not respond.");
            }
        }
    };

return (
    <div className="form-body">
      <div className="form-container">
        <h2 className="form-header">Sign Up</h2>
        {error && <p className="form-error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Username:</label>
                <input className="form-input" type="text" value={username} onChange={e => setUsername(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Password:</label>
                <input className="form-input" type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <br></br>
            <div classname="form-button-container">
              <button className="form-button-text" type="submit">Submit</button>
            </div>
        </form>
      </div>
    </div>
  );
}

export default SignupForm;
