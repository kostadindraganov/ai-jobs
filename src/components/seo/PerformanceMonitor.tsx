'use client'

import { useEffect } from 'react'

export function PerformanceMonitor() {
  useEffect(() => {
    // Web Vitals monitoring
    if (typeof window !== 'undefined' && 'performance' in window) {
      // Monitor Core Web Vitals
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'largest-contentful-paint') {
            console.log('LCP:', entry.startTime)
          } else if (entry.entryType === 'first-input') {
            const fidEntry = entry as PerformanceEventTiming
            console.log('FID:', fidEntry.processingStart - fidEntry.startTime)
          } else if (entry.entryType === 'layout-shift') {
            const clsEntry = entry as PerformanceEntry & { value: number }
            console.log('CLS:', clsEntry.value)
          }
        }
      })

      try {
        observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] })
      } catch {
        // Performance Observer not supported
      }

      // Monitor page load time
      window.addEventListener('load', () => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
        if (navigation) {
          console.log('Page Load Time:', navigation.loadEventEnd - navigation.loadEventStart)
          console.log('DOM Content Loaded:', navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart)
        }
      })
    }
  }, [])

  return null
}
