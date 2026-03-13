import { useState } from 'react';
import { Header } from './Header';
import { Modal } from './Modal';
import { Toast } from './Toast';
import { useToast } from '../hooks/useToast';
import './EmergencyScreen.css';

interface EmergencyScreenProps {
  onBack: () => void;
}

export function EmergencyScreen({ onBack }: EmergencyScreenProps) {
  const [confirmSOS, setConfirmSOS] = useState(false);
  const [calling, setCalling] = useState(false);
  const { toastMessage, toastKey, showToast } = useToast();

  function handleSOSConfirm() {
    setConfirmSOS(false);
    setCalling(true);
    showToast('Calling 911 now…');
    setTimeout(() => setCalling(false), 4000);
  }

  return (
    <div className="screen">
      <Header title="Emergency Help" onBack={onBack} />

      <div className="content emergency-content">
        <p className="emergency-intro">
          Press the button below if you need immediate help.
          You will be asked to confirm before calling.
        </p>

        <button
          className={`sos-btn${calling ? ' sos-btn--calling' : ''}`}
          onClick={() => !calling && setConfirmSOS(true)}
          aria-label="Press to call emergency services"
        >
          <span className="sos-icon" aria-hidden="true">🆘</span>
          <span className="sos-label">
            {calling ? 'Calling 911…' : 'Call for Help'}
          </span>
        </button>

        <div className="emergency-tips">
          <h3>In an Emergency</h3>
          <ul className="tips-list" role="list">
            <li>📍 Stay where you are if it is safe</li>
            <li>🗣️ Tell them your name and address</li>
            <li>📞 Stay on the phone until help arrives</li>
          </ul>
        </div>

        <div className="emergency-numbers">
          <h3>Important Numbers</h3>
          <div className="number-cards">
            <div className="number-card">
              <span className="number-icon" aria-hidden="true">🚑</span>
              <span className="number-label">Emergency</span>
              <span className="number-value">911</span>
            </div>
            <div className="number-card">
              <span className="number-icon" aria-hidden="true">☎️</span>
              <span className="number-label">Non-Emergency</span>
              <span className="number-value">311</span>
            </div>
          </div>
        </div>
      </div>

      {confirmSOS && (
        <Modal
          title="Call 911 for help?"
          body="This will immediately call emergency services (911). Only confirm if you have an emergency."
          onClose={() => setConfirmSOS(false)}
        >
          <button className="btn-danger" onClick={handleSOSConfirm}>
            🆘 Yes, Call 911 Now
          </button>
          <button className="btn-secondary" onClick={() => setConfirmSOS(false)}>
            ✗ Cancel — I'm OK
          </button>
        </Modal>
      )}

      {toastMessage && <Toast message={toastMessage} id={toastKey} />}
    </div>
  );
}
