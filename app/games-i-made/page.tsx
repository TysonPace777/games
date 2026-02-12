import Wordle  from "./wordle";
import styles from "./games.module.css";

export default function GamesIMade() {

    return (
        <div>
            <h1>{"Tyson Pace's Games"}</h1>
            <div>
                <h2>Games I made</h2>
                <div className={styles.container}>
                    <Wordle />
                </div>
            </div>
        </div>
    );
}