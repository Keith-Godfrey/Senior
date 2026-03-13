import { useState } from 'react';
import { Header } from './Header';
import { Modal } from './Modal';
import { Toast } from './Toast';
import { useToast } from '../hooks/useToast';
import './PhoneScreen.css';

interface PhoneScreenProps {
  onBack: () => void;
}

interface Contact {
  id: number;
  name: string;
  phone: string;
  relation: string;
  initials: string;
  color: string;
}

const CONTACTS: Contact[] = [
  { id: 1, name: 'Mary (Daughter)',  phone: '(555) 201-1234', relation: 'Family',  initials: 'M', color: '#1e40af' },
  { id: 2, name: 'Dr. Johnson',      phone: '(555) 347-8800', relation: 'Doctor',   initials: 'J', color: '#166534' },
  { id: 3, name: 'Robert (Son)',     phone: '(555) 412-5678', relation: 'Family',   initials: 'R', color: '#7c3aed' },
  { id: 4, name: 'Neighbor Carol',   phone: '(555) 523-9900', relation: 'Neighbor', initials: 'C', color: '#b45309' },
];

export function PhoneScreen({ onBack }: PhoneScreenProps) {
  const [confirmCall, setConfirmCall] = useState<Contact | null>(null);
  const { toastMessage, toastKey, showToast } = useToast();

  function handleCallConfirm() {
    if (!confirmCall) return;
    showToast(`Calling ${confirmCall.name}…`);
    setConfirmCall(null);
  }

  return (
    <div className="screen">
      <Header title="Phone" onBack={onBack} />

      <div className="content">
        <h2 className="section-heading">Your Contacts</h2>
        <p className="section-hint">Tap a name to call them</p>

        <ul className="contact-list" role="list" aria-label="Contact list">
          {CONTACTS.map((contact) => (
            <li key={contact.id}>
              <button
                className="contact-btn"
                aria-label={`Call ${contact.name}`}
                onClick={() => setConfirmCall(contact)}
              >
                <span
                  className="contact-avatar"
                  style={{ background: contact.color }}
                  aria-hidden="true"
                >
                  {contact.initials}
                </span>
                <span className="contact-info">
                  <span className="contact-name">{contact.name}</span>
                  <span className="contact-phone">{contact.phone}</span>
                </span>
                <span className="contact-call-icon" aria-hidden="true">📞</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {confirmCall && (
        <Modal
          title={`Call ${confirmCall.name}?`}
          body={`This will dial ${confirmCall.phone}`}
          onClose={() => setConfirmCall(null)}
        >
          <button className="btn-primary" onClick={handleCallConfirm}>
            📞 Yes, Call Now
          </button>
          <button className="btn-secondary" onClick={() => setConfirmCall(null)}>
            ✗ Cancel
          </button>
        </Modal>
      )}

      {toastMessage && <Toast message={toastMessage} id={toastKey} />}
    </div>
  );
}
