import axios from "axios";
import bgimage from '../images/bgimage.jpg'
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function Read() {
  useEffect(() => {
    const handleContextmenu = e => {
      e.preventDefault();
    }
    document.addEventListener('contextmenu', handleContextmenu);

    return function cleanup() {
      document.removeEventListener('contextmenu', handleContextmenu);
    }
  }, []);

  const { id } = useParams();
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8081/read/" + id)
      .then((res) => {
        setDatas(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <main>
      <header className="bg-cover bg-left h-32 flex items-center justify-center bg-gray-200" style={{ backgroundImage: `url(${bgimage})` }}>
        <div className="mr-4">
          <h1 className="text-2xl text-center font-bold text-white">NCMF GSD INVENTORY</h1>
        </div>
      </header>
      <section className="flex flex-col items-center justify-center h-60 text-gray-800">
        <h1 className="text-4xl font-bold mb-4">Item Details</h1>
        {datas.length > 0 ? (
          <div className="flex bg-white p-4 rounded shadow-lg">
            <div className="flex flex-col items-center border-lime-400 border-r px-4">
              <label className="font-medium text-gray-500">ID</label>
              <h3 className="text-xl font-semibold">{datas[0].id}</h3>
            </div>
            <div className="flex flex-col items-center border-lime-400 border-r px-4">
              <label className="font-medium text-gray-500">Name</label>
              <h3 className="text-xl font-semibold">{datas[0].name}</h3>
            </div>
            <div className="flex flex-col items-center border-lime-400 border-r px-4">
              <label className="font-medium text-gray-500">Unit</label>
              <h3 className="text-xl font-semibold">{datas[0].unit}</h3>
            </div>
            <div className="flex flex-col items-center border-lime-400 border-r px-4">
              <label className="font-medium text-gray-500">Quantity</label>
              <h3 className="text-xl font-semibold">{datas[0].quantity}</h3>
            </div>
            <div className="flex flex-col items-center border-lime-400 border-r px-4">
              <label className="font-medium text-gray-500">Date and Time</label>
              <h3 className="text-xl font-semibold">
                {new Date(datas[0].datetime).toLocaleString()}
              </h3>
            </div>
            <div className="flex flex-col items-center px-4">
              <label className="font-medium text-gray-500">Supplier</label>
              <h3 className="text-xl font-semibold">{datas[0].supplier}</h3>
            </div>
          </div>
        ) : (
          <p className="text-lg font-semibold">Loading...</p>
        )}
        <div className="flex mt-4">
          <Link
            to="/"
            className="mx-1 hover:bg-sky-200 hover:text-black bg-lime-500 text-white py-2 px-4 rounded shadow-md"
          >
            Back
          </Link>
        </div>
      </section>
      <footer className="text-black p-4 mt-12 text-center">
        <div className="border-t-2 border-green-400"></div>
        <p className="text-sm">
          &copy; {new Date().getFullYear()} NATIONAL COMMISSION ON MUSLIM FILIPINOS | GENERAL SERVICES DIVISION
        </p>
      </footer>
    </main>

  );
}

export default Read;