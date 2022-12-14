import {Header} from "../components/header";

export function Home(){
    {document.title = "Home - Pokadex"}
   
    return (<>
    <div className="home">
        <img src="/img/welcome.png" className="hey" />
        <h1 className="title" >BIENVENUE SUR POKAPEDIA</h1>
        <img src="/img/welcome2.png" className="hey2" />
        <img src="/img/welcome2.png" className="hey3" />
        <img src="/img/welcome4.png" className="hey4" />
        <form>
            <button className="admin-btn" type="button">Admin</button>
        </form>
        <div className="paragraph">
            <p>Bienvenue sur pokapedia votre pokedex de reférence en ligne. Sur pokapedia vous pourrez trouver tout vos pokemons favoris mais aussi en connaitres d'autres. Pokapedia est un site libre d'acces. Les developpeurs de ce site se nommes Kyllian et Gwendal. Deux etudiants à Gaming Campus. </p>
            <p>Les devoloppeurs vous souhaitent une bonne experience sur pokepedia et vous souhaite également à toutes et à tous de devenir les meilleurs dresseurs/dresseuses</p>
        </div>
    </div>
    </>);
    
}