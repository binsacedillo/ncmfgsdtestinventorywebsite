import { useEffect, useState } from 'react';
import axios from 'axios';
import bgimage from '../images/bgimage.jpg'
import { useNavigate, useParams } from 'react-router-dom';

function Update() {
    const {id} = useParams();
    const navigate = useNavigate();

    const [datas, setDatas] = useState({
        name: '',
        unit: '',
        quantity: '',
        datetime: '',
        supplier: ''
    });

    useEffect(() => {
        axios.get('http://localhost:8081/read/'+id)
            .then((res) => {
                setDatas({ ...datas, name: res.data[0].name, unit: res.data[0].unit, quantity: res.data[0].quantity, datetime: res.data[0].datetime })
            })
            .catch((err) => console.log(err));
    }, []);

    const handleUpdate = (event) => {
        event.preventDefault();
        axios.put('http://localhost:8081/update/'+id, datas)
        .then(res => {
            console.log(res)
            navigate('/')
        }).catch(err => console.log(err));
    }

    return (
        <main>
            <header className="bg-cover bg-left h-32 flex items-center justify-center bg-gray-200" style={{ backgroundImage: `url(${bgimage})` }}>
                <div className="mr-4">
                    <h1 className="text-2xl text-center font-bold text-white">NCMF GSD INVENTORY</h1>
                </div>
            </header>
            <div className="flex flex-col items-center mt-4 mb-4 justify-center">
                <h1 className="text-3xl font-bold">Update Inventory Data</h1>
                <form onSubmit={handleUpdate} className="flex flex-col items-center gap-4 mt-8">
                    <div className="flex flex-col w-full max-w-md">
                        <label className="text-sm font-medium" htmlFor="name">
                            Name
                        </label>
                        <input
                            className="border border-gray-300 rounded-md px-4 py-2"
                            type="text"
                            id="name"
                            placeholder="Enter item name"
                            value={datas.name}
                            onChange={(e) => setDatas({ ...datas, name: e.target.value })}
                        />
                    </div>
                    <div className="flex flex-col w-full max-w-md">
                        <label className="text-sm font-medium" htmlFor="unit">
                            Unit
                        </label>
                        <input
                            className="border border-gray-300 rounded-md px-4 py-2"
                            type="text"
                            id="unit"
                            placeholder="Enter unit of measurement"
                            value={datas.unit}
                            onChange={(e) => setDatas({ ...datas, unit: e.target.value })}
                        />
                    </div>
                    <div className="flex flex-col w-full max-w-md">
                        <label className="text-sm font-medium" htmlFor="quantity">
                            Quantity
                        </label>
                        <input
                            className="border border-gray-300 rounded-md px-4 py-2"
                            type="number"
                            id="quantity"
                            placeholder="Enter quantity"
                            value={datas.quantity}
                            onChange={(e) => setDatas({ ...datas, quantity: e.target.value })}
                        />
                    </div>
                    <div className="flex flex-col w-full max-w-md">
                        <label className="text-sm font-medium" htmlFor="datetime">
                            Date and Time
                        </label>
                        <input
                            className="border border-gray-300 rounded-md px-4 py-2"
                            type="datetime-local"
                            id="datetime"
                            placeholder="Enter date and time"
                            value={datas.datetime}
                            onChange={(e) => setDatas({ ...datas, datetime: e.target.value })}
                        />
                    </div>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-medium rounded-md px-4 py-2"
                        type="submit"
                    >
                        Update
                    </button>
                </form>
            </div>
            <footer className="text-black p-4 mt-12 text-center">
                <div className="border-t-2 border-green-400"></div>
                <p className="text-sm">
                    &copy; {new Date().getFullYear()} NATIONAL COMMISSION ON MUSLIM FILIPINOS | GENERAL SERVICES DIVISION
                </p>
            </footer>
        </main>
    );
}

export default Update;