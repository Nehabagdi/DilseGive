const API_URL = 'http://localhost:5000/api';

export const createCheckoutSession = async (amount: number, campaignId: string, token: string) => {
  const response = await fetch(`${API_URL}/payment/create-checkout-session`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ amount, campaignId }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to create checkout session');
  return data;
};

export const verifyPayment = async (sessionId: string) => {
  const response = await fetch(`${API_URL}/payment/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionId }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Payment verification failed');
  return data;
};
