import styles from '../css/style.css';
import * as React from "react";
import { Link } from "react-router-dom";

export function Header(props){
	if (props.pos == "left") {
		return (<>
			<img src="../img/droite.png" className="up" />
			<div className='navbar'>
				<Link to='/home'>
					<div className='selected'>
						<p>Home</p>
					</div>
				</Link>
				<Link to='/pokaball'>
					<div>
						<p>Pokemons</p>
					</div>
				</Link>
				<Link to='/pokadex'>
					<div>
						<p>Pokadex</p>
					</div>
				</Link>
			</div>
		</>);
	} else if (props.pos == "right") {
		return (<>
			<img src="../img/gauche.png" className="up" />
			<div className='navbar'>
				<Link to='/home'>
					<div>
						<p>Home</p>
					</div>
				</Link>
				<Link to='/pokaball'>
					<div>
						<p>Pokemons</p>
					</div>
				</Link>
				<Link to='/pokadex'>
					<div className='selected'>
						<p>Pokadex</p>
					</div>
				</Link>
			</div>
		</>);
	} else {
		return (<>
			<img src="../img/mid.png" className="up" />
			<div className='navbar'>
				<Link to='/home'>
					<div>
						<p>Home</p>
					</div>
				</Link>
				<Link to='/pokaball'>
					<div className='selected'>
						<p>Pokemons</p>
					</div>
				</Link>
				<Link to='/pokadex'>
					<div>
						<p>Pokadex</p>
					</div>
				</Link>
			</div>
		</>);
	}
}