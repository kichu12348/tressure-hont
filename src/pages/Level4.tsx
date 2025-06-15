import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "../context/GameContext";
import styles from "./Level4.module.css";

const API_URL = import.meta.env.VITE_API_URL;

interface APIResponse {
  isFirst: boolean;
  error?: string;
}

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
    if (isSubmitting) return; // Prevent multiple submissions
    if (!formData.name || !formData.email) {
      setError("Name and email are required.");
      return;
    }
    setIsSubmitting(true);
    setError("");

    // Simulating API call
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
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>FINAL LEVEL: Mission Complete</h1>
        <p>Submit your details to confirm completion of the challenge.</p>
      </header>

      <div className={styles.panel}>
        {!submitted ? (
          <form onSubmit={handleSubmit}>
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
              {isSubmitting ? "SUBMITTING..." : "COMPLETE MISSION"}
            </button>

            {isSubmitting && (
              <div className={styles.loading}>
                <span className={styles.spinner}></span>
                Transmitting data...
              </div>
            )}
          </form>
        ) : (
          <div className={styles.success}>
            <h2>MISSION ACCOMPLISHED</h2>
            <p>
              Congratulations, Agent {name}! You have successfully completed all
              challenges. Your submission has been recorded.
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
                you. 😞
              </p>
            )}
            <button
              onClick={handleReturn}
              className={`${styles.button} ${styles.returnHome}`}
            >
              RETURN TO HOME BASE
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Level4;
