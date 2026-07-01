import { useEffect, useRef } from 'react'
import { gsap } from '#/lib/gsap-client'

export function AnimatedNumber({ value }: { value: string }) {
  // Try to parse the value, ignoring non-numeric characters like commas
  const numValue = parseFloat(value.replace(/,/g, ''))
  const isNumber = !isNaN(numValue)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!isNumber || !ref.current) return

    const el = ref.current
    const target = { val: 0 }

    const anim = gsap.to(target, {
      val: numValue,
      duration: 2,
      ease: 'power2.out',
      onUpdate: () => {
        el.innerText = Math.round(target.val).toLocaleString('en-US')
      }
    })

    return () => {
      anim.kill()
    }
  }, [isNumber, numValue])

  if (!isNumber) {
    return <span>{value}</span>
  }

  return <span ref={ref}>0</span>
}
