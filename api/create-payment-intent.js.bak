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

    // Initialize Stripe
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-06-20',
    })

    // Parse request body
    const { amount = 499 } = req.body || {} // Default to $4.99

    console.log('Creating payment intent for amount:', amount)

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        product: 'AI Addiction Quiz Results',
      },
    })

    console.log('Payment intent created successfully:', paymentIntent.id)
    
    return res.status(200).json({ 
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    })

  } catch (error) {
    console.error('Error in payment intent handler:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    
    return res.status(500).json({ 
      message: 'Failed to create payment intent',
      error: errorMessage
    })
  }
}