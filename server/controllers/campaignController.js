import Campaign from '../models/Campaign.js';

export const seedCampaigns = async (req, res) => {
  const campaignsData = [
    {
      title: "Feed 500 Homeless Families",
      ngo: "Helping Hands Foundation",
      location: "Hyderabad, Telangana",
      category: "Food",
      goal: 100000,
      raised: 42000,
      description: "This campaign aims to provide daily meals to homeless families across Hyderabad, focusing on nutrition and regular supply. Our team identifies clusters of homeless families and ensures they receive at least two full meals a day.",
      image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092",
      updates: [
        { date: "2026-03-10", text: "Distributed meals to 120 families this week across Secunderabad." },
        { date: "2026-03-05", text: "Partnered with local volunteers for logistics support." }
      ],
      transparency: [
        { amount: 5000, purpose: "Groceries purchase for week 1", date: "2026-03-01" },
        { amount: 3000, purpose: "Cooking supplies & fuel", date: "2026-03-05" }
      ]
    },
    {
      title: "Educate 200 Rural Children",
      ngo: "Shakti Education Trust",
      location: "Bangalore, Karnataka",
      category: "Education",
      goal: 250000,
      raised: 110000,
      description: "Providing quality primary education and kits to children in rural areas near Bangalore. We set up learning centers with modern tools and provide uniforms, books, and stationery to ensure no child is left behind.",
      image: "https://images.unsplash.com/photo-1588072432836-e10032774350",
      updates: [
        { date: "2026-03-15", text: "New learning center opened in Devanahalli village." },
        { date: "2026-03-01", text: "100 kits distributed to Kolar rural students." }
      ],
      transparency: [
        { amount: 25000, purpose: "Tablet purchase for interactive learning", date: "2026-02-15" },
        { amount: 15000, purpose: "Stationery and uniform bulk buy", date: "2026-02-28" }
      ]
    },
    {
      title: "Medical Aid for Cancer Patients",
      ngo: "CareMore India",
      location: "Mumbai, Maharashtra",
      category: "Healthcare",
      goal: 500000,
      raised: 305000,
      description: "Financial assistance for chemo and surgery for economically weaker sections in Mumbai. We work directly with hospitals like Tata Memorial to identify patients in urgent need of life-saving treatments.",
      image: "https://images.unsplash.com/photo-1584515933487-779824d29309",
      updates: [
        { date: "2026-03-20", text: "Successfully funded 5 surgeries this month." },
        { date: "2026-03-08", text: "Reached our 50% milestone! Thank you donors." }
      ],
      transparency: [
        { amount: 120000, purpose: "Hospital bill clearance (Patient #452)", date: "2026-03-05" },
        { amount: 45000, purpose: "Chemotherapy medicines (Patient #459)", date: "2026-03-12" }
      ]
    },
    {
      title: "School Supplies for Slum Kids",
      ngo: "New Hope Foundation",
      location: "Delhi, Delhi",
      category: "Education",
      goal: 75000,
      raised: 28000,
      description: "Ensuring children in Delhi's slums have bags, notebooks, and pencils for the new session. We visit local slums to identify children who have dropped out due to lack of basic supplies and re-integrate them into schools.",
      image: "https://images.unsplash.com/photo-1509099836639-18ba1795216d",
      updates: [
        { date: "2026-03-25", text: "Supplies reached 3 major slum clusters in West Delhi." },
        { date: "2026-03-18", text: "Local teachers joined our drive as mentors." }
      ],
      transparency: [
        { amount: 8000, purpose: "Notebooks purchase from wholesaler", date: "2026-03-04" },
        { amount: 5000, purpose: "School bag production", date: "2026-03-24" }
      ]
    },
    {
      title: "Midday Meals for Govt Schools",
      ngo: "Annapurna India",
      location: "Chennai, Tamil Nadu",
      category: "Food",
      goal: 150000,
      raised: 92000,
      description: "Healthy midday meals for 1000 government school students daily in and around Chennai. We improve attendance and nutrition by providing a balanced meal that includes protein and micronutrients.",
      image: "https://images.unsplash.com/photo-1593113630400-ea4288922497",
      updates: [
        { date: "2026-04-01", text: "Daily student attendance increased by 15% in 5 schools." },
        { date: "2026-03-22", text: "New kitchen facility inaugurated in suburban Chennai." }
      ],
      transparency: [
        { amount: 40000, purpose: "Bulk grain and pulse procurement", date: "2026-03-10" },
        { amount: 12000, purpose: "Truck fuel and logistics", date: "2026-03-25" }
      ]
    },
    {
      title: "Emergency Flood Relief Support",
      ngo: "React India Foundation",
      location: "Hyderabad, Telangana",
      category: "Relief",
      goal: 1000000,
      raised: 750000,
      description: "Emergency support including blankets, food kits, and meds for flood-affected regions in Hyderabad. We coordinate with local disaster management teams to reach remote submerged areas immediately.",
      image: "https://images.unsplash.com/photo-1593113630400-ea4288922497",
      updates: [
        { date: "2026-04-05", text: "Relief kits delivered to 400 submerged households." },
        { date: "2026-03-30", text: "Rescue team deployed to affected riverine areas." }
      ],
      transparency: [
        { amount: 200000, purpose: "Medical kits and emergency supplies", date: "2026-03-15" },
        { amount: 150000, purpose: "Temporary shelter tents and blankets", date: "2026-03-28" }
      ]
    },
    {
      title: "Women Skill Development Program",
      ngo: "Nari Shakti Group",
      location: "Bangalore, Karnataka",
      category: "Development",
      goal: 200000,
      raised: 125000,
      description: "Skill training in sewing, handicrafts, and digital literacy for 100 women to be self-reliant. We set up workstations where women can produce products that we help market online.",
      image: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=1200&q=80",
      updates: [
        { date: "2026-03-25", text: "First batch of 20 graduated in sewing and design." },
        { date: "2026-03-10", text: "Secured our first corporate order for handicrafts." }
      ],
      transparency: [
        { amount: 45000, purpose: "Sewing machine procurement (10 units)", date: "2026-03-02" },
        { amount: 10000, purpose: "Raw fabric and thread materials", date: "2026-03-20" }
      ]
    },
    {
      title: "Free Health Checkup Camps",
      ngo: "HealthForAll India",
      location: "Delhi, Delhi",
      category: "Healthcare",
      goal: 120000,
      raised: 55000,
      description: "Organizing free medical camps in North Delhi with specialist doctors and free medicine distribution. We focus on areas where public medical infrastructure is hard to reach.",
      image: "https://images.unsplash.com/photo-1584515933487-779824d29309",
      updates: [
        { date: "2026-04-02", text: "Successfully screened 350 people in Rohini area." },
        { date: "2026-03-18", text: "Partnered with local diagnostic lab for free b-tests." }
      ],
      transparency: [
        { amount: 20000, purpose: "Essential medicines bulk purchase", date: "2026-03-20" },
        { amount: 15000, purpose: "Medical camp infrastructure setup", date: "2026-04-01" }
      ]
    },
    {
      title: "Support Orphanage Children",
      ngo: "Little Stars Welfare Society",
      location: "Mumbai, Maharashtra",
      category: "Healthcare",
      goal: 400000,
      raised: 180000,
      description: "Supporting regular meals, health needs, and schooling for 50 kids in a Mumbai orphanage. We emphasize a homely environment and focus on the psychological well-being of the children.",
      image: "https://images.unsplash.com/photo-1509099836639-18ba1795216d",
      updates: [
        { date: "2026-04-08", text: "Renovated child study area with new desk and lighting." },
        { date: "2026-03-25", text: "Quarterly health screening for all 50 kids completed." }
      ],
      transparency: [
        { amount: 60000, purpose: "Quarterly food and ration bill", date: "2026-03-30" },
        { amount: 25000, purpose: "School fees for 15 children for H1", date: "2026-04-05" }
      ]
    },
    {
      title: "Clean Drinking Water Initiative",
      ngo: "Jal Seva Trust",
      location: "Chennai, Tamil Nadu",
      category: "Development",
      goal: 300000,
      raised: 210000,
      description: "Installing RO water plants in drought-prone villages around Chennai for clean water. We work with village panchayats to ensure proper maintenance and community ownership of the RO units.",
      image: "https://images.unsplash.com/photo-1594398901394-4e34939a4fd0?w=1200&q=80",
      updates: [
        { date: "2026-04-10", text: "Third RO unit installed in Kovalam rural village." },
        { date: "2026-03-28", text: "Water testing shows 95% reduction in contaminants." }
      ],
      transparency: [
        { amount: 90000, purpose: "RO plant industrial unit & installation", date: "2026-03-15" },
        { amount: 15000, purpose: "Community training for plant ops", date: "2026-04-02" }
      ]
    },
    {
      title: "Winter Clothes Distribution",
      ngo: "Warmth India Foundation",
      location: "Delhi, Delhi",
      category: "Relief",
      goal: 80000,
      raised: 35000,
      description: "Providing high-quality blankets, sweaters, and caps to people living on the streets of Delhi during peak winter. Our team works through the night to reach those sleeping in open shelters.",
      image: "https://images.unsplash.com/photo-1544253102-1254a6704683?w=1200&q=80",
      updates: [
        { date: "2026-03-15", text: "Distributed 300 blankets in North Delhi this week." },
        { date: "2026-03-01", text: "Partnered with garment suppliers for at-cost hoodies." }
      ],
      transparency: [
        { amount: 30000, purpose: "Blanket bulk purchase from factory", date: "2026-02-28" },
        { amount: 5000, purpose: "Volunteer night-logistics cost", date: "2026-03-12" }
      ]
    },
    {
      title: "Rural Sanitation Drive",
      ngo: "Gram Vikas Sansthan",
      location: "Hyderabad, Telangana",
      category: "Development",
      goal: 200000,
      raised: 95000,
      description: "Building 50 low-cost bio-toilets in rural areas near Hyderabad to promote hygiene. We focus on building one toilet for each household to eliminate open defecation in selected villages.",
      image: "https://images.unsplash.com/photo-1621447509390-348270381617?w=1200&q=80",
      updates: [
        { date: "2026-04-05", text: "Foundations laid for 20 units in Malkajgiri village." },
        { date: "2026-03-20", text: "Village community center training session held." }
      ],
      transparency: [
        { amount: 70000, purpose: "Cement, bricks and bio-digester tanks", date: "2026-03-28" },
        { amount: 12000, purpose: "Skilled labor and masonry costs", date: "2026-04-02" }
      ]
    },
    {
      title: "Scholarships for Girls Education",
      ngo: "Udaan Girls Education",
      location: "Bangalore, Karnataka",
      category: "Education",
      goal: 300000,
      raised: 245000,
      description: "Supporting 100 bright girls from underprivileged families with higher secondary education scholarships. We cover fees, coaching, and digital devices to help them enter professional courses.",
      image: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=1200&q=80",
      updates: [
        { date: "2026-04-12", text: "Five of our students selected for merit quota in Engg." },
        { date: "2026-03-30", text: "Bridge course for grade 10 students starting next week." }
      ],
      transparency: [
        { amount: 150000, purpose: "Direct scholarship fees remittance", date: "2026-03-25" },
        { amount: 40000, purpose: "Study material and digital tabs", date: "2026-04-05" }
      ]
    },
    {
      title: "COVID Recovery Support",
      ngo: "CarePlus India",
      location: "Mumbai, Maharashtra",
      category: "Healthcare",
      goal: 150000,
      raised: 88000,
      description: "Rehabilitation and long-COVID support camps for Mumbai's elderly population. We focus on lung health checkups, nutritional supplements, and psychological counseling for trauma recovery.",
      image: "https://images.unsplash.com/photo-1584467735815-f778f274e296?w=1200&q=80",
      updates: [
        { date: "2026-04-01", text: "Successfully completed our 10th recovery camp." },
        { date: "2026-03-15", text: "Specialized physiotherapy kits distributed." }
      ],
      transparency: [
        { amount: 35000, purpose: "Physiotherapy equipment purchase", date: "2026-03-28" },
        { amount: 15000, purpose: "Vitamin and nutritional kit bulk buy", date: "2026-04-02" }
      ]
    },
    {
      title: "Nutrition Program for Children",
      ngo: "Healthy Kids Tamil Nadu",
      location: "Chennai, Tamil Nadu",
      category: "Food",
      goal: 250000,
      raised: 115000,
      description: "Fortified nutrition kits for 500 undernourished children in rural Tamil Nadu districts. We track the BMI and growth of these children to measure the impact of our supplements.",
      image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=1200&q=80",
      updates: [
        { date: "2026-04-08", text: "Monthly growth tracking shows 80% improvement." },
        { date: "2026-03-22", text: "New supply chain established for local superfoods." }
      ],
      transparency: [
        { amount: 80000, purpose: "Fortified food components procurement", date: "2026-03-15" },
        { amount: 15000, purpose: "Nutritional health worker stipend", date: "2026-04-02" }
      ]
    }
  ];

  try {
    const existing = await Campaign.countDocuments();
    if (existing > 5) {
        await Campaign.deleteMany();
    }
    const created = await Campaign.insertMany(campaignsData);
    res.status(201).json({ message: "Successfully seeded 15 campaigns with corrected images", count: created.length });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find().sort({ createdAt: -1 });
    res.status(200).json(campaigns);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCampaignById = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) return res.status(404).json({ message: 'Campaign not found' });
    res.status(200).json(campaign);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
