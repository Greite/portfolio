import { extendTheme } from '@chakra-ui/react'
import { Raleway } from 'next/font/google'

import components from './components'

const raleway = Raleway({ subsets: ['latin'], display: 'swap' })

const theme = {
  fonts: {
    body: raleway.style.fontFamily,
    heading: raleway.style.fontFamily,
  },
  colors: {
    blackAlpha: {
      '50': 'rgba(0, 0, 0, 0.04)',
      '100': 'rgba(0, 0, 0, 0.06)',
      '200': 'rgba(0, 0, 0, 0.08)',
      '300': 'rgba(0, 0, 0, 0.16)',
      '400': 'rgba(0, 0, 0, 0.24)',
      '500': 'rgba(0, 0, 0, 0.36)',
      '600': 'rgba(0, 0, 0, 0.48)',
      '700': 'rgba(0, 0, 0, 0.64)',
      '800': 'rgba(0, 0, 0, 0.80)',
      '900': 'rgba(0, 0, 0, 0.92)',
    },
    whiteAlpha: {
      '50': 'rgba(255, 255, 255, 0.04)',
      '100': 'rgba(255, 255, 255, 0.06)',
      '200': 'rgba(255, 255, 255, 0.08)',
      '300': 'rgba(255, 255, 255, 0.16)',
      '400': 'rgba(255, 255, 255, 0.24)',
      '500': 'rgba(255, 255, 255, 0.36)',
      '600': 'rgba(255, 255, 255, 0.48)',
      '700': 'rgba(255, 255, 255, 0.64)',
      '800': 'rgba(255, 255, 255, 0.80)',
      '900': 'rgba(255, 255, 255, 0.92)',
    },
    energyYellow: {
      '50': '#fefce8',
      '100': '#fdf8c4',
      '200': '#fcee8c',
      '300': '#fae056',
      '400': '#f6c919',
      '500': '#e6b10c',
      '600': '#c68908',
      '700': '#9e610a',
      '800': '#834d10',
      '900': '#6f3f14',
      '950': '#412007',
    },
  },
  components,
}

export default extendTheme(theme)
