import Head from 'next/head';

import NewPastePage from '@/components/pages/NewPastePage';
import { PasteDraftContextProvider } from '@/lib/context/PasteDraftContext';

function HomePage() {
  return (
    <PasteDraftContextProvider>
      <NewPastePage />
    </PasteDraftContextProvider>
  );
}

export default HomePage;
