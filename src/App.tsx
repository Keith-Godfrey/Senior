import { useState } from 'react';
import './index.css';
import { HomeScreen } from './components/HomeScreen';
import { PhoneScreen } from './components/PhoneScreen';
import { MessagesScreen } from './components/MessagesScreen';
import { EmergencyScreen } from './components/EmergencyScreen';
import { SettingsScreen } from './components/SettingsScreen';

type Screen = 'home' | 'phone' | 'messages' | 'emergency' | 'settings';

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [textSize, setTextSize] = useState<'normal' | 'large'>('normal');
  const [contrast, setContrast] = useState<'normal' | 'high'>('normal');

  return (
    <div
      data-textsize={textSize}
      data-contrast={contrast}
      style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
    >
      {screen === 'home' && (
        <HomeScreen onNavigate={(s) => setScreen(s as Screen)} />
      )}
      {screen === 'phone' && (
        <PhoneScreen onBack={() => setScreen('home')} />
      )}
      {screen === 'messages' && (
        <MessagesScreen onBack={() => setScreen('home')} />
      )}
      {screen === 'emergency' && (
        <EmergencyScreen onBack={() => setScreen('home')} />
      )}
      {screen === 'settings' && (
        <SettingsScreen
          onBack={() => setScreen('home')}
          textSize={textSize}
          contrast={contrast}
          onTextSizeChange={setTextSize}
          onContrastChange={setContrast}
        />
      )}
    </div>
  );
}
