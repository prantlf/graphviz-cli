# Microbenchmarks

Compare graph generation implementations. Either executing a new process, or calling a WASM assembly.

```
$ pnpm i
$ npm test

generate-svg:
  exec x 5.52 ops/sec ±2.41% (31 runs sampled)
  wasm x 446 ops/sec ±105.65% (81 runs sampled)
  fastest is wasm
generate-png:
  exec x 5.14 ops/sec ±2.97% (29 runs sampled)
  wasm x 78.54 ops/sec ±54.24% (78 runs sampled)
  fastest is wasm
```
