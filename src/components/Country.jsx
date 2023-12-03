import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Loading } from '../Skeleton';

export const Country = () => {
    const { id } = useParams();
    const [pais, setPais] = useState(null);
    const navigate = useNavigate();

    let currencies
    let languages

    useEffect(() => {
        // Cargar el archivo JSON localmente (ajusta la ruta según tu estructura de archivos)
        axios.get('/api/data.json')
            .then(response => {
                // Buscar el país por su ID
                const paisEncontrado = response.data.find(p => p.name === id);
                setPais(paisEncontrado);
            })
            .catch(error => {
                console.error('Error al cargar los datos:', error);
            });
    }, [id]);

    const handleBack = () => {
        navigate(-1); // -1 para retroceder en la historia
    };

    if (!pais) {
        return <Loading />;
    }
    if (pais.currencies) {
        currencies = pais.currencies.map((currencie) => currencie.name);
    }
    if (pais.languages) {
        languages = pais.languages.map((lenguaje) => lenguaje.name);
    }

    return (
        <div className='container mx-auto p-2 my-5'>
            <button type="button" onClick={handleBack} className="text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-700 dark:hover:bg-gray-700 me-2 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 me-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                Back
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full my-10">
                <img className="object-cover w-full max-h-96 rounded-t-lg md:rounded-none md:rounded-s-lg p-3" src={pais.flags.svg} alt={`Bandera de ${pais.name}`} />
                <div className="grid grid-cols-1 gap-2 p-4 leading-normal items-end">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900">{pais.name}</h2>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
                        <ul className="max-w-md list-none list-inside">
                            <li className="font-semibold">Native Name: <span className='font-normal'>{pais.nativeName}</span></li>
                            <li className="font-semibold">Population: <span className='font-normal'>{pais.population}</span></li>
                            <li className="font-semibold">Region: <span className='font-normal'>{pais.region}</span></li>
                            <li className="font-semibold">Sub Region: <span className='font-normal'>{pais.subregion}</span></li>
                            <li className="font-semibold">Capital: <span className='font-normal'>{pais.capital ? pais.capital : "Value not found"}</span></li>
                        </ul>
                        <ul className="max-w-md list-none list-inside">
                            <li className="font-semibold">Top Level Domain: <span className='font-normal'>{pais.topLevelDomain ? pais.topLevelDomain : "Value not found"}</span></li>
                            <li className="font-semibold">Currencies: <span className='font-normal'>{currencies ? currencies.join(", ") : "Value not found"}</span></li>
                            <li className="font-semibold">Languages: <span className='font-normal'>{languages ? languages.join(", ") : "Value not found"}</span></li>
                        </ul>
                    </div>
                    <p className="mb-3 font-normal text-gray-700">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                </div>
            </div>
        </div>
    );
};