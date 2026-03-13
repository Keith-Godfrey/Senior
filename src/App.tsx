import { useState } from 'react';
import PhoneChrome from './components/PhoneChrome';
import HomeScreen, { type Screen } from './screens/HomeScreen';
import PhoneScreen from './screens/PhoneScreen';
import MessagesScreen from './screens/MessagesScreen';
import EmergencyScreen from './screens/EmergencyScreen';
import SettingsScreen from './screens/SettingsScreen';

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');

  function navigate(to: Screen) {
    setScreen(to);
  }

  function goHome() {
    setScreen('home');
  }

  return (
    <PhoneChrome>
      {screen === 'home'      && <HomeScreen onNavigate={navigate} />}
      {screen === 'phone'     && <PhoneScreen onBack={goHome} />}
      {screen === 'messages'  && <MessagesScreen onBack={goHome} />}
      {screen === 'emergency' && <EmergencyScreen onBack={goHome} />}
      {screen === 'settings'  && <SettingsScreen onBack={goHome} />}
    </PhoneChrome>
  );
}
