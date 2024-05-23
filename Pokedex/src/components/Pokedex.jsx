import { useState, useEffect } from "react";
import './pokemon.css'

export default function Pokedex() {
  const [id, setId] = useState(1); //iniciando id com valor 1
  const [pokemon, setPokemon] = useState(null); //iniciando dado pokemon com valor nulo

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
    setId(id+ 1)
   }
   const previousPokemon = () => {
    try{ setId(id- 1)} catch (error) {
        console.error("Não tem pokemon anterior", error);
    }0
   }

  return (
    <>
      <div>
        {pokemon && (
          <div className="pokemon">
            <p id="name">{pokemon.name}</p>
            <img src={pokemon.sprites.front_default} alt="{pokemon.name}" />
            
            <div className="buttons">
            <button onClick={previousPokemon}>Anterior</button>
            <button onClick={nextPokemon}>Proximo</button></div>
          </div>
        )}
      </div>
    </>
  );
}
