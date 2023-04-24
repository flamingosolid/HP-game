import { useEffect, useState } from "react";

import "./App.css";

function App() {
  const [id, setId] = useState(0);
  const [maxChar, setMaxChar] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(false);

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
          gender: data[id].gender,
          house: data[id].house,
          species: data[id].species,
          wand: data[id].wand.core,
        });
      });
  }, [id]);

  function playerGuess(input) {
    const guessedWord = input.target.value;
    setGuess(guessedWord);
  }

  function handleGuess() {
    if (!guess) {
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
      <div className="character-container">
        <h1 className={correctAnswer ? "correct" : null}>
          {correctAnswer ? character.name : "?"}
        </h1>
        <h4>{character.gender}</h4>
        <h4>{character.house}</h4>
        <h4>{character.species}</h4>
        <h4>{character.wand}</h4>
      </div>
      {!id ? (
        <button>Previus</button>
      ) : (
        <button onClick={decrement}>Previus</button>
      )}
      {id === 401 ? (
        <button>Next</button>
      ) : (
        <button onClick={increment}>Next</button>
      )}
    </>
  );
}

export default App;
