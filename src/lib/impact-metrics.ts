export type ImpactMetric = {
  value: string
  label: string
}

export function formatImpactNumber(val?: string | null) {
  if (!val) return '0'
  const cleanVal = val.replace(/[^\d.]/g, '')
  const num = parseFloat(cleanVal)
  if (Number.isNaN(num)) return val
  return num.toLocaleString('en-US') + (val.includes('+') ? '+' : '')
}

export function buildImpactMetrics(options: {
  portionsRescued?: string | null
  co2Reduced?: string | null
  foodLossPotential?: string | null
  foodScrap?: string | null
  stats?: { label: string; value: string }[]
}): ImpactMetric[] {
  const defaults: ImpactMetric[] = [
    {
      value: formatImpactNumber(options.portionsRescued) || '608,311',
      label: 'PORTIONS OF FOOD RESCUED',
    },
    {
      value: formatImpactNumber(options.foodScrap) || '272',
      label: 'TOONS OF FOOD SCRAP PROCESSED INTO ANIMAL FEEDS',
    },
    {
      value: formatImpactNumber(options.foodLossPotential) || '143',
      label: 'TONS OF POTENTIAL FOOD LOSES AND WASTE RESCUED',
    },
    {
      value: formatImpactNumber(options.co2Reduced) || '788,500',
      label: 'KG CO2-ek greenhouse gas emission reduced',
    },
  ]

  if (!options.stats?.length) {
    return defaults
  }

  return options.stats.map((stat, index) => ({
    value: stat.value,
    label: stat.label,
    ...(defaults[index] ? {} : {}),
  }))
}
