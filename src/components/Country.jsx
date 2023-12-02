import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export const Country = () => {
  const { id } = useParams();
  const [pais, setPais] = useState(null);

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

  if (!pais) {
    return <p>Cargando...</p>;
  }

  return (
    <div>
      <h2>{pais.name}</h2>
      <p>Population: {pais.population}</p>
      {/* Otros detalles del país */}
    </div>
  );
};