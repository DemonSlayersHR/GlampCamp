import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
const firebaseConfig = {
  apiKey: 'AIzaSyAMmzKPYyiE0ml2ptAjsyZMXSOAgO87tgY',
  authDomain: 'glampcamp-a9bda.firebaseapp.com',
  projectId: 'glampcamp-a9bda',
  storageBucket: 'glampcamp-a9bda.appspot.com',
  messagingSenderId: '160399455019',
  appId: '1:160399455019:web:59d3a3b29b6e0e69a38b6e',
  measurementId: 'G-PVTZV88SR8',
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const authentication = getAuth(app);

export { authentication };
