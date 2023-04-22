import LoginPage from './views/auth/Login';
import RegisterPage from './views/auth/Register';

import MyDecksPage from './views/MyDecksPage';
import FlashcardPage from './views/FlashcardPage';
import HomePage from './views/HomePage';

import Unauthorized from './views/errorpages/Unauthorized';
import Missing from './views/errorpages/Missing';

import RequireAuth from './components/auth/RequireAuth';

import Layout from './components/routing/Layout';
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* authenticated routes */}

        <Route element={<RequireAuth />}>
          <Route path="decks" element={<MyDecksPage />} />
          <Route path="flashcards" element={<FlashcardPage />} />
        </Route>


        
        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  )
}

export default App;