import React, { useState, useEffect } from "react";
import { useGame } from "../../context/GameContext";
import styles from "./NameModal.module.css";

const NameModal: React.FC = () => {
  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [error, setError] = useState<string>("");
  const { setName, setEmail } = useGame();

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(!inputName.trim() && !inputEmail.trim()) {
      setErrorMessage("Please enter your codename and email.");
      return;
    }
    if (inputName.trim()) {
      setName(inputName.trim());
    }
    if (inputEmail.trim()) {
      setEmail(inputEmail.trim());
    }
  };

  const setErrorMessage = (message: string):void => {
    setError(message);
    setTimeout(() => {
      setError("");
    }, 3000);
  }


  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>SYSTEM AUTHENTICATION REQUIRED</h2>

        <p className={styles.promptText}>
          TERMINAL v24.2.5 - SECURE ACCESS PROTOCOL
        </p>

        <form onSubmit={handleSubmit}>
          <div className={styles.inputContainer}>
  
            <input
              type="text"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              className={styles.input}
              placeholder="Enter your codename"
              autoFocus
            />
            <input
              type="email"
              value={inputEmail}
              onChange={(e) => setInputEmail(e.target.value)}
              className={styles.input}
              placeholder="Enter your email"
              autoFocus
            />
          </div>
         <p className={styles.error}>{error}</p>
          <button type="submit" className={styles.button}>
            AUTHENTICATE {showCursor ? "_" : " "}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NameModal;
