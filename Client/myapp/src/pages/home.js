import {Header} from "../components/header";

export function Home(){
    {document.title = "Home - Pokadex"}
   
    return (<>
    <div className="title-home">
        <img src="/img/welcome2.png" className="carapuce" />
        <h1>BIENVENUE SUR POKAPEDIA</h1>
        <img src="/img/welcome2.png" className="carapuce reverse" />
    </div>
    <div className="home">
        <div className="pikachu">
            <img src="/img/welcome.png"/>
        </div>
        {/* <form>
            <button className="admin-btn" type="button">Creat New Pokemon</button>
        </form> */}
        <div className="paragraph-home">
            <div className="img">
                <img src="/img/welcome4.png" className="sasha-pika-home" />
            </div>
            <div className="text">
                <p>Bienvenue sur pokapedia votre pokedex de reférence en ligne. Sur pokapedia vous pourrez trouver tout vos pokemons favoris mais aussi en connaitres d'autres. Pokapedia est un site libre d'acces. Les developpeurs de ce site se nommes Kyllian et Gwendal. Deux etudiants à Gaming Campus.
                <br />Les devoloppeurs vous souhaitent une bonne experience sur pokepedia et vous souhaite également à toutes et à tous de devenir les meilleurs dresseurs/dresseuses</p>
            </div>
        </div>
    </div>
    </>);
    
}