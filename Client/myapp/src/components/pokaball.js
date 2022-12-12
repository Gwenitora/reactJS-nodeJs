import styles from '../css/style.css';

function Pokaball(props){
    return (
    <svg className ="pokaball" xmlns="http://www.w3.org/2000/svg" width="125px" viewBox="0 0 40.98 40.98">
        <circle cx="20" cy="20" r="15" fill="#fff" stroke="#fff" />
        <path d="M 0.5 20.5
            a 1 1 1 0 1 40 0
            h-15
            a 1 1 1 0 0 -10 0
            z"
            fill="#f00" stroke="#222"
        ></path>
        <path d="M 0.5 20.5
            a 1 1 1 0 0 40 0
            h-15
            a 1 1 1 0 1 -10 0
            z"
            fill="#fff" stroke="#222"
        ></path>
        <image href={props.pokemon} height="100%" y="-15%" />
    </svg>
)}

export default Pokaball;