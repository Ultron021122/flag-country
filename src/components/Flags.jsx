import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';
import { Loading } from '../Skeleton';

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
        return <Loading />;
    }
    if (error) {
        return <p>Error al cargar datos: {error.message}</p>;
    }

    return (
        <div className='container p-2 mx-auto my-5'>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {datos.map((pais, index) => (
                    <Card key={index} flag={pais.flags.svg} name={pais.name} population={pais.population} region={pais.region} capital={pais.capital} />
                ))}
            </div>
        </div>
    );
}
