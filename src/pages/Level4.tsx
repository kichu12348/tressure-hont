import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "../context/GameContext";
import { FaBackspace } from "react-icons/fa";
import styles from "./Level4.module.css";

const API_URL = import.meta.env.VITE_API_URL;

interface APIResponse {
  isFirst: boolean;
  error?: string;
}

const SAFE_TIME_LIMIT = 60; // 60 seconds
const STORAGE_KEY = "treasureHunt_safeTimer";
const SAFE_COMBINATION = "1980"; // The combination to unlock the safe

const Level4: React.FC = () => {
  const { name, email } = useGame();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name,
    email,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isFirst, setIsFirst] = useState(false);
  const [error, setError] = useState("");

  // Safe game states
  const [safeOpen, setSafeOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(SAFE_TIME_LIMIT);
  const [timeExpired, setTimeExpired] = useState(false);
  const [inputCode, setInputCode] = useState("");
  const [attemptMessage, setAttemptMessage] = useState("");

  // Initialize timer and check local storage on component mount
  useEffect(() => {
    const storedData = localStorage.getItem(STORAGE_KEY);
    let startTime: number;

    if (storedData) {
      const data = JSON.parse(storedData);
      // Calculate remaining time based on stored start time
      const elapsedSeconds = Math.floor((Date.now() - data.startTime) / 1000);
      const remainingTime = Math.max(0, SAFE_TIME_LIMIT - elapsedSeconds);

      if (remainingTime <= 0) {
        setTimeLeft(0);
        setTimeExpired(true);
      } else {
        setTimeLeft(remainingTime);
        startTime = data.startTime;
      }
    } else {
      // First time loading the page
      startTime = Date.now();
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ startTime }));
    }

    // Timer countdown
    const timer = setInterval(() => {
      const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
      const remaining = Math.max(0, SAFE_TIME_LIMIT - elapsedSeconds);

      setTimeLeft(remaining);

      if (remaining === 0) {
        clearInterval(timer);
        setTimeExpired(true);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeExpired]);

  // Handle safe combination input
  const handleSafeInput = useCallback(
    (digit: string) => {
      if (safeOpen || timeExpired) return;

      setInputCode((prev) => {
        const newCode = prev.length < 4 ? prev + digit : prev.slice(1) + digit;
        return newCode;
      });
    },
    [safeOpen, timeExpired]
  );

  // Handle backspace
  const handleBackspace = useCallback(() => {
    if (safeOpen || timeExpired) return;

    setInputCode((prev) => prev.slice(0, -1));
    setAttemptMessage(""); // Clear any attempt message
  }, [safeOpen, timeExpired]);

  // Check the combination whenever inputCode changes
  useEffect(() => {
    if (inputCode.length === 4) {
      if (inputCode === SAFE_COMBINATION) {
        setSafeOpen(true);
        setAttemptMessage("Safe unlocked! You found the treasure!");
      } else {
        setAttemptMessage("Incorrect combination. Try again!");
        setTimeout(() => setAttemptMessage(""), 2000);
      }
    }
  }, [inputCode]);

  // Reset the game
  const resetGame = () => {
    localStorage.removeItem(STORAGE_KEY);
    setTimeLeft(SAFE_TIME_LIMIT);
    setTimeExpired(false);
    setSafeOpen(false);
    setInputCode("");
    setAttemptMessage("");
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ startTime: Date.now() })
    );
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (!formData.name || !formData.email) {
      setError("Name and email are required.");
      return;
    }
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data: APIResponse = await response.json();

      if (response.ok) {
        setSubmitted(true);
        setIsFirst(data.isFirst);
      } else {
        setError(data.error || "Failed to submit. Please try again.");
      }
    } catch (err) {
      setError("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReturn = () => {
    localStorage.removeItem(STORAGE_KEY);
    navigate("/");
  };

  // Render number pad buttons
  const renderNumberPad = () => {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, -2, -1];
    return (
      <div className={styles.numberPad}>
        {numbers.map((num) => (
          <button
            key={num}
            className={`${styles.numberButton} ${
              num === -2 ? styles.numberButtonInvisible : ""
            }`}
            onClick={() => {
              if (safeOpen || timeExpired || num === -2) return;
              if (num === -1) {
                handleBackspace();
              } else {
                handleSafeInput(num.toString());
              }
            }}
            disabled={safeOpen || timeExpired}
          >
            {num === -1 ? (
              <FaBackspace className={styles.backspaceIcon} />
            ) : num === -2 ? (
              ""
            ) : (
              num
            )}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>FINAL LEVEL: The Safe</h1>
        <p style={{ fontSize: "0.9rem", margin: "0.3rem 0" }}>
          Crack the safe code before time runs out!
        </p>
      </header>

      <div className={styles.panel}>
        {!safeOpen && !timeExpired ? (
          <div className={styles.safeChallenge}>
            <div className={styles.timerDisplay}>
              <span className={timeLeft <= 10 ? styles.dangerTime : ""}>
                Time: {timeLeft}s
              </span>
            </div>

            <div className={styles.safeDisplay}>
              <div className={styles.safeCode}>
                {[...Array(4)].map((_, i) => (
                  <div key={i} className={styles.codeDigit}>
                    {inputCode[i] || "?"}
                  </div>
                ))}
              </div>

              {attemptMessage && (
                <div className={styles.attemptMessage}>{attemptMessage}</div>
              )}

              <p className={`${styles.safeHint} no-select`}>
                The "Human Computer" astonished the world by mentally
                multiplying the two 13-digit numbers
                <br />
                7,686,369,774,870 × 2,465,099,745,779 in just 28 seconds, a feat
                that secured her a spot in the Guinness Book of World Records?
                <br />
                Hint: 2008
              </p>

              {renderNumberPad()}
            </div>
          </div>
        ) : timeExpired && !safeOpen ? (
          <div className={styles.timeExpired}>
            <h2 style={{ fontSize: "1.3rem", margin: "0.5rem 0" }}>
              TIME EXPIRED!
            </h2>
            <p>The safe's security activated and the treasure is gone.</p>
            <button onClick={resetGame} className={styles.button}>
              TRY AGAIN
            </button>
          </div>
        ) : safeOpen && !submitted ? (
          <>
            <div className={styles.treasureRevealed}>
              <h2 style={{ fontSize: "1.3rem", margin: "0.5rem 0" }}>
                TREASURE FOUND!
              </h2>
              <p className={styles.treasureMessage}>
                You've opened the safe and discovered:
              </p>
              <div className={styles.treasureBox}>
                <span className={styles.treasureName}>FRIENDSHIP</span>
                <p style={{ fontSize: "0.9rem", margin: "0.3rem 0" }}>
                  The greatest treasure is the bond of friendship that
                  accompanies us through life's journey.
                </p>
              </div>
              <p style={{ fontSize: "0.9rem", margin: "0.5rem 0" }}>
                Complete your mission by submitting your details.
              </p>
            </div>

            <form onSubmit={handleSubmit} className={styles.treasureForm}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={styles.input}
                  required
                  placeholder="your@email.com"
                />
              </div>

              {error && <div className={styles.error}>*{error}</div>}

              <button
                type="submit"
                className={styles.button}
                disabled={isSubmitting}
              >
                {isSubmitting ? "SUBMITTING..." : "COMPLETE"}
              </button>

              {isSubmitting && (
                <div className={styles.loading}>
                  <span className={styles.spinner}></span>
                  Sending...
                </div>
              )}
            </form>
          </>
        ) : (
          <div className={styles.success}>
            <h2>MISSION ACCOMPLISHED</h2>
            <p>
              Congratulations, Agent {name}! You have successfully completed all
              challenges.
            </p>
            {isFirst ? (
              <p className={styles.firstTime}>
                You're the first to complete this mission!
                <br />
                Congratulations you have won!!
              </p>
            ) : (
              <p className={styles.notFirstTime}>
                Thank you for your submission.
                <br />
                Unfortunately someone has already completed this mission before
                you.
              </p>
            )}
            <button
              onClick={handleReturn}
              className={`${styles.button} ${styles.returnHome}`}
            >
              RETURN HOME
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Level4;
