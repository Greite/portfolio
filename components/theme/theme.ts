import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'

import headingRecipe from './components/Heading'
import textRecipe from './components/Text'

const config = defineConfig({
  theme: {
    recipes: {
      heading: headingRecipe,
      text: textRecipe,
    },
    tokens: {
      fonts: {
        body: { value: `'Raleway', sans-serif` },
        heading: { value: `'Raleway', sans-serif` },
      },
      colors: {
        blackAlpha: {
          50: { value: 'rgba(0, 0, 0, 0.04)' },
          100: { value: 'rgba(0, 0, 0, 0.06)' },
          200: { value: 'rgba(0, 0, 0, 0.08)' },
          300: { value: 'rgba(0, 0, 0, 0.16)' },
          400: { value: 'rgba(0, 0, 0, 0.24)' },
          500: { value: 'rgba(0, 0, 0, 0.36)' },
          600: { value: 'rgba(0, 0, 0, 0.48)' },
          700: { value: 'rgba(0, 0, 0, 0.64)' },
          800: { value: 'rgba(0, 0, 0, 0.80)' },
          900: { value: 'rgba(0, 0, 0, 0.92)' },
        },
        whiteAlpha: {
          50: { value: 'rgba(255, 255, 255, 0.04)' },
          100: { value: 'rgba(255, 255, 255, 0.06)' },
          200: { value: 'rgba(255, 255, 255, 0.08)' },
          300: { value: 'rgba(255, 255, 255, 0.16)' },
          400: { value: 'rgba(255, 255, 255, 0.24)' },
          500: { value: 'rgba(255, 255, 255, 0.36)' },
          600: { value: 'rgba(255, 255, 255, 0.48)' },
          700: { value: 'rgba(255, 255, 255, 0.64)' },
          800: { value: 'rgba(255, 255, 255, 0.80)' },
          900: { value: 'rgba(255, 255, 255, 0.92)' },
        },
        brand: {
          50: { value: '#fefce8' },
          100: { value: '#fdf8c4' },
          200: { value: '#fcee8c' },
          300: { value: '#fae056' },
          400: { value: '#f6c919' },
          500: { value: '#e6b10c' },
          600: { value: '#c68908' },
          700: { value: '#9e610a' },
          800: { value: '#834d10' },
          900: { value: '#6f3f14' },
          950: { value: '#412007' },
        },
      },
    },
    semanticTokens: {
      colors: {
        brand: {
          solid: { value: '{colors.brand.500}' },
          contrast: { value: '{colors.brand.100}' },
          fg: { value: '{colors.brand.700}' },
          muted: { value: '{colors.brand.100}' },
          subtle: { value: '{colors.brand.200}' },
          emphasized: { value: '{colors.brand.300}' },
          focusRing: { value: '{colors.brand.500}' },
        },
      },
    },
  },
})

export const system = createSystem(defaultConfig, config)
