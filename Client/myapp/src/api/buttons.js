import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

export function EditBtn(props) {
    const dir = 'edit/'.concat('', props.id.id)
    return <><div className='edit-btn'><Link to={dir}>Edit</Link></div></>
}
export function AddToPokadex(props) {
    var searchBar = {"pokaID": props.id};
    const [ inPokadex, switchInPokadex ] = useState(null);

    useEffect(() => {
        if (inPokadex==null) {
            const response = axios.post('http://localhost:4444/pokadex/list', searchBar);
            response
                .then(result => {
                    if (result.data.length !== 0) {
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
                        if (pokadex !== resultlen) {
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

    return (<><br />
        <Link to="/home">
            <button className="edit-btn delete-btn" onClick={() => {
                var searchBar = {"_id": props.pokeInfo._id}
                fetch('http://localhost:4444/pokemon/delete', {
                        method: 'DELETE',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify([searchBar])
                    })
                    .then(() => this.setState({ status: 'Delete successful' }));
            }} >Supprimer</button>
        </Link>
    </>);
}
export function PokemonSave(props) {
    return (<><br />
        <button className="edit-btn save-btn" onClick={() => {
            var searchBar = props.pokeInfo;
            searchBar.num = Number(searchBar.num);
            var id = searchBar._id
            delete searchBar._id
            delete searchBar.type
            searchBar = {'before': {'_id': id}, after: searchBar}
            console.log("searchbar: ", searchBar)
            axios.post('http://localhost:4444/pokemon/update', searchBar);
        }} >Sauvegarder</button>
    </>);
}

export function PokemonDuplicate(props) {
    var history = useHistory()

    return (<><br />
        <button className="edit-btn duplicate-btn" onClick={async () => {
            var searchBar = await props.pokeInfo;
            searchBar.num = await Number(searchBar.num);
            await delete searchBar._id
            searchBar.name = await searchBar.name + " - copy"
            await axios.post('http://localhost:4444/pokemon/insert', [searchBar]);
            searchBar = await searchBar.name;
            searchBar = await {name: searchBar}
            console.log(searchBar)
            await (axios.post('http://localhost:4444/pokemon/list', searchBar))
                .then(result => {
                    history.push('/pokemon/' + result.data[0]._id)
                })
                .catch(error=>console.error("Erreur avec notre API :",error.message));
                        
        }} >Dupliquer</button>
    </>);
}
