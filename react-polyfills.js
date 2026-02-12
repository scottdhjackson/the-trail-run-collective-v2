// Polyfill for useEffectEvent which Sanity uses but isn't in stable React yet
if (typeof window !== 'undefined') {
  const React = require('react');
  if (!React.useEffectEvent) {
    React.useEffectEvent = function useEffectEvent(fn) {
      const ref = React.useRef(fn);
      React.useLayoutEffect(() => {
        ref.current = fn;
      });
      return React.useCallback((...args) => ref.current(...args), []);
    };
  }
}
