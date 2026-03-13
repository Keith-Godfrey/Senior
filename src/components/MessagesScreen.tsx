import { useState } from 'react';
import { Header } from './Header';
import { Modal } from './Modal';
import { Toast } from './Toast';
import { useToast } from '../hooks/useToast';
import './MessagesScreen.css';

interface MessagesScreenProps {
  onBack: () => void;
}

interface Message {
  id: number;
  from: string;
  preview: string;
  time: string;
  unread: boolean;
  initials: string;
  color: string;
}

const INITIAL_MESSAGES: Message[] = [
  { id: 1, from: 'Mary (Daughter)',  preview: 'Hi Mom! Are you coming for dinner Sunday?', time: '10:32 AM', unread: true,  initials: 'M', color: '#1e40af' },
  { id: 2, from: 'Robert (Son)',     preview: 'Just checking in. Call me when you can.',    time: 'Yesterday', unread: false, initials: 'R', color: '#7c3aed' },
  { id: 3, from: 'Dr. Johnson',      preview: 'Reminder: your appointment is Thursday.',    time: 'Mon',       unread: false, initials: 'J', color: '#166534' },
];

type View = 'list' | 'read' | 'compose';

export function MessagesScreen({ onBack }: MessagesScreenProps) {
  const [view, setView] = useState<View>('list');
  const [selected, setSelected] = useState<Message | null>(null);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [composeTo, setComposeTo] = useState('Mary (Daughter)');
  const [composeText, setComposeText] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<Message | null>(null);
  const { toastMessage, toastKey, showToast } = useToast();

  function openMessage(msg: Message) {
    setMessages((prev) =>
      prev.map((m) => (m.id === msg.id ? { ...m, unread: false } : m))
    );
    setSelected(msg);
    setView('read');
  }

  function handleSend() {
    if (!composeText.trim()) return;
    showToast(`Message sent to ${composeTo}`);
    setComposeText('');
    setView('list');
  }

  function confirmDelete(msg: Message) {
    setDeleteConfirm(msg);
  }

  function doDelete() {
    if (!deleteConfirm) return;
    setMessages((prev) => prev.filter((m) => m.id !== deleteConfirm.id));
    showToast('Message deleted');
    setDeleteConfirm(null);
    if (view === 'read') setView('list');
  }

  // ── List view ──────────────────────────────────────────
  if (view === 'list') {
    return (
      <div className="screen">
        <Header title="Messages" onBack={onBack} />
        <div className="content">
          <div className="messages-actions">
            <button className="btn-primary msg-compose-btn" onClick={() => setView('compose')}>
              ✏️ Write a Message
            </button>
          </div>
          <ul className="msg-list" role="list" aria-label="Messages">
            {messages.map((msg) => (
              <li key={msg.id}>
                <button
                  className={`msg-item${msg.unread ? ' msg-item--unread' : ''}`}
                  aria-label={`${msg.unread ? 'Unread message from' : 'Message from'} ${msg.from}`}
                  onClick={() => openMessage(msg)}
                >
                  <span
                    className="msg-avatar"
                    style={{ background: msg.color }}
                    aria-hidden="true"
                  >
                    {msg.initials}
                  </span>
                  <span className="msg-info">
                    <span className="msg-from">
                      {msg.from}
                      {msg.unread && <span className="msg-badge" aria-label="Unread">NEW</span>}
                    </span>
                    <span className="msg-preview">{msg.preview}</span>
                  </span>
                  <span className="msg-time">{msg.time}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        {toastMessage && <Toast message={toastMessage} id={toastKey} />}
      </div>
    );
  }

  // ── Read view ──────────────────────────────────────────
  if (view === 'read' && selected) {
    return (
      <div className="screen">
        <Header title={selected.from} onBack={() => setView('list')} />
        <div className="content">
          <div className="msg-bubble-wrap">
            <div className="msg-bubble-time">{selected.time}</div>
            <div className="msg-bubble">{selected.preview}</div>
          </div>
          <button
            className="btn-secondary"
            style={{ borderColor: 'var(--color-danger)', color: 'var(--color-danger)' }}
            onClick={() => confirmDelete(selected)}
          >
            🗑️ Delete This Message
          </button>
          <button className="btn-primary" onClick={() => { setComposeTo(selected.from); setView('compose'); }}>
            ↩️ Reply
          </button>
        </div>

        {deleteConfirm && (
          <Modal
            title="Delete this message?"
            body={`This will permanently delete the message from ${deleteConfirm.from}.`}
            onClose={() => setDeleteConfirm(null)}
          >
            <button className="btn-danger" onClick={doDelete}>🗑️ Yes, Delete</button>
            <button className="btn-secondary" onClick={() => setDeleteConfirm(null)}>✗ Cancel, Keep It</button>
          </Modal>
        )}

        {toastMessage && <Toast message={toastMessage} id={toastKey} />}
      </div>
    );
  }

  // ── Compose view ───────────────────────────────────────
  return (
    <div className="screen">
      <Header title="Write a Message" onBack={() => setView('list')} />
      <div className="content">
        <label className="compose-label" htmlFor="compose-to">Send To</label>
        <input
          id="compose-to"
          type="text"
          value={composeTo}
          onChange={(e) => setComposeTo(e.target.value)}
          placeholder="Contact name or phone"
          aria-label="Send to"
        />

        <label className="compose-label" htmlFor="compose-body">Your Message</label>
        <textarea
          id="compose-body"
          value={composeText}
          onChange={(e) => setComposeText(e.target.value)}
          placeholder="Type your message here…"
          aria-label="Message text"
          rows={5}
        />

        <button
          className="btn-primary"
          onClick={handleSend}
          disabled={!composeText.trim()}
          aria-disabled={!composeText.trim()}
        >
          📤 Send Message
        </button>
        <button className="btn-secondary" onClick={() => setView('list')}>
          ✗ Cancel
        </button>
      </div>

      {toastMessage && <Toast message={toastMessage} id={toastKey} />}
    </div>
  );
}
