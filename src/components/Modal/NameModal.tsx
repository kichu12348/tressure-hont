import React, { useState, useEffect } from "react";
import { useGame } from "../../context/GameContext";
import styles from "./NameModal.module.css";

const NameModal: React.FC = () => {
  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [showCursor, setShowCursor] = useState(true);
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
    if (inputName.trim()) {
      setName(inputName.trim());
    }
    if (inputEmail.trim()) {
      setEmail(inputEmail.trim());
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>SYSTEM AUTHENTICATION REQUIRED</h2>

        <p className={styles.promptText}>
          TERMINAL v4.2.1 - SECURE ACCESS PROTOCOL
        </p>

        <form onSubmit={handleSubmit}>
          <div className={styles.inputContainer}>
            <span className={styles.inputPrefix}>&gt; </span>
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

          <button type="submit" className={styles.button}>
            AUTHENTICATE {showCursor ? "_" : " "}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NameModal;
