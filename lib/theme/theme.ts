import { extendTheme } from '@chakra-ui/react'
import { Raleway } from 'next/font/google'

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
  },
}

export default extendTheme(theme)
