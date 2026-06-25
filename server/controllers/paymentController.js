import Stripe from 'stripe';
import Donation from '../models/Donation.js';
import Campaign from '../models/Campaign.js';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
  try {
    const { amount, campaignId } = req.body;
    const donorId = req.user.id;

    const campaign = await Campaign.findById(campaignId);
    if (!campaign) return res.status(404).json({ message: 'Campaign not found' });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: campaign.title,
              description: `Donation for ${campaign.ngo}`,
            },
            unit_amount: amount * 100, // Stripe uses paise for INR
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL || 'http://localhost:8080'}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:8080'}/campaigns/${campaignId}`,
      metadata: {
        donorId,
        campaignId,
        amount: amount.toString(),
      },
    });

    // Create pending donation record
    await Donation.create({
      donorId,
      campaignId,
      amount,
      stripeSessionId: session.id,
      paymentStatus: 'pending',
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { sessionId } = req.body;
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === 'paid') {
      const donation = await Donation.findOne({ stripeSessionId: sessionId });
      if (!donation || donation.paymentStatus === 'success') {
        return res.status(200).json({ message: 'Donation already processed or not found' });
      }

      // Update donation status
      donation.paymentStatus = 'success';
      await donation.save();

      // Update campaign raised amount
      const campaign = await Campaign.findById(donation.campaignId);
      if (campaign) {
        campaign.raised += donation.amount;
        await campaign.save();
      }

      // Update user total donations (if needed - adding field to user model)
      const user = await User.findById(donation.donorId);
      if (user) {
        // We can add a totalDonations field or just track it via donations collection
        // For simplicity, let's assume we might want to update a field
      }

      res.status(200).json({ 
        message: 'Payment verified and donation processed successfully',
        donation 
      });
    } else {
      res.status(400).json({ message: 'Payment not completed' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
