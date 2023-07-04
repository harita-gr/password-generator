import { useState, useRef, useEffect } from "react";
import { FaClipboard } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  numbers,
  upperCaseLetters,
  lowerCaseLetters,
  specialCharacters,
} from "./utils/Characters";
import { COPY_SUCCESS, ALERT } from "./utils/Message";
import "./styles/styles.scss";

toast.configure();

function App() {
  const copyBtn = useRef();
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(20);
  const [upperCase, setUpperCase] = useState(true);
  const [lowerCase, setLowerCase] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [number, setNumber] = useState(true);

  const handleGeneratePassword = () => {
    if (!upperCase && !lowerCase && !number && !symbols) {
      notify(ALERT, true);
    }

    let characterList = "";
    if (upperCase) {
      characterList += upperCaseLetters;
    }
    if (lowerCase) {
      characterList += lowerCaseLetters;
    }
    if (number) {
      characterList += numbers;
    }
    if (symbols) {
      characterList += specialCharacters;
    }

    setPassword(passwordCreator(characterList));
  };

  const passwordCreator = (characterList) => {
    let password = "";
    const characterListLength = characterList.length;

    for (let i = 0; i < passwordLength; i++) {
      const charIndex = getRandomIndex(characterListLength);
      password = password + characterList.charAt(charIndex);
    }

    return password;
  };

  const getRandomIndex = (limit) => {
    return Math.round(Math.random() * limit);
  };

  const copyFromClipboard = () => {
    const newTextArea = document.createElement("textarea");
    newTextArea.innerText = password;
    document.body.appendChild(newTextArea);
    newTextArea.select();
    document.execCommand("copy");
    newTextArea.remove();

    copyBtn.current.disabled = true;
    setTimeout(() => {
      copyBtn.current.disabled = false;
    }, 3000);
  };

  const notify = (message, hasError = false) => {
    if (hasError) {
      toast.error(message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast(message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleCopy = () => {
    copyFromClipboard();
    notify(COPY_SUCCESS);
  };

  useEffect(() => {
    handleGeneratePassword();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container">
      <div className="generator">
        <h2 className="generator__header">Password Generator</h2>
        <div className="generator__password">
          {password}
          <button
            className="generator__passwordGenerateBtn"
            ref={copyBtn}
            onClick={handleCopy}
          >
            <FaClipboard />
          </button>
        </div>
        <div className="form-group">
          <label htmlFor="password-length">Password Length</label>
          <input
            name="password-length"
            id="password-length"
            type="number"
            max="20"
            min="8"
            defaultValue={passwordLength}
            onChange={(e) => setPasswordLength(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="uppercase-letters">Include Uppercase Letters</label>
          <input
            name="uppercase-letters"
            id="uppercase-letters"
            type="checkbox"
            checked={upperCase}
            onChange={(e) => setUpperCase(e.target.checked)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="lowercase-letters">Include Lowercase Letters</label>
          <input
            name="lowercase-letters"
            id="lowercase-letters"
            type="checkbox"
            checked={lowerCase}
            onChange={(e) => setLowerCase(e.target.checked)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="include-numbers">Include Numbers</label>
          <input
            name="include-numbers"
            id="include-numbers"
            type="checkbox"
            checked={number}
            onChange={(e) => setNumber(e.target.checked)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="include-symbols">Include Symbols</label>
          <input
            name="include-symbols"
            id="include-symbols"
            type="checkbox"
            checked={symbols}
            onChange={(e) => setSymbols(e.target.checked)}
          />
        </div>

        <button className="generator__btn" onClick={handleGeneratePassword}>
          Generate new password
        </button>
      </div>
    </div>
  );
}

export default App;
