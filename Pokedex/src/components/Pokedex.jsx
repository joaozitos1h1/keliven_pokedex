import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import './pokemon.css'

export default function Pokedex() {
  const [id, setId] = useState(1);
  const [pokemon, setPokemon] = useState(null);
  const [direction, setDirection] = useState(null);

  const fetchData = async () => {
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await res.json();
      setPokemon(data);
    } catch (error) {
      console.error("Erro ao buscar dados: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const nextPokemon = () => {
    setDirection("next");
    setId(id + 1);
  };

  const previousPokemon = () => {
    setDirection("previous");
    try {
      setId(id - 1);
    } catch (error) {
      console.error("Não tem pokemon anterior", error);
    }
  };

  return (
    <div>
      {pokemon && (
        <motion.div
          key={id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="pokemon">
            <p id="name">{pokemon.name}</p>
            <img src={pokemon.sprites.front_default} alt="{pokemon.name}" />
            
            <div className="buttons">
              <button onClick={previousPokemon}>Anterior</button>
              <button onClick={nextPokemon}>Próximo</button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
