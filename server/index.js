import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import campaignRoutes from './routes/campaignRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import Campaign from './models/Campaign.js';

dotenv.config();
console.log("MONGO_URI:", process.env.MONGO_URI);


const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get("/test", (req, res) => {
  res.send("Backend working");
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/payment', paymentRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('DilSeGive Backend API is running...');
});

// Campaign Seed Data
const seedData = [
  {
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

const seedCampaigns = async () => {
  try {
    const count = await Campaign.countDocuments();
    if (count === 0) {
      await Campaign.insertMany(seedData);
      console.log("Seeded 15 campaigns successfully");
    } else {
      console.log("Campaigns already exist");
    }
  } catch (error) {
    console.error("Seeding error:", error.message);
  }
};

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    throw error; // Rethrow to let the IIFE catch it
  }
};

// Global Error Handlers
process.on('uncaughtException', (err) => {
  console.error("Uncaught Exception:", err);
});

process.on('unhandledRejection', (err) => {
  console.error("Unhandled Rejection:", err);
});

// Server Start IIFE
(async () => {
  // Start listening immediately on port 5000 for diagnostic access
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  try {
    await connectDB();
    await seedCampaigns();
  } catch (error) {
    console.error("Database connection was unsuccessful:", error.message);
    console.log("Portal remains active for diagnostics on port 5000.");
  }
})();
