import styles from '../css/style.css';

export function Header(props){
	if (props.pos == "left") {
		return (
			<img src="../img/droite.png" className="up" />
		)
	} else if (props.pos == "right") {
		return (
			<img src="../img/gauche.png" className="up" />
		)
	} else {
		return (
			<img src="../img/mid.png" className="up" />
		)
	}
}