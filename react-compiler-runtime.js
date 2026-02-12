// Polyfill for react/compiler-runtime
// This is needed for Sanity's compiled code
module.exports = {
  c: (fn) => fn, // useMemoCache polyfill
}
