import React from 'react'
import type { Metadata } from 'next'
import { ROUTES, ROUTE_METADATA } from '@/constants'
import { HomePage } from '@/features/HomePage'

export const metadata: Metadata = {
  title: ROUTE_METADATA[ROUTES.HOME].title,
  description: ROUTE_METADATA[ROUTES.HOME].description,
}

const HomePageWrapper = () => {
  return <HomePage />
}

export default HomePageWrapper