import React, { useState } from 'react';

    function CopyButton({text}) {
      const [copySuccess, setCopySuccess] = useState('');

      const handleCopy = async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopySuccess('Copied!');
          setTimeout(() => setCopySuccess(''), 2000); // Clear message after 2 seconds
        } catch (err) {
          setCopySuccess('Failed to copy!');
          console.error('Failed to copy text: ', err);
        }
      };

      return (
        <div>
          <button onClick={handleCopy} className="bg-gray-400 text-white px-4 py-2 rounded-lg">
            Copy Link
          </button>
          {copySuccess && <span style={{ marginLeft: '10px', color: copySuccess === 'Copied!' ? 'green' : 'red' }}>{copySuccess}</span>}
        </div>
      );
    }

    export default CopyButton;