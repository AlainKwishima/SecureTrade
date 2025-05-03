"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [displayChildren, setDisplayChildren] = useState(children)

  useEffect(() => {
    if (pathname) {
      setIsTransitioning(true)
      const timeout = setTimeout(() => {
        setDisplayChildren(children)
        setIsTransitioning(false)
      }, 300)
      return () => clearTimeout(timeout)
    }
  }, [pathname, children])

  return (
    <div
      className={`transition-all duration-300 ${
        isTransitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
      }`}
    >
      {displayChildren}
    </div>
  )
}
