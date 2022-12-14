import styles from '../css/style.css';

export function Footer(props){
	if (props.pos == "left") {
		return (
			<img src="/img/droite.png" className="down" />
		)
	} else if (props.pos == "right") {
		return (
			<img src="/img/gauche.png" className="down" />
		)
	} else {
		return (
			<img src="/img/mid.png" className="down" />
		)
	}
}