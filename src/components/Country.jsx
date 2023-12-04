import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Loading } from '../Skeleton';

export const Country = () => {
    const [borderCountries, setBorderCountries] = useState([]);
    const [country, setCountry] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();

    let currencies
    let languages

    useEffect(() => {
        axios.get('/api/data.json')
            .then(response => {
                // Buscar el país por su ID
                const countryEncontrado = response.data.find(result => result.name === id);
                setCountry(countryEncontrado);
                // Obtener nombres de países vecinos
                const borderCountryNames = countryEncontrado.borders.map(borderCode => {
                    const borderCountry = response.data.find(country => country.alpha3Code === borderCode);
                    return borderCountry ? borderCountry.name : '';
                });

                setBorderCountries(borderCountryNames);
            })
            .catch(error => {
                console.error('Error al cargar los datos:', error);
            });
    }, [id]);

    const handleBack = () => {
        navigate(-1);
    };

    if (!country) {
        return <Loading />;
    }
    if (country.currencies) {
        currencies = country.currencies.map((currencie) => currencie.name);
    }
    if (country.languages) {
        languages = country.languages.map((lenguaje) => lenguaje.name);
    }

    return (
        <div className='container mx-auto p-2 my-5'>
            <button type="button" onClick={handleBack} className="text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-md px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-700 dark:hover:bg-gray-700 me-2 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 me-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                Back
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full my-10">
                <img className="object-cover w-full max-h-96" src={country.flags.svg} alt={`Bandera de ${country.name}`} />
                <div className="grid grid-cols-1 gap-2 p-4 leading-normal items-center mx-auto">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-3">{country.name}</h2>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                        <ul className="max-w-md space-y-0.5 list-none list-inside">
                            <li className="font-semibold">Native Name: <span className='font-normal'>{country.nativeName}</span></li>
                            <li className="font-semibold">Population: <span className='font-normal'>{country.population.toLocaleString('es-ES')}</span></li>
                            <li className="font-semibold">Region: <span className='font-normal'>{country.region}</span></li>
                            <li className="font-semibold">Sub Region: <span className='font-normal'>{country.subregion}</span></li>
                            <li className="font-semibold">Capital: <span className='font-normal'>{country.capital ? country.capital : "Value not found"}</span></li>
                        </ul>
                        <ul className="max-w-md space-y-0.5 list-none list-inside">
                            <li className="font-semibold">Top Level Domain: <span className='font-normal'>{country.topLevelDomain ? country.topLevelDomain : "Value not found"}</span></li>
                            <li className="font-semibold">Currencies: <span className='font-normal'>{currencies ? currencies.join(", ") : "Value not found"}</span></li>
                            <li className="font-semibold">Languages: <span className='font-normal'>{languages ? languages.join(", ") : "Value not found"}</span></li>
                        </ul>
                    </div>
                    <div>
                        <p className="font-semibold">Border Countries:</p>
                        {borderCountries.length > 0 ? (
                            <div className="flex flex-wrap gap-2 items-center">
                                {borderCountries.map((country, index) => (
                                    <p
                                        key={index}
                                        className="text-sm border border-gray-200 font-medium rounded-sm px-3 py-1.5 text-center inline-flex items-center"
                                    >
                                        {country}
                                    </p>
                                ))}
                            </div>
                        ) : (
                            <p>No bordering countries found.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};