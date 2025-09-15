export default {
  hero: {
    title1: 'Tokenizing Blue Carbon',
    title2: 'with AI + Blockchain.',
    subtitle: 'CARBO-NEX is a decentralized platform for verifying and tokenizing blue carbon credits. We use AI and blockchain to bring transparency, liquidity, and trust to the carbon market.',
    getStarted: 'Get Started',
    launchApp: 'Launch App',
    marketplace: 'Explore Marketplace',
  },
  stats: [
    {
        label: 'CO₂ Verified (t)',
        description: 'Tons of CO₂ equivalent verified and tokenized through our platform.'
    },
    {
        label: 'NGOs Onboarded',
        description: 'Global conservation groups leveraging CARBO-NEX to fund their projects.'
    },
    {
        label: 'Verification Accuracy',
        description: 'AI-powered verification ensures the highest level of data integrity.'
    }
  ],
  features: {
    title: 'How It Works',
    subtitle: 'A seamless flow from verification to monetization, built on trust and transparency.',
    items: [
        {
            title: 'AI-Powered Verification',
            description: 'Upload drone imagery and site data. Our AI models analyze and verify the data against NCCR guidelines, ensuring integrity and accuracy.'
        },
        {
            title: 'Tokenize Your Impact',
            description: 'Once verified, your carbon credits are minted as unique tokens on the blockchain, creating a transparent and immutable record of your environmental impact.'
        },
        {
            title: 'Liquid Marketplace',
            description: 'List your tokenized credits on our open marketplace. Connect with buyers and investors to fund your conservation efforts and scale your impact.'
        }
    ]
  },
  footer: {
    copyright: '© {year} CARBO-NEX. All rights reserved.'
  }
} as const;
