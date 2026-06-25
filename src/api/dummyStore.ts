const initialCampaigns = [
  {
    _id: "1",
    title: "Feed 500 Homeless Families",
    description: "Providing nutritious meals to over 500 homeless families across Hyderabad. Your support helps us deliver food daily.",
    goalAmount: 100000,
    raisedAmount: 42000,
    location: "Hyderabad, Telangana",
    category: "Food",
    ngoName: "Helping Hands Foundation",
    image: "https://images.unsplash.com/photo-1593113630400-ea4288922497"
  },
  {
    _id: "2",
    title: "Educate Rural Children",
    description: "Support education for underprivileged children in rural Karnataka by providing books, uniforms, and digital learning.",
    goalAmount: 200000,
    raisedAmount: 85000,
    location: "Bangalore, Karnataka",
    category: "Education",
    ngoName: "Bright Future NGO",
    image: "https://images.unsplash.com/photo-1588072432836-e10032774350"
  },
  {
    _id: "3",
    title: "Medical Aid for Cancer Patients",
    description: "Help financially struggling cancer patients access life-saving treatments and medicines.",
    goalAmount: 300000,
    raisedAmount: 120000,
    location: "Mumbai, Maharashtra",
    category: "Healthcare",
    ngoName: "Care & Cure Trust",
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309"
  },
  {
    _id: "4",
    title: "School Supplies for Slum Children",
    description: "Provide school kits, uniforms, and bags to children living in urban slums in Delhi.",
    goalAmount: 80000,
    raisedAmount: 30000,
    location: "Delhi",
    category: "Education",
    ngoName: "Smile Foundation",
    image: "https://images.unsplash.com/photo-1509099836639-18ba1795216d"
  },
  {
    _id: "5",
    title: "Midday Meals for Government Schools",
    description: "Ensure children receive proper nutrition through midday meals in government schools.",
    goalAmount: 150000,
    raisedAmount: 60000,
    location: "Chennai, Tamil Nadu",
    category: "Food",
    ngoName: "Food For All NGO",
    image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
  },
  {
    _id: "6",
    title: "Flood Relief Support",
    description: "Provide emergency relief, food, and shelter kits to families affected by floods.",
    goalAmount: 250000,
    raisedAmount: 90000,
    location: "Hyderabad, Telangana",
    category: "Disaster Relief",
    ngoName: "Relief India Trust",
    image: "https://images.unsplash.com/photo-1509099836639-18ba1795216d"
  },
  {
    _id: "7",
    title: "Women Skill Development Program",
    description: "Train women in rural areas with skills like tailoring and handicrafts to help them earn independently.",
    goalAmount: 120000,
    raisedAmount: 50000,
    location: "Bangalore, Karnataka",
    category: "Women Empowerment",
    ngoName: "EmpowerHer Foundation",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
  },
  {
    _id: "8",
    title: "Free Health Checkup Camps",
    description: "Organizing free health camps for low-income communities including diagnostics and medicines.",
    goalAmount: 100000,
    raisedAmount: 45000,
    location: "Delhi",
    category: "Healthcare",
    ngoName: "HealthFirst NGO",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118"
  },
  {
    _id: "9",
    title: "Support Orphanage Children",
    description: "Provide food, education, and shelter support for orphaned children.",
    goalAmount: 180000,
    raisedAmount: 75000,
    location: "Mumbai, Maharashtra",
    category: "Child Welfare",
    ngoName: "ChildCare Foundation",
    image: "https://images.unsplash.com/photo-1593113630400-ea4288922497"
  },
  {
    _id: "10",
    title: "Clean Drinking Water Initiative",
    description: "Install water purification systems in villages to provide clean drinking water.",
    goalAmount: 220000,
    raisedAmount: 90000,
    location: "Chennai, Tamil Nadu",
    category: "Environment",
    ngoName: "WaterLife NGO",
    image: "https://images.unsplash.com/photo-1509099836639-18ba1795216d"
  },
  {
    _id: "11",
    title: "Winter Clothes Distribution",
    description: "Distribute blankets and warm clothes to homeless people during winter.",
    goalAmount: 70000,
    raisedAmount: 25000,
    location: "Delhi",
    category: "Relief",
    ngoName: "Warm Hearts NGO",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba"
  },
  {
    _id: "12",
    title: "Rural Sanitation Drive",
    description: "Build toilets and improve sanitation facilities in rural villages.",
    goalAmount: 160000,
    raisedAmount: 65000,
    location: "Hyderabad, Telangana",
    category: "Sanitation",
    ngoName: "Clean India Mission NGO",
    image: "https://images.unsplash.com/photo-1509099836639-18ba1795216d"
  },
  {
    _id: "13",
    title: "Scholarships for Girls Education",
    description: "Provide scholarships for girls to continue their education.",
    goalAmount: 200000,
    raisedAmount: 110000,
    location: "Bangalore, Karnataka",
    category: "Education",
    ngoName: "Girls Future Trust",
    image: "https://images.unsplash.com/photo-1588072432836-e10032774350"
  },
  {
    _id: "14",
    title: "COVID Recovery Support",
    description: "Help families recover financially and medically after COVID impact.",
    goalAmount: 140000,
    raisedAmount: 60000,
    location: "Mumbai, Maharashtra",
    category: "Healthcare",
    ngoName: "Hope Foundation",
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309"
  },
  {
    _id: "15",
    title: "Nutrition Program for Children",
    description: "Provide daily nutrition to undernourished children.",
    goalAmount: 130000,
    raisedAmount: 55000,
    location: "Chennai, Tamil Nadu",
    category: "Food",
    ngoName: "Healthy Kids NGO",
    image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
  }
];

class DummyStore {
  constructor() {
    this.init();
  }

  init() {
    if (!localStorage.getItem('campaigns')) {
      localStorage.setItem('campaigns', JSON.stringify(initialCampaigns));
    }
    if (!localStorage.getItem('users')) {
      localStorage.setItem('users', JSON.stringify([]));
    }
  }

  getCampaigns() {
    return JSON.parse(localStorage.getItem('campaigns') || '[]');
  }

  getCampaignById(id) {
    const campaigns = this.getCampaigns();
    return campaigns.find(c => c._id === id);
  }

  createCampaign(campaignData) {
    const campaigns = this.getCampaigns();
    const newCampaign = {
      ...campaignData,
      _id: Math.random().toString(36).substr(2, 9),
      raisedAmount: 0,
      createdAt: new Date().toISOString()
    };
    campaigns.push(newCampaign);
    localStorage.setItem('campaigns', JSON.stringify(campaigns));
    return newCampaign;
  }

  updateCampaign(id, updateData) {
     const campaigns = this.getCampaigns();
     const idx = campaigns.findIndex(c => c._id === id);
     if (idx !== -1) {
       campaigns[idx] = { ...campaigns[idx], ...updateData };
       localStorage.setItem('campaigns', JSON.stringify(campaigns));
       return campaigns[idx];
     }
     return null;
  }

  getUsers() {
    return JSON.parse(localStorage.getItem('users') || '[]');
  }

  createUser(userData) {
    const users = this.getUsers();
    const newUser = {
      ...userData,
      _id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString()
    };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    return newUser;
  }

  findUserByEmail(email) {
    return this.getUsers().find(u => u.email === email);
  }

  getUserById(id) {
    return this.getUsers().find(u => u._id === id);
  }
}

export const store = new DummyStore();
