import { useState } from 'react';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        const response = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        // Todo: Create a type for the response that you get back from the server
        const data = await response.json();
        if (data.token) {
            localStorage.setItem("token", data.token)
            navigate("/todos");
        } else {
            alert("invalid credentials");
        }
    };

    return (
        <div style={{justifyContent: "center", display: "flex", width: "100%"}}>
            <div>
                <h2>Login</h2>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 10
                }}>
                    <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username' />
                    <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: 10
                    }}>
                        <div>New here?</div>
                            <Link to="/signup">Signup</Link>
                    </div>
                    <button onClick={handleLogin}>Login</button>
                </div>
            </div>
        </div>
    );
};

export default Login;
