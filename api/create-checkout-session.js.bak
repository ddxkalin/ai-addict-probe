const Stripe = require('stripe')

module.exports = async function handler(req, res) {
  try {
    // Add CORS headers
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )

    if (req.method === 'OPTIONS') {
      return res.status(200).end()
    }

    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method not allowed' })
    }

    // Check for required environment variables
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('Missing STRIPE_SECRET_KEY environment variable')
      return res.status(500).json({ message: 'Server configuration error' })
    }

    // Initialize Stripe with error handling
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-06-20',
    })

    // Parse request body
    const { quizResultId, email } = req.body || {};

    // Use default email if none provided (Stripe will collect the real one)
    const cleanEmail = email && typeof email === 'string' 
      ? email.replace(/\u200B/g, '').trim()
      : 'checkout@example.com';

    // Clean the quizResultId
    const cleanQuizResultId = (quizResultId || 'temp-' + Date.now())
      .toString()
      .replace(/[^a-zA-Z0-9-_]/g, '');

    console.log('Creating checkout session with cleaned data:', { 
      cleanQuizResultId, 
      email: cleanEmail,
      appUrl: process.env.VITE_APP_URL 
    });

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: 'price_1RzfiIFgXTedWk3qR9A7VaCI',
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.VITE_APP_URL || 'https://your-domain.vercel.app'}?success=true&session_id={CHECKOUT_SESSION_ID}&quiz_result_id=${cleanQuizResultId}`,
      cancel_url: `${process.env.VITE_APP_URL || 'https://your-domain.vercel.app'}?canceled=true`,
      metadata: {
        quizResultId: cleanQuizResultId,
        product_id: 'prod_SvWlBNTk2Raf09',
      },
    })

    console.log('Stripe session created successfully:', session.id)
    return res.status(200).json({ sessionId: session.id })

  } catch (error) {
    console.error('Error in checkout session handler:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    
    return res.status(500).json({ 
      message: 'Failed to create checkout session',
      error: errorMessage
    })
  }
}