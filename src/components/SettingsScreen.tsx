import { Header } from './Header';
import { Toast } from './Toast';
import { useToast } from '../hooks/useToast';
import './SettingsScreen.css';

interface SettingsScreenProps {
  onBack: () => void;
  textSize: 'normal' | 'large';
  contrast: 'normal' | 'high';
  onTextSizeChange: (size: 'normal' | 'large') => void;
  onContrastChange: (contrast: 'normal' | 'high') => void;
}

export function SettingsScreen({
  onBack,
  textSize,
  contrast,
  onTextSizeChange,
  onContrastChange,
}: SettingsScreenProps) {
  const { toastMessage, toastKey, showToast } = useToast();

  function handleTextSize(size: 'normal' | 'large') {
    onTextSizeChange(size);
    showToast(size === 'large' ? 'Large text turned on' : 'Normal text restored');
  }

  function handleContrast(c: 'normal' | 'high') {
    onContrastChange(c);
    showToast(c === 'high' ? 'High contrast turned on' : 'Normal contrast restored');
  }

  return (
    <div className="screen">
      <Header title="Settings" onBack={onBack} />

      <div className="content">
        <section className="settings-section" aria-labelledby="ts-heading">
          <h2 id="ts-heading" className="settings-heading">Text Size</h2>
          <p className="settings-hint">Make text bigger or smaller on all screens</p>
          <div className="settings-options">
            <button
              className={`settings-option-btn${textSize === 'normal' ? ' settings-option-btn--active' : ''}`}
              onClick={() => handleTextSize('normal')}
              aria-pressed={textSize === 'normal'}
            >
              <span className="option-preview" style={{ fontSize: '20px' }}>Aa</span>
              <span>Normal</span>
            </button>
            <button
              className={`settings-option-btn${textSize === 'large' ? ' settings-option-btn--active' : ''}`}
              onClick={() => handleTextSize('large')}
              aria-pressed={textSize === 'large'}
            >
              <span className="option-preview" style={{ fontSize: '28px' }}>Aa</span>
              <span>Large</span>
            </button>
          </div>
        </section>

        <section className="settings-section" aria-labelledby="contrast-heading">
          <h2 id="contrast-heading" className="settings-heading">Screen Contrast</h2>
          <p className="settings-hint">High contrast makes text easier to read</p>
          <div className="settings-options">
            <button
              className={`settings-option-btn${contrast === 'normal' ? ' settings-option-btn--active' : ''}`}
              onClick={() => handleContrast('normal')}
              aria-pressed={contrast === 'normal'}
            >
              <span className="contrast-preview contrast-preview--normal" aria-hidden="true">A</span>
              <span>Normal</span>
            </button>
            <button
              className={`settings-option-btn${contrast === 'high' ? ' settings-option-btn--active' : ''}`}
              onClick={() => handleContrast('high')}
              aria-pressed={contrast === 'high'}
            >
              <span className="contrast-preview contrast-preview--high" aria-hidden="true">A</span>
              <span>High</span>
            </button>
          </div>
        </section>

        <section className="settings-section" aria-labelledby="about-heading">
          <h2 id="about-heading" className="settings-heading">About This App</h2>
          <p className="settings-hint">
            Senior Phone — version 1.0<br />
            Designed to be easy and clear to use.
          </p>
        </section>
      </div>

      {toastMessage && <Toast message={toastMessage} id={toastKey} />}
    </div>
  );
}
