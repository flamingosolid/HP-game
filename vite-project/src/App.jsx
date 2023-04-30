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
          img: data[id].image,
        });
      });
  }, [id]);

  function playerGuess(input) {
    const guessedWord = input.target.value;
    setGuess(guessedWord);
  }

  function handleGuess() {
    if (guessCount === 8 && !correctAnswer) {
      setGameOver(true);
    }
    if (!guess) {
      setGuessCount(guessCount + 1);
      console.log("no input");
    } else {
      if (guess.toLowerCase().trim() === character.name.toLowerCase()) {
        setCorrectAnswer(true);
        setTimeout(() => {
          setId(Math.floor(Math.random() * 401));
          setCorrectAnswer(false);
          setGuessCount(0);
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
      <h1 className={correctAnswer ? "correct" : null}>
        {correctAnswer ? character.name : "?"}
      </h1>
      <img src={character.img} />
      {gameover ? <GameOver /> : null}

      <div className="character-container">
        <div>
          <h4>Gender</h4>
          <p>{character.gender}</p>
        </div>
        <div>
          <h4>House</h4>
          <p>{character.house}</p>
        </div>

        <div>
          <h4>Species</h4>
          <p>{character.species}</p>
        </div>
        <div>
          <h4>Wand</h4>
          <p>{character.wand}</p>
        </div>
        <div>
          <h4>Patronus</h4>
          <p>{!character.patronus ? "?" : character.patronus}</p>
        </div>
        <div>
          <h4>Alternate Names</h4>
          <p>
            {character.alternate_names
              ? character.alternate_names.map((name) => name + ", ")
              : character.alternate_names}
          </p>
        </div>
        <div>
          <h4>Actor</h4>
          <p>{character.actor}</p>
        </div>
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
