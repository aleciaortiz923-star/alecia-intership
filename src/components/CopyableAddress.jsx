import React, { useState } from 'react';
import './CopyableAddress.css';

const CopyableAddress = ({ address }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(address).then(() => {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    });
  };

  if (!address) {
    return null;
  }

  const shortAddress = `${address.substring(0, 12)}...${address.substring(address.length - 4)}`;

  return (
    <div className="copyable-address">
      <span className="address-text">{shortAddress}</span>
      <button onClick={copyToClipboard} className="copy-button">
        {isCopied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  );
};

export default CopyableAddress;
