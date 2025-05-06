import { useEffect, useState } from 'react';

export default function ProofApprovalPage() {
  const [imageUrl, setImageUrl] = useState('');
  const [orderId, setOrderId] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setImageUrl(params.get('image'));
    setOrderId(params.get('order_id'));
  }, []);

  const submitResponse = async (decision) => {
    try {
      const response = await fetch('https://hook.us2.make.com/4el2ga2d32l4eieihdnm6bk57wiunoq3', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          order_id: orderId,
          decision: decision,
        }),
      });

      if (response.ok) {
        const msg = `Thank you! You have ${decision} the proof. This window will close in 5 seconds.`;
        setStatusMessage(msg);

        setTimeout(() => {
          window.close();
          setTimeout(() => {
            if (!window.closed) {
              setStatusMessage(`${msg} Please close this window.`);
            }
          }, 500);
        }, 5000);
      } else {
        setStatusMessage('Something went wrong. Please try again.');
      }
    } catch (error) {
      setStatusMessage('Network error. Please try again.');
    }
  };

  return (
    <div className="p-6 text-center bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">Please review your proof</h2>

      <div className="mb-4">
        <button
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded mx-2"
          onClick={() => submitResponse('approved')}
        >
          Approve
        </button>
        <button
          className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded mx-2"
          onClick={() => submitResponse('rejected')}
        >
          Reject
        </button>
      </div>

      <div className="font-bold text-gray-700 mb-4">{statusMessage}</div>

      {imageUrl && (
        <img
          src={imageUrl}
          alt="Proof"
          className="max-w-full border border-gray-300 mx-auto"
        />
      )}
    </div>
  );
} 
