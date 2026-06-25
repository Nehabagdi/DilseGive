const API_URL = 'http://localhost:5000/api';

export const getCampaigns = async () => {
  const response = await fetch(`${API_URL}/campaigns`);
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to fetch campaigns');
  return data;
};

export const getCampaignById = async (id: string) => {
  const response = await fetch(`${API_URL}/campaigns/${id}`);
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to fetch campaign');
  return data;
};
