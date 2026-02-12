# The Trail Run Collective

A production-ready MVP ultrarunning events website featuring event registration, Stripe payments, and Sanity CMS.

## Features

- 🏃 Event registration for multiple distances (25k, 50k, 100k)
- 💳 Secure payments via Stripe Checkout
- 📝 Content management via Sanity CMS
- 📧 Newsletter signup and contact forms
- 🔍 SEO optimized with structured data
- 🎨 Clean, modern UI with Tailwind CSS and shadcn/ui
- 📱 Mobile-first responsive design
- ⚡ Built with Next.js 15 App Router

## Tech Stack

- **Framework**: Next.js 15 (App Router) + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **CMS**: Sanity v3
- **Payments**: Stripe Checkout + Webhooks
- **Email**: Resend (optional)
- **Deployment**: Vercel

## Prerequisites

- Node.js 18+ and npm
- A Sanity account (free at [sanity.io](https://www.sanity.io))
- A Stripe account (test mode is fine)
- A Vercel account for deployment (optional)

## Local Development Setup

### 1. Install Dependencies

\`\`\`bash
npm install --legacy-peer-deps
\`\`\`

### 2. Set Up Sanity

Create a new Sanity project:

\`\`\`bash
npm run sanity init
\`\`\`

Follow the prompts:
- Create a new project or use an existing one
- Choose a dataset name (e.g., "production")
- Say yes to deploy the Studio

This will update your `.env.local` with the project ID.

### 3. Environment Variables

Create a \`.env.local\` file in the root directory:

\`\`\`bash
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01

# Stripe
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Resend (optional)
RESEND_API_KEY=re_...
\`\`\`

**Get Sanity API Token:**
1. Go to [sanity.io/manage](https://www.sanity.io/manage)
2. Select your project
3. Go to API → Tokens
4. Create a new token with "Editor" permissions
5. Copy the token to \`SANITY_API_TOKEN\`

### 4. Set Up Stripe

#### Create Products and Prices

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Switch to **Test Mode**
3. Go to **Products** → **Add Product**
4. Create products for each distance:
   - Product: "The Shortest Night - 25k" → Price ID: \`price_xxx\`
   - Product: "The Shortest Night - 50k" → Price ID: \`price_xxx\`
   - Product: "The Shortest Night - 100k" → Price ID: \`price_xxx\`
   - (Repeat for "The Shortest Day")

5. Copy the **Price IDs** for use in Sanity

#### Get Stripe Keys

1. Go to **Developers** → **API keys**
2. Copy:
   - **Publishable key** → \`NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY\`
   - **Secret key** → \`STRIPE_SECRET_KEY\`

### 5. Seed Sanity Content

1. Start the dev server:

\`\`\`bash
npm run dev
\`\`\`

2. Visit [http://localhost:3000/studio](http://localhost:3000/studio)

3. Create **Site Settings**:
   - Brand Name: The Trail Run Collective
   - Tagline: UK trail & ultra events — Solstice specials at Box Hill, Surrey
   - Contact Email: your@email.com
   - SEO Title: The Trail Run Collective
   - SEO Description: UK trail & ultra events — Solstice specials at Box Hill, Surrey

4. Create **Events**:

   **Event 1: The Shortest Night**
   - Title: The Shortest Night
   - Generate slug from title
   - Short Description: Summer solstice ultra at Box Hill
   - Location: Box Hill, Surrey
   - Date: Choose a date
   - Published: Yes
   - Distances (add 3):
     - Label: 25k, Stripe Price ID: \`price_xxx\`, Sort Order: 1, Open: Yes
     - Label: 50k, Stripe Price ID: \`price_xxx\`, Sort Order: 2, Open: Yes
     - Label: 100k, Stripe Price ID: \`price_xxx\`, Sort Order: 3, Open: Yes

   **Event 2: The Shortest Day**
   - Title: The Shortest Day
   - Generate slug from title
   - Short Description: Winter solstice ultra at Box Hill
   - Location: Box Hill, Surrey
   - Date: Choose a date
   - Published: Yes
   - Distances (add 3):
     - Label: 25k, Stripe Price ID: \`price_xxx\`, Sort Order: 1, Open: Yes
     - Label: 50k, Stripe Price ID: \`price_xxx\`, Sort Order: 2, Open: Yes
     - Label: 100k, Stripe Price ID: \`price_xxx\`, Sort Order: 3, Open: Yes

### 6. Add Hero Image

Add a hero image to \`public/images/hero.jpg\` (recommended size: 1920x1080px or larger).

For testing, you can use a placeholder:
1. Download a free image from [Unsplash](https://unsplash.com/s/photos/trail-running)
2. Save it as \`public/images/hero.jpg\`

### 7. Run the Development Server

\`\`\`bash
npm run dev
\`\`\`

Visit [http://localhost:3000](http://localhost:3000) to see the site.

Visit [http://localhost:3000/studio](http://localhost:3000/studio) for the Sanity Studio.

## Testing Stripe Webhooks Locally

### Install Stripe CLI

Download from [stripe.com/docs/stripe-cli](https://stripe.com/docs/stripe-cli)

### Listen for Webhooks

\`\`\`bash
stripe login
stripe listen --forward-to localhost:3000/api/stripe/webhook
\`\`\`

This will output a webhook signing secret. Copy it to \`STRIPE_WEBHOOK_SECRET\` in \`.env.local\`.

### Test a Payment

1. Select an event and distance
2. Click "Continue to Payment"
3. Use test card: \`4242 4242 4242 4242\`
4. Any future expiry date and any CVC
5. Complete the payment
6. Check the Stripe CLI output - you should see the webhook event
7. Check Sanity Studio → Entries to see the new entry

## Production Deployment

### Deploy to Vercel

1. Push your code to GitHub

2. Go to [vercel.com](https://vercel.com) and import your repository

3. Add all environment variables from \`.env.local\`

4. Update \`NEXT_PUBLIC_SITE_URL\` to your production URL

5. Deploy

### Configure Production Stripe Webhook

1. Switch Stripe to **Live Mode**
2. Create live products and prices
3. Update price IDs in Sanity
4. Go to **Developers** → **Webhooks** → **Add endpoint**
5. Endpoint URL: \`https://yourdomain.com/api/stripe/webhook\`
6. Events to listen for: \`checkout.session.completed\`
7. Copy the signing secret to Vercel environment variables as \`STRIPE_WEBHOOK_SECRET\`
8. Redeploy on Vercel

## Project Structure

\`\`\`
├── app/
│   ├── api/
│   │   ├── checkout/route.ts      # Stripe checkout session creation
│   │   ├── subscribe/route.ts     # Newsletter signup
│   │   ├── enquiry/route.ts       # Contact form
│   │   └── stripe/webhook/route.ts # Payment webhook handler
│   ├── studio/[[...tool]]/        # Sanity Studio
│   ├── success/                   # Payment success page
│   ├── cancel/                    # Payment cancelled page
│   ├── layout.tsx                 # Root layout
│   ├── page.tsx                   # Homepage
│   ├── sitemap.ts                 # Dynamic sitemap
│   └── robots.ts                  # Robots.txt
├── components/
│   ├── ui/                        # shadcn/ui components
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── EventsSection.tsx
│   ├── EventCard.tsx
│   ├── DistanceModal.tsx
│   ├── SignupSection.tsx
│   └── ContactSection.tsx
├── sanity/
│   ├── schemaTypes/               # All Sanity schemas
│   └── lib/                       # Sanity clients and queries
├── lib/
│   ├── stripe.ts                  # Stripe client
│   ├── utils.ts                   # Utility functions
│   └── metadata.ts                # SEO metadata helpers
└── public/
    └── images/                    # Image assets
\`\`\`

## Sanity Schemas

- **siteSettings**: Brand name, tagline, contact email, SEO defaults (singleton)
- **event**: Event details with distances
- **distance**: Embedded object for event distances
- **entry**: Payment records created by webhook
- **subscriber**: Newsletter signups
- **enquiry**: Contact form submissions

## Key Features

### Event Registration Flow

1. User clicks "Enter Now" on an event
2. Modal opens with distance options
3. User selects distance and clicks "Continue to Payment"
4. Server creates Stripe Checkout session
5. User redirects to Stripe
6. User completes payment
7. Stripe webhook creates entry in Sanity
8. User redirects to success page

### Idempotency

The webhook handler checks for existing entries by \`stripeSessionId\` to prevent duplicates if Stripe retries the webhook.

### Content Management

All content is editable via Sanity Studio at \`/studio\`:
- Site settings
- Events (add/edit/remove)
- View entries, subscribers, and enquiries

## Customization

### Styling

Colors are defined in \`tailwind.config.ts\` and \`app/globals.css\`. Customize the \`--primary\`, \`--secondary\`, etc. CSS variables to match your brand.

### Content

All text content should be minimal and refined. Edit component text directly or move to Sanity for full CMS control.

### Images

Replace \`public/images/hero.jpg\` with your own hero image. You can also add event-specific images via Sanity.

## Troubleshooting

### Dependency Conflicts

If you encounter peer dependency errors, use:

\`\`\`bash
npm install --legacy-peer-deps
\`\`\`

### Sanity Connection Issues

Verify:
- Project ID is correct
- Dataset name matches
- API token has Editor permissions

### Stripe Webhook Not Working

Check:
- Webhook secret is correct
- Stripe CLI is running (\`stripe listen\`)
- Endpoint is accessible
- Event type is \`checkout.session.completed\`

### Build Errors

Ensure all environment variables are set, especially Sanity credentials.

## License

MIT

## Support

For issues or questions, please open an issue on GitHub.
