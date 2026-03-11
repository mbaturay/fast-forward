import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppShell } from '@/components/layout/AppShell';
import { SearchDialog } from '@/components/shared/SearchDialog';
import HomePage from '@/pages/HomePage';
import GuidedJourneyPage from '@/pages/GuidedJourneyPage';
import MappingPage from '@/pages/MappingPage';
import TalkTracksPage from '@/pages/TalkTracksPage';
import PlaybookPage from '@/pages/PlaybookPage';
import LevelDetailPage from '@/pages/LevelDetailPage';
import StackPage from '@/pages/StackPage';

export default function App() {
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <BrowserRouter>
      <AppShell onSearchOpen={() => setSearchOpen(true)}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/guided" element={<GuidedJourneyPage />} />
          <Route path="/mapping" element={<MappingPage />} />
          <Route path="/talk-tracks" element={<TalkTracksPage />} />
          <Route path="/playbook" element={<PlaybookPage />} />
          <Route path="/level/:levelId" element={<LevelDetailPage />} />
          <Route path="/stack" element={<StackPage />} />
        </Routes>
      </AppShell>
      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </BrowserRouter>
  );
}
