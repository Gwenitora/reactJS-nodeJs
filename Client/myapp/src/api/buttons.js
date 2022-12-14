import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export function EditBtn(props) {
    const dir = 'edit/'.concat('', props.id.id)
    return <><div className='edit-btn'><Link to={dir}>Edit</Link></div></>
}
export function AddToPokadex(props) {
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

export function PokemonDelete(props) {
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
export function PokemonSave(props) {
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
export function PokemonDuplicate(props) {
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