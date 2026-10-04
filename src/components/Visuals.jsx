import { useState } from 'react';

/* My Sathi: a phone scanning a prescription. */
export function SathiVisual() {
  return (
    <div className="phone" role="img" aria-label="Illustration of the My Sathi app scanning a prescription">
      <div className="phone__notch" />
      <div className="phone__screen">
        <p className="phone__title">Scan prescription</p>
        <div className="rx">
          <span className="rx__line" style={{ width: '78%' }} />
          <span className="rx__line" style={{ width: '92%' }} />
          <span className="rx__line" style={{ width: '60%' }} />
          <span className="rx__line" style={{ width: '84%' }} />
          <span className="rx__line" style={{ width: '70%' }} />
          <span className="rx__scan" />
        </div>
        <ul className="phone__result">
          <li>
            <b>Medicine</b>
            <span>Detected by ML Kit</span>
          </li>
          <li>
            <b>Dose and timing</b>
            <span>Parsed by Gemini</span>
          </li>
          <li className="is-alarm">
            <b>Alarm set</b>
            <span>Reminds at 8:00 am</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

/* My Buddy: a flashcard you can flip. */
export function BuddyVisual() {
  const [flipped, setFlipped] = useState(false);
  return (
    <div className="deck">
      <span className="deck__shadow deck__shadow--2" aria-hidden="true" />
      <span className="deck__shadow deck__shadow--1" aria-hidden="true" />
      <button
        type="button"
        className={`flash ${flipped ? 'is-flipped' : ''}`}
        onClick={() => setFlipped((f) => !f)}
        aria-pressed={flipped}
        aria-label="Flashcard: what does a chloroplast do? Press to flip."
      >
        <span className="flash__face flash__front">
          <small>Question</small>
          <strong>What does a chloroplast do?</strong>
          <em>Click to flip</em>
        </span>
        <span className="flash__face flash__back">
          <small>Answer</small>
          <strong>It turns sunlight into chemical energy during photosynthesis.</strong>
          <em>Click to flip back</em>
        </span>
      </button>
    </div>
  );
}
