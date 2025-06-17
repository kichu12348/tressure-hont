import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "../context/GameContext";
import { caesarCipher } from "../utils/cipher";
import styles from "./Level3.module.css";

const Level3: React.FC = () => {
  const [key, setKey] = useState("");
  const [decryptedText, setDecryptedText] = useState("");
  const [success, setSuccess] = useState(false);
  const [currentEncryptedText, setCurrentEncryptedText] = useState("");

  const { advanceLevel } = useGame();
  const navigate = useNavigate();

  const clues = [
    "The key to the next level is TRESSURE",
    "Unlock the final stage with TRESSURE",
    "TRESSURE is the password you seek",
  ];
  const encryptionShift = 5;

  const [originalClue, setOriginalClue] = useState("");

  useEffect(() => {
    // Select a random clue and encrypt it
    const randomIndex = Math.floor(Math.random() * clues.length);
    const selectedClue = clues[randomIndex];
    setOriginalClue(selectedClue);
    setCurrentEncryptedText(
      caesarCipher.encrypt(selectedClue, encryptionShift)
    );
  }, []); // Run once on component mount

  const handleDecrypt = () => {
    if (!key) return;

    // For Caesar cipher, the key is the shift value.
    // The problem states "TRESSURE" is the clue and offset is 5.
    // So, the user should input '5' as the key to decrypt.
    const shift = parseInt(key, 10);
    if (isNaN(shift)) {
      setDecryptedText("Invalid shift value. Please enter a number.");
      return;
    }

    const result = caesarCipher.decrypt(currentEncryptedText, shift);
    setDecryptedText(result);

    // Check if decrypted text matches the original selected clue
    if (
      result.toLowerCase() === originalClue.toLowerCase() &&
      shift === encryptionShift
    ) {
      setSuccess(true);
      advanceLevel();
    } else {
      setSuccess(false);
    }
  };

  const navigateToNextLevel = () => {
    navigate("/level/4");
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>LEVEL 3: Caesar Cipher Challenge</h1>
        <p>Decrypt the message</p>
      </header>

      <div className={styles.panel}>
        {/* Cipher selector removed */}

        <div className={styles.cipherContainer}>
          <div className={styles.encryptedText}>{currentEncryptedText}</div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Shift Value:</label>
            <input
              type="number"
              className={styles.input}
              value={key}
              onChange={(e) => {
                setKey(e.target.value);
              }}
              placeholder={"Enter the shift value(1-25)"}
            />
          </div>

          <button onClick={handleDecrypt} className={styles.button}>
            DECRYPT
          </button>

          {decryptedText && (
            <div>
              <label className={styles.label}>Decrypted Text:</label>
              <div className={styles.resultText}>{decryptedText}</div>
            </div>
          )}

          {success && (
            <div className={styles.success}>
              <p>MESSAGE DECIPHERED! Final level unlocked.</p>
              <button onClick={navigateToNextLevel} className={styles.button}>
                PROCEED TO FINAL LEVEL
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Level3;
