# **App Name**: CARBO-NEX

## Core Features:

- User Authentication and Role Management: Enable Firebase Authentication with email/password and role selection (NGO, Verifier, Buyer). Implement role-based access control.
- NGO Data Upload: Allow NGOs to upload site data via CSV and drone imagery, including metadata editor and file preview.
- AI Verification Process: Verify uploaded data using rule-based checks, anomaly detection, and image quality assessment via the Cloud Run ML microservice tool.
- CO₂ Prediction: Predict future CO₂ capture using a RandomForest regressor trained on the provided dataset. Display predictions with confidence intervals and charts.
- Tokenization and Minting: Mint CARBO tokens upon successful verification, using either a real ERC-20 contract on Polygon Mumbai or a mock ledger for demonstration.
- Marketplace Listing: Enable NGOs to list CARBO tokens for sale with verification packet links and site metadata. Buyers can place purchase requests (mock payments or Stripe sandbox).
- Admin & Verifier Panel: Provide verifiers (NCCR role) the ability to view verification packets, accept/reject with comments (human-in-loop) to trigger the minting pipeline.

## Style Guidelines:

- Background color: Deep black (#000000) provides a strong contrast and modern feel.
- Primary color: Neon green (#00FF66) for CTAs, highlights, and interactive elements to ensure visibility and engagement, drawing the eye and enhancing user interaction.
- Accent color: Purple (#800080) as a secondary accent for a futuristic and dynamic look.
- Headline font: 'Space Grotesk', a proportional sans-serif font, giving a computerized and techy feel.
- Body font: 'Inter' a grotesque-style sans-serif with a modern and neutral look.
- Use 'lucide-react' icons with neon green to maintain visual consistency.
- Implement glass cards with subtle blur and dark gradients for a modern, engaging UI, following the reference design.
- Employ subtle animations with Framer Motion for hero and card entrance to enhance user experience.