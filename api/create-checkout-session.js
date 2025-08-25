import Stripe from 'stripe'

export default async function handler(req, res) {
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
    console.log('Environment check:', {
      hasStripeKey: !!process.env.STRIPE_SECRET_KEY,
      stripeKeyLength: process.env.STRIPE_SECRET_KEY?.length || 0,
      stripeKeyPrefix: process.env.STRIPE_SECRET_KEY?.substring(0, 7) || 'none'
    })

    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('Missing STRIPE_SECRET_KEY environment variable')
      return res.status(500).json({ message: 'Server configuration error: Missing Stripe key' })
    }

    if (!process.env.STRIPE_SECRET_KEY.startsWith('sk_')) {
      console.error('Invalid STRIPE_SECRET_KEY format')
      return res.status(500).json({ message: 'Server configuration error: Invalid Stripe key format' })
    }

    // Initialize Stripe with error handling
    let stripe
    try {
      stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: '2024-06-20',
      })
    } catch (stripeInitError) {
      console.error('Failed to initialize Stripe:', stripeInitError)
      return res.status(500).json({ message: 'Stripe initialization failed' })
    }

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

    // Get the origin from the request or use environment variable
    const origin = req.headers.origin || process.env.VITE_APP_URL || 'https://ai-addict-probe-9tjkovr1e-kstoev9316-gmailcoms-projects.vercel.app';
    
    console.log('Creating checkout session with origin:', origin);

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'AI Addiction Quiz Results',
              description: 'Unlock your personalized AI addiction analysis and insights',
            },
            unit_amount: 499, // $4.99 in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}?success=true&session_id={CHECKOUT_SESSION_ID}&quiz_result_id=${cleanQuizResultId}`,
      cancel_url: `${origin}?canceled=true`,
      metadata: {
        quizResultId: cleanQuizResultId,
        product: 'AI Addiction Quiz Results',
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