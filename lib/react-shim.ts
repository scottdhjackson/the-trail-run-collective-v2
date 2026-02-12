// Shim for useEffectEvent which Sanity uses
import { useCallback, useRef, useLayoutEffect } from 'react'

declare module 'react' {
  function useEffectEvent<T extends Function>(fn: T): T
}

// @ts-ignore
if (typeof React !== 'undefined' && !React.useEffectEvent) {
  // @ts-ignore
  React.useEffectEvent = function useEffectEvent(fn: any) {
    const ref = useRef(fn)
    useLayoutEffect(() => {
      ref.current = fn
    })
    return useCallback((...args: any[]) => ref.current(...args), [])
  }
}
