export function getIndustryUseCases(industry: string) {
  const map: any = {
    Ecommerce: [
      "Checkout flow optimization",
      "Product page trust signals",
      "Cart abandonment recovery experiments",
      "Upsell and cross-sell personalization"
    ],
    SaaS: [
      "Free trial conversion optimization",
      "Demo request optimization",
      "Onboarding friction reduction",
      "Pricing page experimentation"
    ],
    Fintech: [
      "KYC drop-off reduction",
      "Trust reinforcement experiments",
      "Mobile onboarding optimization"
    ],
    EdTech: [
      "Course enrollment funnel testing",
      "Subscription model experiments",
      "Engagement retention experiments"
    ]
  }

  return map[industry] || map["SaaS"]
}