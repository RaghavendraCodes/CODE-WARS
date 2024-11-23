import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // Extensions that Vite will attempt to resolve in order
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    // Provide alias configuration to resolve specific paths
    alias: {
      // Alias for "codemirror" package
      codemirror: 'codemirror/lib/codemirror.js',
    },
  },
})
