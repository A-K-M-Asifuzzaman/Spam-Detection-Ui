import React, { useState } from 'react';
import {
  Shield, AlertTriangle, CheckCircle, Loader,
  Send, Github, Cpu, Zap, BarChart2, RotateCcw
} from 'lucide-react';
import './App.css';

const API_URL = 'https://spam-detection-e1hd.onrender.com';
const MAX_CHARS = 2000;

export default function App() {
  const [message, setMessage] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const checkSpam = async () => {
    if (!message.trim()) {
      setError('Please enter a message to check.');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch(`${API_URL}/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: message }),
      });

      if (!response.ok) throw new Error('API error');

      const data = await response.json();
      setResult(data.spam);
    } catch {
      setError('Unable to reach the API. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setMessage('');
    setResult(null);
    setError('');
  };

  const handleKeyDown = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      checkSpam();
    }
  };

  return (
    <div className="app-container">
      {/* ── Header ── */}
      <header className="header">
        <div className="header-left">
          <span className="header-logo">
            <Shield size={20} strokeWidth={2.5} />
          </span>
          <span className="header-title">SpamShield</span>
          <span className="header-badge">Portfolio Project</span>
        </div>
        <div className="header-right">
          <a
            className="header-link"
            href="https://github.com/zasif855"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github size={15} />
            GitHub
          </a>
        </div>
      </header>

      {/* ── Main ── */}
      <main className="main">
        {/* Hero */}
        <section className="hero">
          <div className="hero-eyebrow">
            <span className="status-dot" />
            <span className="hero-eyebrow-text">Model live · Render.com</span>
          </div>
          <h1 className="hero-title">AI-Powered Spam Detection</h1>
          <p className="hero-description">
            Paste any message below and the ML model will classify it as spam or
            legitimate in real time. Built with Python, scikit-learn, and a REST API.
          </p>
          <div className="tech-stack">
            {['Python', 'scikit-learn', 'FastAPI', 'React', 'Vite', 'NLP'].map((t) => (
              <span key={t} className="tech-chip">{t}</span>
            ))}
          </div>
        </section>

        {/* Analyzer card */}
        <div className="card">
          <div className="input-header">
            <label className="label" htmlFor="msg-input">Message</label>
            <span className="char-count">{message.length} / {MAX_CHARS}</span>
          </div>
          <textarea
            id="msg-input"
            value={message}
            onChange={(e) => {
              if (e.target.value.length <= MAX_CHARS) setMessage(e.target.value);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Paste or type a message to analyze…"
            rows={6}
            className="textarea"
          />

          {error && (
            <div className="error-banner" role="alert">
              <AlertTriangle size={16} />
              {error}
            </div>
          )}

          {result !== null && (
            <div
              className={`result ${result ? 'result-spam' : 'result-safe'}`}
              role="status"
            >
              <span className="result-icon">
                {result
                  ? <AlertTriangle size={18} strokeWidth={2.5} />
                  : <CheckCircle size={18} strokeWidth={2.5} />}
              </span>
              <div>
                <div className="result-label">
                  {result ? 'Spam Detected' : 'Legitimate'}
                </div>
                <div className="result-message">
                  {result
                    ? 'This message is classified as spam. Exercise caution.'
                    : 'This message appears to be legitimate.'}
                </div>
              </div>
            </div>
          )}

          <div className="button-row">
            <button
              onClick={checkSpam}
              disabled={loading || !message.trim()}
              className="btn btn-primary"
            >
              {loading ? (
                <>
                  <Loader className="spinner" size={16} />
                  Analyzing…
                </>
              ) : (
                <>
                  <Send size={16} />
                  Analyze Message
                </>
              )}
            </button>

            {(result !== null || message) && (
              <button onClick={reset} className="btn btn-secondary">
                <RotateCcw size={15} />
                Reset
              </button>
            )}
          </div>

          <p style={{ marginTop: 12, fontSize: '0.75rem', color: '#94a3b8' }}>
            Tip: press <kbd style={{ fontFamily: 'monospace', background: '#f1f5f9', padding: '1px 5px', borderRadius: 3, border: '1px solid #e2e8f0' }}>⌘ Enter</kbd> to analyze
          </p>
        </div>

        <div className="divider" />

        {/* About section */}
        <section className="about-section">
          <p className="section-heading">How it works</p>
          <div className="info-grid">
            <div className="info-card">
              <div className="info-card-icon">
                <Cpu size={20} strokeWidth={1.75} />
              </div>
              <div className="info-card-title">ML Model</div>
              <div className="info-card-text">
                Trained on the SMS Spam Collection dataset using TF-IDF vectorization
                and a Naive Bayes classifier.
              </div>
            </div>
            <div className="info-card">
              <div className="info-card-icon">
                <Zap size={20} strokeWidth={1.75} />
              </div>
              <div className="info-card-title">Real-time API</div>
              <div className="info-card-text">
                A FastAPI backend hosted on Render processes each request and returns
                a classification in milliseconds.
              </div>
            </div>
            <div className="info-card">
              <div className="info-card-icon">
                <BarChart2 size={20} strokeWidth={1.75} />
              </div>
              <div className="info-card-title">Performance</div>
              <div className="info-card-text">
                Achieves ~98% accuracy on the test set with high precision and recall
                across both spam and ham classes.
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="footer">
        <span className="footer-left">
          Built by <strong>Asif Zaman</strong> · Spam Detection ML Project
        </span>
        <span className="footer-right">
          Powered by&nbsp;
          <a href="https://scikit-learn.org" target="_blank" rel="noopener noreferrer">
            scikit-learn
          </a>
          &nbsp;&amp;&nbsp;
          <a href="https://fastapi.tiangolo.com" target="_blank" rel="noopener noreferrer">
            FastAPI
          </a>
        </span>
      </footer>
    </div>
  );
}
