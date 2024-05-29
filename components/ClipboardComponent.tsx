'use client'
import { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

export default function ClipboardComponent() {
  const [snippets, setSnippets] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState(false);

  const addSnippet = () => {
    if (input.trim() !== '') {
      setSnippets([...snippets, input]);
      setInput('');
      setCopied(false); 
    }
  };

  return (
    <div className="clipboard-container">
      <div className="input-container">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your code here..."
          rows={4}
          className="code-input"
        />
        <button onClick={addSnippet}>Add Snippet</button>
      </div>
      <div className="snippets-container">
        {snippets.map((snippet, index) => (
          <div key={index} className="snippet">
            <pre>{snippet}</pre>
            <CopyToClipboard text={snippet} onCopy={() => setCopied(true)}>
              <button>Copy</button>
            </CopyToClipboard>
          </div>
        ))}
      </div>
      {copied && <p>Copied to clipboard!</p>}
      <style jsx>{`
        .clipboard-container {
          border: 1px solid #ccc;
          padding: 10px;
          width: 100%;
          margin-top: 20px;
        }
        .input-container {
          display: flex;
          flex-direction: column;
        }
        .code-input {
          width: 100%;
          margin-bottom: 10px;
          padding: 10px;
          font-family: monospace;
        }
        .snippets-container {
          max-height: 300px;
          overflow-y: auto;
          margin-bottom: 10px;
        }
        .snippet {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px;
          border-bottom: 1px solid #eee;
        }
        pre {
          white-space: pre-wrap;
          word-wrap: break-word;
        }
        button {
          padding: 5px 10px;
        }
      `}</style>
    </div>
  );
};

 