import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import 'react-day-picker/dist/style.css';

createRoot(document.getElementById('root')!).render(<App />);
