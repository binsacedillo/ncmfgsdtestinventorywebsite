import { useState, useEffect } from 'react'
import bgimage from '../images/bgimage.jpg'
import axios from 'axios'
import { Link } from 'react-router-dom';

function Create() {
    const REACT_APP_BACKEND_URL = 'https://ncmfgsdtestinventorywebsite-production.up.railway.app'; 

    useEffect(() => {
        const handleContextmenu = e => {
            e.preventDefault();
        }
        document.addEventListener('contextmenu', handleContextmenu);

        return function cleanup() {
            document.removeEventListener('contextmenu', handleContextmenu);
        }
    }, []);

    const [values, setValues] = useState({
        name: '',
        unit: '',
        quantity: '',
        datetime: '',
        supplier: ''
    });

    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check for empty fields
        if (!values.name || !values.unit || !values.quantity) {
            setError('Please fill out all fields');

            // Clear the error message after 3 seconds (adjust as needed)
            setTimeout(() => {
                setError('');
            }, 3000);

            return;
        }

        axios.post(`${REACT_APP_BACKEND_URL}/datas`, values)
            .then(() => {
                alert('Form submitted successfully!');
                window.location.reload();
            })
            .catch(err => console.error(err));
    };

    return (
        <main>
            <header className="bg-cover bg-left h-32 flex items-center justify-center bg-gray-200" style={{ backgroundImage: `url(${bgimage})` }}>
                <div className="mr-4">
                    <h1 className="text-2xl text-center font-bold text-white">NCMF GSD INVENTORY</h1>
                </div>
            </header>
            <section>
                <div className="flex flex-col items-center mt-8 mb-4 justify-center">
                    <h1 className="text-3xl font-bold">Inventory Form</h1>
                    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 mt-8">
                        <div className="flex flex-col w-full max-w-md">
                            <label className="text-sm font-medium" htmlFor="name">Name</label>
                            <input className="border border-gray-300 rounded-md px-4 py-2" type="text" id="name" placeholder="Enter item name" onChange={e => setValues({ ...values, name: e.target.value })} />
                        </div>
                        <div className="flex flex-col w-full max-w-md">
                            <label className="text-sm font-medium" htmlFor="unit">Unit</label>
                            <input className="border border-gray-300 rounded-md px-4 py-2" type="text" id="unit" placeholder="Enter unit of measurement" onChange={e => setValues({ ...values, unit: e.target.value })} />
                        </div>
                        <div className="flex flex-col w-full max-w-md">
                            <label className="text-sm font-medium" htmlFor="quantity">Quantity</label>
                            <input className="border border-gray-300 rounded-md px-4 py-2" type="number" id="quantity" placeholder="Enter quantity" onChange={e => setValues({ ...values, quantity: e.target.value })} />
                        </div>
                        <div className="flex flex-col w-full max-w-md">
                            <label className="text-sm font-medium" htmlFor="datetime">Date and Time</label>
                            <input className="border border-gray-300 rounded-md px-4 py-2" type="datetime-local" id="datetime" placeholder="Enter date and time" onChange={e => setValues({ ...values, datetime: e.target.value })} />
                        </div>
                        <div className="flex flex-col w-full max-w-md">
                            <label className="text-sm font-medium" htmlFor="supplier">Supplier</label>
                            <input className="border border-gray-300 rounded-md px-4 py-2" type="text" id="supplier" placeholder="Enter supplier" onChange={e => setValues({ ...values, supplier: e.target.value })} />
                        </div>
                        {error && <div className="text-red-500">{error}</div>}
                        <div className="flex w-full max-w-md justify-between">
                            <Link to={'/'} className="bg-blue-500 hover:bg-blue-700 text-white font-medium rounded-md px-4 py-2" type="button">Back</Link>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-medium rounded-md px-4 py-2" type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </section>
            <footer className="text-black p-4 mt-12 text-center">
                <div className="border-t-2 border-green-400"></div>
                <p className="text-sm">
                    &copy; {new Date().getFullYear()} NATIONAL COMMISSION ON MUSLIM FILIPINOS | GENERAL SERVICES DIVISION
                </p>
            </footer>
        </main>
    )
}

export default Create