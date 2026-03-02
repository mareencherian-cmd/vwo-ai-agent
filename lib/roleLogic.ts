export function getRoleFocus(role: string) {
  const roles: any = {
    "Product Manager":
      "Focus on activation funnels, feature adoption, onboarding flows, and experiment velocity.",
    "Growth Marketer":
      "Focus on acquisition funnels, landing page optimization, pricing tests, and conversion lift.",
    "CRO Manager":
      "Focus on full funnel experimentation, statistical rigor, segmentation depth, and velocity.",
    "Head of Digital":
      "Focus on revenue impact, cross-channel personalization, and program scalability.",
    "Founder":
      "Focus on quick revenue wins, core conversion bottlenecks, and lean experimentation."
  }

  return roles[role] || roles["Growth Marketer"]
}