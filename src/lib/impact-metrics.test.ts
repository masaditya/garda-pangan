import { describe, expect, it } from 'vitest'

import { buildImpactMetrics, formatImpactNumber } from './impact-metrics'

describe('impact-metrics', () => {
  it('returns empty string for missing values', () => {
    expect(formatImpactNumber(null)).toBe('')
    expect(formatImpactNumber(undefined)).toBe('')
  })

  it('uses default metric values when cms stats are absent', () => {
    const metrics = buildImpactMetrics({})

    expect(metrics[0]?.value).toBe('608,311')
    expect(metrics[3]?.value).toBe('788,500')
  })
})
