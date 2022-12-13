import axios from 'axios';
import { useEffect, useState } from 'react';
import Pokaball from "../components/pokaball";

export function PokemonSearch(){
    const searchBar = {};
    const [ pokemons, setPokemons ] = useState([]);

    useEffect(() => {
        const response = axios.post('http://localhost:4444/pokemon/list', searchBar);
        response
            .then(result => setPokemons(result.data))
            .catch(error=>console.error("Erreur avec notre API :",error.message));
    },[]);

    if (pokemons) {
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
    } else {
        return <div className='center-pokemon-list'><div className="pokemon-list" /></div>;
    }
}

export function PokadexSearch(){
    const searchBar = {};
    const [ pokemons, setPokemons ] = useState([]);

    useEffect(() => {
        const response = axios.post('http://localhost:4444/pokadex/list', searchBar);
        response.then(result => {
                const search = result.data.map((id, key) => {
                    return {_id: id.pokaID};
                })
                const searchBar = {$or: search};
                const pokemon = axios.post('http://localhost:4444/pokemon/list', searchBar);
                pokemon.then(result => setPokemons(result.data))
                    .catch(error=>console.error("Erreur avec notre API :",error.message));
                })
                .catch(error=>console.error("Erreur avec notre API :",error.message));
    },[]);

    if (pokemons) {
        return <div className='center-pokemon-list'><div className="pokemon-list">
        {
            pokemons.map( (pokemon,key) => {
                return <Pokaball pokemon={pokemon.img} />;
            })
        }
    </div></div>;
    } else {
        return <div className='center-pokemon-list'><div className="pokemon-list" /></div>;
    }
}