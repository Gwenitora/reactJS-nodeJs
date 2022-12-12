import axios from 'axios';
import { useEffect, useState } from 'react';
import Pokaball from "../components/pokaball";

function PokemonSearch(){
    const searchBar = {};
    const [ pokemons, setPokemons ] = useState([]);

    useEffect(() => {
        const response = axios.post('http://localhost:4444/pokemon/list', searchBar);
        response
            .then(result => setPokemons(result.data))
            .catch(error=>console.error("Erreur avec notre API :",error.message));
    },[]);

    return <div className='center-pokemon-list'><div className="pokemon-list">
    {
        pokemons.map((pokemon,key) =>{
            if (pokemon.up == "1 / 1" || pokemon.up == "2 / 2" || pokemon.up == "3 / 3") {
                return <><Pokaball pokemon={pokemon.img} /><div className='break' /></>;
            }
            return <Pokaball pokemon={pokemon.img} />;
        })
    }
    </div></div>;
}

export default PokemonSearch;