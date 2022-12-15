import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Pokaball from "../components/pokaball";
import { AddToPokadex, EditBtn, PokemonDelete, PokemonDuplicate, PokemonSave } from './buttons';

export function PokemonSearch(){
    document.title = "All pokemons - Pokadex"
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
                if (pokemon.up === "1 / 1" || pokemon.up === "2 / 2" || pokemon.up === "3 / 3") {
                    return <><Link to={"/pokemon/" + pokemon._id}><Pokaball pokemon={pokemon.img} /></Link><div className='break' /></>;
                }
                return <Link to={"/pokemon/" + pokemon._id}><Pokaball pokemon={pokemon.img} /></Link>;
            })
        }
        </div></div>;
    } else {
        return <div className='center-pokemon-list'><div className="pokemon-list max-div" /></div>;
    }
}

export function PokadexSearch(){
    document.title = "Your pokadex - Pokadex"
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
                return <Link to={"/pokemon/" + pokemon._id}><Pokaball pokemon={pokemon.img} /></Link>;
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
                var searchBar3 = {$or: ty}
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
            <Pokaball pokemon={pokemons[0].img} hover={true} />
            <div>
                <h2>{pokemons[0].name}</h2>
                <p>Numéro de pokémon: {pokemons[0].num} / {poke.length} <br />Numéro d'évolution: {pokemons[0].up}</p>
                {
                    types.map( (type,key) => {
                        return <img src={type.img} alt="img" />;
                    })
                }
                <div className='pokes-btn'>
                    <EditBtn id={id}/>
                    <AddToPokadex id={id} />
                </div>
            </div>
        </div></div>;
    } else {
        return <div className='center-pokemon-list'><div className="pokemon-desc" /></div>;
    }
}

export function PokemonEdit(){
    let id = useParams();
    const searchBar = {"_id": id};
    const [ pokemons, setPokemons ] = useState([]);
    const searchBar2 = {};
    const [ poke, setPoke ] = useState([]);
    const [ types, setTypes ] = useState([]);
    var searchBar4 = {};
    const [ allTypes, setAllTypes ] = useState([]);
    const [ inputName, setinputName ] = useState([]);
    const [ inputNum, setinputNum ] = useState([]);
    const [ inputUp, setinputUp ] = useState([]);
    const [ inputImg, setinputImg ] = useState([]);

    useEffect(() => {
        const response = axios.post('http://localhost:4444/pokemon/list', searchBar);
        response
            .then(result => {
                document.title = result.data[0].name + " - Pokadex"
                setPokemons(result.data)
                setinputName(result.data[0].name)
                setinputImg(result.data[0].img)
                setinputNum(result.data[0].num)
                setinputUp(result.data[0].up)
                var ty = result.data[0].type
                ty = ty.map( (ele,key) => {
                    return {_id: ele}
                })
                var searchBar3 = {$or: ty}
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
        const response4 = axios.post('http://localhost:4444/type/list', searchBar4);
        response4
            .then(result => setAllTypes(result.data))
            .catch(error=>console.error("Erreur avec notre API :",error.message));
            
    },[]);

    if (pokemons[0]) {
        return <div className='center-pokemon-list'><div className="pokemon-desc poke-edit">
            <div>
                <p>{pokemons[0]._id}</p>
                <textarea type="text" value={inputName} onChange={e => {
                        var poke = pokemons
                        poke[0].name = e.target.value
                        setPokemons(poke)
                        setinputName(e.target.value)
                    }} /><br />
                <textarea className='long' type="text" value={inputImg} onChange={e => {
                        var poke = pokemons
                        poke[0].img = e.target.value
                        setPokemons(poke)
                        setinputImg(e.target.value)
                    }} />
                <p>Numéro de pokémon: <input type="text" value={inputNum} onChange={e => {
                        var poke = pokemons
                        poke[0].num = e.target.value
                        setPokemons(poke)
                        setinputNum(e.target.value)
                    }} /> / {poke.length} <br />Numéro d'évolution: <input type="text" value={inputUp} onChange={e => {
                        var poke = pokemons
                        poke[0].up = e.target.value
                        setPokemons(poke)
                        setinputUp(e.target.value)
                    }} /></p>
                {
                    allTypes.map( (type) => {
                        var pass = false
                        types.forEach(ty => {
                            if (ty) {
                                if (ty.name === type.name) {
                                    pass = true
                                }
                            }
                        });
                        if (!pass) {
                            return <button className='btn-vide' onClick={() => {
                                var typie = types.map((typ) => {
                                    return {name: typ.name};
                                })
                                const actualbtn = {name: type.name};
                                setTypes(typie)
                                typie.push(actualbtn)
                                var searchBar5 = {"before": searchBar, "after": {type: typie}}
                                axios.post('http://localhost:4444/pokemon/update', searchBar5);
                            }}>
                                <img className='bw' src={type.img} alt="type disabled"/>
                            </button>;
                        }
                    })
                }<br /><br />{
                        allTypes.map( (type) => {
                            if (types.length >= 1) {
                                var pass = false
                                types.forEach(ty => {
                                    if (ty) {
                                        if (ty.name === type.name) {
                                            pass = true
                                        }
                                    }
                                });
                                if (pass) {
                                    return <button className='btn-vide' onClick={() => {
                                        var typie = types.map((typ) => {
                                            if (typ) {
                                                if (typ.name !== type.name) {
                                                    return {name: typ.name};
                                                }
                                            }
                                        })
                                        typie.splice(typie.indexOf(undefined), 1)
                                        setTypes(typie)
                                        var searchBar5 = {"before": searchBar, "after": {type: typie}}
                                        axios.post('http://localhost:4444/pokemon/update', searchBar5);
                                    }}>
                                        <img src={type.img} alt="type enabled"/>
                                    </button>;
                                }
                            }
                        })
                }
                <div className='pokes-btn'>
                    <PokemonDelete pokeInfo={pokemons[0]} />
                    <PokemonSave pokeInfo={pokemons[0]} />
                    <PokemonDuplicate pokeInfo={pokemons[0]} />
                </div>
            </div>
        </div></div>;
    } else {
        return <div className='center-pokemon-list'><div className="pokemon-desc" /></div>;
    }
}