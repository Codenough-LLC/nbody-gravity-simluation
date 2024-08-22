import fs from 'fs'
import typescript from '@rollup/plugin-typescript'

const packageJson = JSON.parse(fs.readFileSync('./package.json'))

export default {
  input: 'src/index.ts',
  output: [
    {
      file: packageJson.main,
      format: 'cjs',
      sourcemap: true
    },
    {
      file: packageJson.module,
      format: 'esm',
      sourcemap: true
    }
  ],
  plugins: [
    typescript()
  ]
}
