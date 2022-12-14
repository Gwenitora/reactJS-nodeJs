import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Pokaball from "../components/pokaball";

export function PokemonSearch(){
    {document.title = "All pokemons - Pokadex"}
    const searchBar = {};
    const [ pokemons, setPokemons ] = useState([]);

    useEffect(() => {
        const response = axios.post('http://localhost:4444/pokemon/list', searchBar);
        response
            .then(result => setPokemons(result.data))
            .catch(error=>console.error("Erreur avec notre API :",error.message));
    },[]);

    if (pokemons) {
        return <div className='center-pokemon-list'><div className="pokemon-list max-div">
        {
            pokemons.map((pokemon,key) =>{
                if (pokemon.up == "1 / 1" || pokemon.up == "2 / 2" || pokemon.up == "3 / 3") {
                    return <><Link to={"/pokemon/" + pokemon._id}><Pokaball pokemon={pokemon.img} hover={true} /></Link><div className='break' /></>;
                }
                return <Link to={"/pokemon/" + pokemon._id}><Pokaball pokemon={pokemon.img} hover={true} /></Link>;
            })
        }
        </div></div>;
    } else {
        return <div className='center-pokemon-list'><div className="pokemon-list max-div" /></div>;
    }
}

export function PokadexSearch(){
    {document.title = "Your pokadex - Pokadex"}
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
        return <div className='center-pokemon-list'><div className="pokemon-list max-div">
        {
            pokemons.map( (pokemon,key) => {
                return <Link to={"/pokemon/" + pokemon._id}><Pokaball pokemon={pokemon.img} hover={true} /></Link>;
            })
        }
    </div></div>;
    } else {
        return <div className='center-pokemon-list'><div className="pokemon-list" /></div>;
    }
}

export function PokemonDescription(){
    let id = useParams();
    const searchBar = {"_id": id};
    const [ pokemons, setPokemons ] = useState([]);
    const searchBar2 = {};
    const [ poke, setPoke ] = useState([]);
    var searchBar3 = {};
    const [ types, setTypes ] = useState([]);

    useEffect(() => {
        const response = axios.post('http://localhost:4444/pokemon/list', searchBar);
        response
            .then(result => {
                document.title = result.data[0].name + " - Pokadex"
                setPokemons(result.data)
                var ty = result.data[0].type
                ty = ty.map( (ele,key) => {
                    return {_id: ele}
                })
                searchBar3 = {$or: ty}
                const response3 = axios.post('http://localhost:4444/type/list', searchBar3);
                response3
                    .then(result => setTypes(result.data))
                    .catch(error=>console.error("Erreur avec notre API :",error.message));
            })
            .catch(error=>console.error("Erreur avec notre API :",error.message));
        const response2 = axios.post('http://localhost:4444/pokemon/list', searchBar2);
        response2
            .then(result => setPoke(result.data))
            .catch(error=>console.error("Erreur avec notre API :",error.message));
            
    },[]);

    if (pokemons[0]) {
        return <div className='center-pokemon-list'><div className="pokemon-desc">
            <Pokaball pokemon={pokemons[0].img} />
            <div>
                <h2>{pokemons[0].name}</h2>
                <p>Numéro de pokémon: {pokemons[0].num} / {poke.length} <br />Numéro d'évolution: {pokemons[0].up}</p>
                {
                    types.map( (type,key) => {
                        return <img src={type.img} />;
                    })
                }
            </div>
            {/* <AddToPokadex id={id} /> */}
        </div></div>;
    } else {
        return <div className='center-pokemon-list'><div className="pokemon-desc" /></div>;
    }
}

export function AddToPokadex(props) {
    var searchBar = {"_id": props.id};
    const [ inPokadex, switchInPokadex ] = useState([]);
    switchInPokadex(null)

    useEffect(() => {
        console.log("test")
        if (inPokadex==null) {
            const response = axios.post('http://localhost:4444/pokedex/list', searchBar);
            response
                .then(result => switchInPokadex(result.data != {}))
                .catch(error=>console.error("Erreur avec notre API :",error.message));
        }
            
    },[]);

    return (<>
        <p>Est dans le pokadex ? : {inPokadex}</p>
        <button title="Changer l'état" onPress={(axios, searchBar) => {
            const response = axios.post('http://localhost:4444/pokedex/list', searchBar);
            response
                .then(result => {
                    if (inPokadex != result.data) {
                        if (result.data == false) {
                            axios.delete('http://localhost:4444/pokedex/delete', searchBar);
                        } else {
                            axios.post('http://localhost:4444/pokedex/insert', [searchBar]);
                        }
                    }
                })
                .catch(error=>console.error("Erreur avec notre API :",error.message));
        }} />
    </>);
}