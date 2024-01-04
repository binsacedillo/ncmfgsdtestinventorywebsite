import { useEffect, useState } from 'react'
import bgimage from '../images/bgimage.jpg'
import axios from 'axios'
import { Link } from 'react-router-dom'

function Home() {

    const truncateTable = async () => {
        try {
            const response = await axios.post('http://localhost:8081/');
            alert(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const handleContextmenu = e => {
            e.preventDefault();
        }
        document.addEventListener('contextmenu', handleContextmenu);

        return function cleanup() {
            document.removeEventListener('contextmenu', handleContextmenu);
        }
    }, []);

    const [data, setData] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8081/')
            .then(res => setData(res.data))
            .catch(err => console.error(err));
    }, [])

    const deleteData = (id) => {
        axios.delete(`http://localhost:8081/delete/` + id)
            .then(function (response) {
                console.log(response.data);
                window.location.reload();  // Reload the page
            })
            .catch(function (error) {
                console.error(error);
            });
    }

    return (
        <>
            <main>
                <header className="bg-cover bg-left h-32 flex items-center justify-center bg-gray-200" style={{ backgroundImage: `url(${bgimage})` }}>
                    <div className="mr-4">
                        <h1 className="text-2xl text-center font-bold text-white">NCMF GSD INVENTORY</h1>
                    </div>
                </header>
                <section>
                    <div className="m-1.5 flex justify-between items-center">
                        <p className="p-2 font-medium text-xl text-center">INVENTORY LIST</p>
                        <div className="flex">
                            <Link to={'/login'} className="p-2 font-semibold bg-lime-900 text-white rounded text-lg text-center mr-2">CREATE +</Link>
                            <button className="text-xs p-2 font-semibold bg-lime-900 text-white rounded text-center mr-2" onClick={truncateTable}>Reset Table ID</button>
                        </div>
                    </div>

                    <div className="overflow-x-auto h-auto">
                        <table className="table-auto w-full border">
                            <thead className='border'>
                                <tr>
                                    <th className="px-4 py-2 border-4 border-black">ID</th>
                                    <th className="px-4 py-2 border-4 border-black">Name</th>
                                    <th className="px-4 py-2 border-4 border-black">Unit</th>
                                    <th className="px-4 py-2 border-4 border-black">Quantity</th>
                                    <th className="px-4 py-2 border-4 border-black">Date and Time</th>
                                    <th className="px-4 py-2 border-4 border-black">Supplier</th>
                                    <th className="px-4 py-2 border-4 border-black">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((datas, index) => {
                                    return <tr key={index}>
                                        <td className="px-4 text-center py-2 border-4 border-black">{datas.id}</td>
                                        <td className="px-4 py-2 border-4 border-black">{datas.name}</td>
                                        <td className="px-4 py-2 border-4 border-black">{datas.unit}</td>
                                        <td className="px-4 py-2 border-4 border-black">{datas.quantity}</td>
                                        <td className="px-4 py-2 border-4 border-black">
                                            {new Date(datas.datetime).toLocaleString()}
                                        </td>
                                        <td className="px-4 py-2 border-4 border-black">{datas.supplier}</td>
                                        <td className="px-4 py-2 border-4 border-black">
                                            <Link to={`/read/${datas.id}`} className='mx-1 hover:bg-sky-200 hover:text-black	bg-lime-500 text-white p-1.5	rounded'>Read</Link>
                                            <Link to={`/edit/${datas.id}`} className='mx-1 hover:bg-sky-200 hover:text-black	bg-blue-500 text-white p-1.5	rounded'>Edit</Link>
                                            <button onClick={() => deleteData(datas.id)} className='mx-1 hover:bg-sky-200 hover:text-black	bg-red-500 text-white p-1.5	rounded'>Delete</button>
                                        </td>
                                    </tr>
                                })}

                            </tbody>
                        </table>
                    </div>
                </section>
                <footer className="text-black p-4 mt-12 text-center">
                    <div className="border-t-2 border-green-400"></div>
                    <p className="text-sm">
                        &copy; {new Date().getFullYear()} NATIONAL COMMISSION ON MUSLIM FILIPINOS | GENERAL SERVICES DIVISION
                    </p>
                </footer>
            </main>
        </>
    )
}

export default Home