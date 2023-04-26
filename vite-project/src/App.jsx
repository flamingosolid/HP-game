import { useEffect, useState } from "react";
import GameOver from "./components/Game-over";
import "./App.css";

function App() {
  const [id, setId] = useState(0);
  const [maxChar, setMaxChar] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(false);
  const [guessCount, setGuessCount] = useState(0);
  const [gameover, setGameOver] = useState(false);

  const [character, setCharacter] = useState({});
  const [guess, setGuess] = useState("");
  function increment() {
    setId(id + 1);
  }
  function decrement() {
    setId(id - 1);
  }

  useEffect(() => {
    fetch("https://hp-api.onrender.com/api/characters")
      .then((res) => res.json())
      .then((data) => {
        console.log(data[id]);
        setMaxChar(data.length - 1);
        setCharacter({
          name: data[id].name,
          species: data[id].species,
          gender: data[id].gender,
          wand: [
            data[id].wand.wood,
            ", ",
            data[id].wand.core,
            ", ",
            data[id].wand.length,
            " inches",
          ],
          house: data[id].house,
          patronus: data[id].patronus,
          alternate_names: data[id].alternate_names,
          actor: data[id].actor,
        });
      });
  }, [id]);

  function playerGuess(input) {
    const guessedWord = input.target.value;
    setGuess(guessedWord);
  }

  function handleGuess() {
    if (guessCount === 8) {
      setGameOver(true);
      console.log("You Loose");
    }
    if (!guess) {
      setGuessCount(guessCount + 1);
      console.log("no input");
    } else {
      if (guess.toLowerCase() === character.name.toLowerCase()) {
        console.log("correct name");
        setCorrectAnswer(true);
        setTimeout(() => {
          setId(Math.floor(Math.random() * 401));
          setCorrectAnswer(false);
        }, 3000);
      } else {
        setGuessCount(guessCount + 1);
        console.log("wrong name");
      }
    }
  }

  return (
    <>
      <div>
        <h1>Who am i?</h1>
      </div>
      <div>
        <input onChange={playerGuess} type="text" />
        <button onClick={handleGuess}>Revelio</button>
      </div>
      <div>{gameover ? 8 : guessCount} of 8 Guesses</div>
      <div className="character-container">
        <h1 className={correctAnswer ? "correct" : null}>
          {correctAnswer ? character.name : "?"}
        </h1>
        <h4>Gender: {character.gender}</h4>
        <h4>House: {character.house}</h4>
        <h4>Species: {character.species}</h4>
        <h4>Wand: {character.wand}</h4>
        <h4>Patronus: {!character.patronus ? "?" : character.patronus}</h4>
        <h4>
          Alternate Names:{" "}
          {character.alternate_names
            ? character.alternate_names.map((name) => name + ", ")
            : character.alternate_names}
        </h4>
        <h4>Actor: {character.actor}</h4>
      </div>
      {!id ? (
        <button>Previus</button>
      ) : (
        <button onClick={decrement}>Previus</button>
      )}
      {id === maxChar ? (
        <button>Next</button>
      ) : (
        <button onClick={increment}>Next</button>
      )}
    </>
  );
}

export default App;
