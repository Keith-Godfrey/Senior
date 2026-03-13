import { useState } from 'react';
import Header from '../components/Header';
import Toast from '../components/Toast';
import ConfirmDialog from '../components/ConfirmDialog';
import styles from './MessagesScreen.module.css';

interface Message {
  id: number;
  from: string;
  preview: string;
  time: string;
  unread: boolean;
}

const MESSAGES: Message[] = [
  { id: 1, from: 'Jane (Daughter)', preview: 'Hi Mom! Thinking of you 💕', time: '10:30 AM', unread: true },
  { id: 2, from: 'Tom (Son)',       preview: 'Can I call you tonight?',        time: 'Yesterday',  unread: false },
  { id: 3, from: 'Mary (Friend)',   preview: 'See you at the park tomorrow!',  time: 'Mon',        unread: false },
];

type View = 'inbox' | 'read' | 'compose';

interface Props {
  onBack: () => void;
}

export default function MessagesScreen({ onBack }: Props) {
  const [view, setView] = useState<View>('inbox');
  const [selected, setSelected] = useState<Message | null>(null);
  const [composeText, setComposeText] = useState('');
  const [discarding, setDiscarding] = useState(false);
  const [toast, setToast] = useState('');

  function openMessage(msg: Message) {
    setSelected(msg);
    setView('read');
  }

  function openCompose() {
    setComposeText('');
    setView('compose');
  }

  function sendMessage() {
    setView('inbox');
    setComposeText('');
    showToast('Message sent! ✓');
  }

  function tryDiscard() {
    if (composeText.trim()) {
      setDiscarding(true);
    } else {
      setView('inbox');
    }
  }

  function confirmDiscard() {
    setDiscarding(false);
    setView('inbox');
    setComposeText('');
  }

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  }

  return (
    <div className={styles.screen}>
      {view === 'inbox' && (
        <>
          <Header title="Messages" onBack={onBack} />
          <main className={styles.main}>
            <button className={styles.composeBtn} onClick={openCompose}>
              ✏️ New Message
            </button>
            <ul className={styles.list} role="list">
              {MESSAGES.map((msg) => (
                <li key={msg.id}>
                  <button
                    className={`${styles.messageRow} ${msg.unread ? styles.unread : ''}`}
                    onClick={() => openMessage(msg)}
                    aria-label={`Message from ${msg.from}${msg.unread ? ', unread' : ''}`}
                  >
                    <span className={styles.msgMeta}>
                      <span className={styles.msgFrom}>{msg.from}</span>
                      <span className={styles.msgTime}>{msg.time}</span>
                    </span>
                    <span className={styles.msgPreview}>{msg.preview}</span>
                  </button>
                </li>
              ))}
            </ul>
          </main>
        </>
      )}

      {view === 'read' && selected && (
        <>
          <Header title="Message" onBack={() => setView('inbox')} />
          <main className={styles.main}>
            <div className={styles.readCard}>
              <p className={styles.readFrom}>From: {selected.from}</p>
              <p className={styles.readTime}>{selected.time}</p>
              <p className={styles.readBody}>{selected.preview}</p>
            </div>
            <button
              className={styles.replyBtn}
              onClick={() => { setComposeText(''); setView('compose'); }}
            >
              ↩ Reply
            </button>
          </main>
        </>
      )}

      {view === 'compose' && (
        <>
          <Header title="New Message" onBack={tryDiscard} />
          <main className={styles.main}>
            <label className={styles.label} htmlFor="msg-to">To</label>
            <select id="msg-to" className={styles.select} aria-label="Select recipient">
              {MESSAGES.map((m) => (
                <option key={m.id}>{m.from}</option>
              ))}
            </select>
            <label className={styles.label} htmlFor="msg-body">Message</label>
            <textarea
              id="msg-body"
              className={styles.textarea}
              value={composeText}
              onChange={(e) => setComposeText(e.target.value)}
              placeholder="Type your message here…"
              rows={5}
            />
            <button className={styles.sendBtn} onClick={sendMessage} disabled={!composeText.trim()}>
              📤 Send
            </button>
          </main>
        </>
      )}

      {discarding && (
        <ConfirmDialog
          message="Discard this message?"
          confirmLabel="Yes, Discard"
          cancelLabel="Keep Writing"
          onConfirm={confirmDiscard}
          onCancel={() => setDiscarding(false)}
        />
      )}

      {toast && <Toast message={toast} />}
    </div>
  );
}
