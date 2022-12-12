import axios from 'axios';
import Pokaball from "../components/pokaball";

function PokemonSearch(){
    const searchBar = {};
    const response = axios.post('http://localhost:4444/pokemon/list', searchBar);
    return <div className="pokemon-list"><p>{response}</p>
    {
        response.map((pokemon,key) =>{
            return <Pokaball pokemon={pokemon.img} />
        })
    }
    </div>;
}

export default PokemonSearch;