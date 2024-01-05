import { useState } from 'react';
import bgimage from '../images/bgimage.jpg';
import { useNavigate } from 'react-router-dom';

function Login() {

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        const correctUsername = 'admin';
        const correctPassword = 'ncmfgsd';

        // Function to generate a random token
        const generateToken = () => {
            let token = '';
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            const length = 10; // Length of the token

            for (let i = 0; i < length; i++) {
                token += characters.charAt(Math.floor(Math.random() * characters.length));
            }

            return token;
        }

        if (username === correctUsername && password === correctPassword) {
            // Pretend calling API to log user in
            const token = generateToken();

            // Save token to session storage
            sessionStorage.setItem('token', token);

            navigate('/admin');
        } else {
            alert('Incorrect username or password');
        }
    }


    return (
        <>
            <header
                className="bg-cover bg-left h-32 flex items-center justify-center bg-gray-200"
                style={{ backgroundImage: `url(${bgimage})` }}
            >
                <div className="mr-4">
                    <h1 className="text-2xl text-center font-bold text-white">
                        NCMF GSD INVENTORY
                    </h1>
                </div>
            </header>
            <section>
                <form className="flex flex-col items-center justify-center mt-8">
                    <label>
                        Username:
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="mt-2 px-4 py-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </label>
                    <label>
                        Password:
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-2 px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </label>
                    <button
                        type="submit"
                        onClick={handleLogin}
                        className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
                    >
                        Login
                    </button>
                </form>
            </section>
            <footer className="text-black p-4 mt-12 text-center">
                <div className="border-t-2 border-green-400"></div>
                <p className="text-sm">
                    &copy; {new Date().getFullYear()} NATIONAL COMMISSION ON MUSLIM FILIPINOS | GENERAL SERVICES DIVISION
                </p>
            </footer>
        </>
    );
}

export default Login;
