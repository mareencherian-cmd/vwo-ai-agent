export function calculateMaturity(data: any) {
  if (!data || !data.maturity) return 0

  let score = 0

  if (data.maturity.includes("rarely")) score += 0
  if (data.maturity.includes("occasional")) score += 2
  if (data.maturity.includes("regularly")) score += 4
  if (data.maturity.includes("structured")) score += 6

  return score

  if (data.usesHeatmaps) score += 1
  if (data.usesFunnels) score += 2
  if (data.usesPersonalization) score += 2

  if (score <= 3) return "Beginner"
  if (score <= 7) return "Intermediate"
  return "Advanced"
}