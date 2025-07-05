import { Container } from '@/components/Container'
import { Divider } from '@/components/Divider'
import { ROUTES, ROUTE_NAMES } from '@/constants'
import { Typography } from '@/components/Typography'
import { AnimatedContainer } from '@/components/AnimatedContainer'
import Link from 'next/link'
import React from 'react'

const MainLayoutHeader = () => {
  return (
    <AnimatedContainer direction="down" duration={0.5} delay={0.1}>
      <div>
          <Container className='flex flex-col py-4 gap-3 items-center'>
          <Divider size="sm" color="default" />
          <div className='flex items-center justify-between w-full gap-4 px-2'>
              <nav className='flex items-center gap-4 px-2 py-1 rounded-full bg-zinc-800 border border-zinc-700 shadow shadow-zinc-800'>
                <Link href={ROUTES.HOME} className='px-4 py-1.5 rounded-full'>
                  <Typography variant="body-sm" weight="medium">
                    {ROUTE_NAMES.HOME}
                  </Typography>
                </Link>
                <Link href={ROUTES.TITLES} className='px-4 py-1.5 rounded-full'>
                  <Typography variant="body-sm" weight="medium">
                    {ROUTE_NAMES.TITLES}
                  </Typography>
                </Link>
                <Link href={ROUTES.ABOUT} className='px-4 py-2 rounded-full'>
                  <Typography variant="body-sm" weight="medium">
                    {ROUTE_NAMES.ABOUT}
                  </Typography>
                </Link>
              </nav>
            <div>
              <Link href={ROUTES.HOME} className='flex px-6 py-[12px] rounded-full bg-zinc-800 border border-zinc-700 shadow shadow-zinc-800'>
                <Typography variant="body-sm" weight="medium">
                  Mimiru
                </Typography>
              </Link>
            </div>
          </div>
          <Divider size="sm" color="default" />
        </Container>
      </div>
    </AnimatedContainer>
  )
}

export { MainLayoutHeader }