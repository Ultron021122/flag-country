import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const Card = ({ flag, name, population, region, capital }) => {
    
    const navigate = useNavigate();

    const handleClick = (id) => {
        navigate(`/country/${id}`);
    };

    return (
        <div className="max-w-sm bg-white rounded-lg shadow-md dark:bg-blue-400" onClick={() => handleClick(name)}>
            <img src={flag} className='object-cover h-48 w-full rounded-t-sm' alt={`Bandera de ${name}`} />
            <div className='px-2 py-4 w-4/5 mx-auto'>
                <h2 className='font-bold text-2xl'>{name}</h2>
                <div className=''>
                    <p>Population: {population.toLocaleString('es-ES')}</p>
                    <p>Region: {region}</p>
                    <p>Capital: {capital ? capital : "Value not found"}</p>
                </div>
            </div>
        </div>
    );
};

Card.propTypes = {
    flag: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    population: PropTypes.number.isRequired,
    region: PropTypes.string.isRequired,
    capital: PropTypes.string
};

export default Card;
