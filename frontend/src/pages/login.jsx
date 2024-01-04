import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:3000/login', { username, password });

            if (response.data.msg === 'Login successful') {
                // Assuming your server sends a token upon successful login
                const token = response.data.token;

                // Save the token to local storage or a secure storage mechanism
                localStorage.setItem('token', token);

                // Redirect to the protected route after successful login
                navigate('/admin');
            } else {
                alert('Invalid credentials');
            }
        } catch (error) {
            console.error('Failed to login', error);
        }
    };

    return (
        <section>
            <form onSubmit={(e) => {
                e.preventDefault();
                handleLogin();
            }} className="flex flex-col items-center justify-center mt-8">
                <label>
                    Username:
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="px-4 py-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                </label>

                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                </label>

                <button onClick={handleLogin} type="submit" className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">Login</button>
            </form>
        </section>
    )
}

export default Login;
