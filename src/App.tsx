import { useState } from 'react';
import AnalyzerUI from './components/AnalyzerUI';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <AnalyzerUI/>
    </div>
  );
}

export default App;