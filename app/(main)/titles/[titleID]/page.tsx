import React from 'react'
import type { Metadata } from 'next'
import { TitleDetailPage } from '@/features/TitleDetailPage'

type Props = {
  params: { titleID: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { titleID } = await params
  return {
    title: `Title ${titleID} - Mimiru`,
    description: `Details for title ${titleID}`,
  }
}

const TitleDetailPageWrapper = async ({ params }: Props) => {
  const { titleID } = await params
  return <TitleDetailPage titleID={titleID} />
}

export default TitleDetailPageWrapper