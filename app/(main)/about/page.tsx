import React from 'react'
import type { Metadata } from 'next'
import { ROUTES, ROUTE_METADATA } from '@/constants'
import { AboutPage } from '@/features/AboutPage'

export const metadata: Metadata = {
  title: ROUTE_METADATA[ROUTES.ABOUT].title,
  description: ROUTE_METADATA[ROUTES.ABOUT].description,
}

const AboutPageWrapper = () => {
  return <AboutPage />
}

export default AboutPageWrapper