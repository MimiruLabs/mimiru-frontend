import React from 'react'
import type { Metadata } from 'next'
import { ROUTES, ROUTE_METADATA } from '@/constants'
import { TitlesPage } from '@/features/TitlesPage'

export const metadata: Metadata = {
  title: ROUTE_METADATA[ROUTES.TITLES].title,
  description: ROUTE_METADATA[ROUTES.TITLES].description,
}

const TitlesPageWrapper = () => {
  return <TitlesPage />
}

export default TitlesPageWrapper