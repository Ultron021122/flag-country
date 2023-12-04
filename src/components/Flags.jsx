import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';
import { Loading } from '../Skeleton';

export function Flags() {
    const [datos, setDatos] = useState([]);
    const [load, setLoad] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        axios.get('/api/data.json')
            .then(response => {
                setDatos(response.data);
                setLoad(false);
            })
            .catch(error => {
                setError(error);
                setLoad(false);
            });
    }, []);

    const filteredDatos = datos.filter(country =>
        country.name.includes(searchTerm)
    );

    if (load) {
        return <Loading />;
    }
    if (error) {
        return <p>Error al cargar datos: {error.message}</p>;
    }

    return (
        <div className='container p-2 mx-auto my-5'>
            <div className='grid grid-cols-1 sm:grid-cols-2 mb-5'>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-100" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input
                        type="search"
                        id="default-search"
                        className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-100 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search for a country..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <select id="default" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option selected>Choose a country</option>
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="FR">France</option>
                        <option value="DE">Germany</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredDatos.length > 0 ? (
                    filteredDatos.map((country, index) => (
                        <Card key={index} flag={country.flags.svg} name={country.name} population={country.population} region={country.region} capital={country.capital} />
                    ))
                ) : (
                    <p className='text-center'>No matches found</p>
                )}
            </div>
        </div>
    );
}
