export function Home(){
    document.title = "Home - Pokadex"
   
    return (<>
    <div className="title-home">
        <img src="/img/welcome2.png" className="carapuce" alt="image1" />
        <h1>BIENVENUE SUR POKAPEDIA</h1>
        <img src="/img/welcome2.png" className="carapuce reverse" alt="image2" />
    </div>
    <div className="home">
        <div className="pikachu">
            <img src="/img/welcome.png" alt="image3" />
        </div>
        <div className="paragraph-home">
            <div className="img">
                <img src="/img/welcome4.png" className="sasha-pika-home" alt="image4" />
            </div>
            <div className="text">
                <p>Bienvenue sur pokapedia votre pokedex de reférence en ligne. Sur pokapedia vous pourrez trouver tout vos pokemons favoris mais aussi en connaitres d'autres. Pokapedia est un site libre d'acces. Les developpeurs de ce site se nommes Kyllian et Gwendal. Deux etudiants à Gaming Campus.
                <br />Les developpeurs vous souhaitent une bonne experience sur pokapedia et vous souhaite également à toutes et à tous de devenir les meilleurs dresseuses/dresseur</p>
            </div>
        </div>
    </div>
    </>);
    
}