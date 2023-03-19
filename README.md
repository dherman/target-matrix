# GitHub Action to Define a Cross-Compilation Target Matrix

This action defines a matrix of _OS x target_ values that can be used to drive cross-compilation build jobs for any number of runners in different build OSes performing cross-compilation for different target OSes.

<!-- action-docs-inputs -->
## Inputs

| parameter | description | required | default |
| --- | --- | --- | --- |
| toolchain | Compiler toolchain defining the vocabulary of targets. Valid values: rust | `true` |  |
| windows-latest | Space-separated list of targets to be built in Windows jobs. | `false` |  |
| macos-latest | Space-separated list of targets to be built in macOS jobs. | `false` |  |
| ubuntu-latest | Space-separated list of targets to be built in Ubuntu jobs. | `false` |  |
<!-- action-docs-inputs -->

<!-- action-docs-outputs -->
## Outputs

| parameter | description |
| --- | --- |
| include | An array of (OS x target) pairs that can be added to a matrix with `strategy.matrix.include`. |
<!-- action-docs-outputs -->

<!-- action-docs-runs -->
## Runs

This action is a `node16` action.
<!-- action-docs-runs -->

## Usage

See [action.yml](action.yml).

Example:

```yaml
jobs:
  matrix:
    runs-on: ubuntu-latest
    outputs:
      include: ${{ steps.define.outputs.include }}
    steps:
      - name: Define Cross-Compilation Target Matrix
        id: define
        uses: dherman/target-matrix@v1
        with:
          toolchain: rust
          windows-latest: x86_64-pc-windows-msvc
          macos-latest: x86_64-apple-darwin
          ubuntu-latest: x86_64-unknown-linux-gnu x86_64-unknown-freebsd x86_64-unknown-openbsd

  build:
    needs: matrix
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        include: ${{ needs.matrix.outputs.include }}
    steps:
      - name: Show Target
        # Actual build command would go here
        run: echo "${{ matrix.target }}"
```

## License

This project is released under the [MIT License](LICENSE).
