# Microbenchmarks

Compare graph generation implementations. Either executing a new process, or calling a WASM assembly.

```
$ pnpm i
$ npm test

generate-svg:
  exec x 3.15 ops/sec ±1.50% (20 runs sampled)
  wasm x 454 ops/sec ±94.21% (82 runs sampled)
  fastest is wasm
generate-png:
  exec x 2.91 ops/sec ±2.64% (19 runs sampled)
  wasm x 78.14 ops/sec ±81.49% (76 runs sampled)
  fastest is wasm
```
