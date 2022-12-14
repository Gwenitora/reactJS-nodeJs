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
            <Pokaball pokemon={pokemons[0].img} hover={true} />
            <div>
                <h2>{pokemons[0].name}</h2>
                <p>Numéro de pokémon: {pokemons[0].num} / {poke.length} <br />Numéro d'évolution: {pokemons[0].up}</p>
                {
                    types.map( (type,key) => {
                        return <img src={type.img} />;
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

function EditBtn(props) {
    const dir = 'edit/'.concat('', props.id.id)
    return <><div className='edit-btn'><Link to={dir}>Edit</Link></div></>
}

function AddToPokadex(props) {
    var searchBar = {"pokaID": props.id};
    var searchBar2 = {"_id": props.id};
    const [ inPokadex, switchInPokadex ] = useState(null);

    useEffect(() => {
        if (inPokadex==null) {
            const response = axios.post('http://localhost:4444/pokadex/list', searchBar);
            response
                .then(result => {
                    if (result.data.length != 0) {
                        switchInPokadex(true)
                    } else {
                        switchInPokadex(false)
                    }
                })
                .catch(error=>console.error("Erreur avec notre API :",error.message));
        }
            
    },[]);

    if (inPokadex === true || inPokadex === false) {
        return (<>
            <button className={inPokadex?"pokadex-btn abandon-btn":"pokadex-btn capture-btn"} onClick={() => {
                var searchBar = {"pokaID": props.id};
                var searchBar2 = {"_id": props.id};
                const response = axios.post('http://localhost:4444/pokadex/list', searchBar);
                response
                    .then(result => {
                        const pokadex = !inPokadex
                        switchInPokadex(!inPokadex)
                        const resultlen = (result.data.length >= 1)
                        if (pokadex != resultlen) {
                            if (pokadex === true) {
                                axios.post('http://localhost:4444/pokadex/insert', [searchBar2]);
                            } else {
                                fetch('http://localhost:4444/pokadex/delete', {
                                        method: 'DELETE',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify([searchBar])
                                    })
                                    .then(() => this.setState({ status: 'Delete successful' }));
                            }
                        }
                    })
                    .catch(error=>console.error("Erreur avec notre API :",error.message));
            }} >{inPokadex?"Abandonner le pokemon":"Capturer le pokemon"}</button>
        </>);
    }
}

export function PokemonEdit(){
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
        return <div className='center-pokemon-list'><div className="pokemon-desc poke-edit">
            <div>
                <h2>{pokemons[0].name}</h2>
                <p>Numéro de pokémon: {pokemons[0].num} / {poke.length} <br />Numéro d'évolution: {pokemons[0].up}</p>
                {
                    types.map( (type,key) => {
                        return <img src={type.img} />;
                    })
                }
                <div className='pokes-btn'>
                    <PokemonDelete id={id} />
                    <PokemonSave id={id} />
                    <PokemonDuplicate id={id} />
                </div>
            </div>
        </div></div>;
    } else {
        return <div className='center-pokemon-list'><div className="pokemon-desc" /></div>;
    }
}

function PokemonDelete(props) {
    var searchBar = {"pokaID": props.id};
    var searchBar2 = {"_id": props.id};
    const [ inPokadex, switchInPokadex ] = useState(null);

    useEffect(() => {
        if (inPokadex==null) {
            const response = axios.post('http://localhost:4444/pokadex/list', searchBar);
            response
                .then(result => {
                    if (result.data.length != 0) {
                        switchInPokadex(true)
                    } else {
                        switchInPokadex(false)
                    }
                })
                .catch(error=>console.error("Erreur avec notre API :",error.message));
        }
            
    },[]);

    return (<><br />
        <button className="edit-btn delete-btn" onClick={() => {
            var searchBar = {"pokaID": props.id};
            var searchBar2 = {"_id": props.id};
            const response = axios.post('http://localhost:4444/pokadex/list', searchBar);
            response
                .then(result => {
                    const pokadex = !inPokadex
                    switchInPokadex(!inPokadex)
                    const resultlen = (result.data.length >= 1)
                    if (pokadex != resultlen) {
                        if (pokadex === true) {
                            axios.post('http://localhost:4444/pokadex/insert', [searchBar2]);
                        } else {
                            fetch('http://localhost:4444/pokadex/delete', {
                                    method: 'DELETE',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify([searchBar])
                                })
                                .then(() => this.setState({ status: 'Delete successful' }));
                        }
                    }
                })
                .catch(error=>console.error("Erreur avec notre API :",error.message));
        }} >Supprimer</button>
    </>);
}
function PokemonSave(props) {
    var searchBar = {"pokaID": props.id};
    var searchBar2 = {"_id": props.id};
    const [ inPokadex, switchInPokadex ] = useState(null);

    useEffect(() => {
        if (inPokadex==null) {
            const response = axios.post('http://localhost:4444/pokadex/list', searchBar);
            response
                .then(result => {
                    if (result.data.length != 0) {
                        switchInPokadex(true)
                    } else {
                        switchInPokadex(false)
                    }
                })
                .catch(error=>console.error("Erreur avec notre API :",error.message));
        }
            
    },[]);

    return (<><br />
        <button className="edit-btn save-btn" onClick={() => {
            var searchBar = {"pokaID": props.id};
            var searchBar2 = {"_id": props.id};
            const response = axios.post('http://localhost:4444/pokadex/list', searchBar);
            response
                .then(result => {
                    const pokadex = !inPokadex
                    switchInPokadex(!inPokadex)
                    const resultlen = (result.data.length >= 1)
                    if (pokadex != resultlen) {
                        if (pokadex === true) {
                            axios.post('http://localhost:4444/pokadex/insert', [searchBar2]);
                        } else {
                            fetch('http://localhost:4444/pokadex/delete', {
                                    method: 'DELETE',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify([searchBar])
                                })
                                .then(() => this.setState({ status: 'Delete successful' }));
                        }
                    }
                })
                .catch(error=>console.error("Erreur avec notre API :",error.message));
        }} >Sauvegarder</button>
    </>);
}
function PokemonDuplicate(props) {
    var searchBar = {"pokaID": props.id};
    var searchBar2 = {"_id": props.id};
    const [ inPokadex, switchInPokadex ] = useState(null);

    useEffect(() => {
        if (inPokadex==null) {
            const response = axios.post('http://localhost:4444/pokadex/list', searchBar);
            response
                .then(result => {
                    if (result.data.length != 0) {
                        switchInPokadex(true)
                    } else {
                        switchInPokadex(false)
                    }
                })
                .catch(error=>console.error("Erreur avec notre API :",error.message));
        }
            
    },[]);

    return (<><br />
        <button className="edit-btn duplicate-btn" onClick={() => {
            var searchBar = {"pokaID": props.id};
            var searchBar2 = {"_id": props.id};
            const response = axios.post('http://localhost:4444/pokadex/list', searchBar);
            response
                .then(result => {
                    const pokadex = !inPokadex
                    switchInPokadex(!inPokadex)
                    const resultlen = (result.data.length >= 1)
                    if (pokadex != resultlen) {
                        if (pokadex === true) {
                            axios.post('http://localhost:4444/pokadex/insert', [searchBar2]);
                        } else {
                            fetch('http://localhost:4444/pokadex/delete', {
                                    method: 'DELETE',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify([searchBar])
                                })
                                .then(() => this.setState({ status: 'Delete successful' }));
                        }
                    }
                })
                .catch(error=>console.error("Erreur avec notre API :",error.message));
        }} >Dupliquer</button>
    </>);
}