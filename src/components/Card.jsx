import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const Card = ({ flag, name, population, region, capital }) => {
    
    const navigate = useNavigate();

    const handleClick = (id) => {
        navigate(`/country/${id}`);
    };

    return (
        <div className="max-w-sm bg-white rounded-lg shadow-md shadow-gray-400 dark:bg-gray-700 dark:shadow-gray-900" onClick={() => handleClick(name)}>
            <img src={flag} className='object-cover h-48 w-full rounded-t-sm' alt={`Bandera de ${name}`} />
            <div className='px-2 py-4 w-4/5 mx-auto'>
                <h2 className='font-bold text-xl dark:text-white'>{name}</h2>
                <div className='py-2 mb-2 text-sm'>
                    <p className='font-semibold dark:text-gray-100'>Population: <span className='font-normal dark:text-gray-300'>{population.toLocaleString('es-ES')}</span></p>
                    <p className='font-semibold dark:text-gray-100'>Region: <span className='font-normal dark:text-gray-300'>{region}</span></p>
                    <p className='font-semibold dark:text-gray-100'>Capital: <span className='font-normal dark:text-gray-300'>{capital ? capital : "Value not found"}</span></p>
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
