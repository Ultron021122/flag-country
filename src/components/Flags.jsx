import { useState, useEffect } from 'react';
import axios from 'axios';

export function Flags() {
    const [datos, setDatos] = useState([]);
    const [load, setLoad] = useState(true);
    const [error, setError] = useState(null);

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

    if (load) {
        return <p>load...</p>;
    }

    if (error) {
        return <p>Error al cargar datos: {error.message}</p>;
    }

    return (
        <div className='container p-2 mx-auto my-5'>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {datos.map((pais, index) => (
                    <div key={index} className="max-w-sm bg-white border border-gray-300 rounded-lg shadow-md">
                        <img src={pais.flags.png} className='h-48 w-full rounded-t-sm' alt={`Bandera de ${pais.name}`} />
                        <div className="px-2 py-4 w-4/5 mx-auto">
                            <h2 className='font-bold text-2xl'>{pais.name}</h2>
                            <div>
                                <p>Population: {pais.population.toLocaleString('es-ES')}</p>
                                <p>Region: {pais.region}</p>
                                <p>Capital: {pais.capital}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
