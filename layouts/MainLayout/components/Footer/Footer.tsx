import React from 'react'
import { Typography } from '@/components/Typography'
import { Container } from '@/components/Container'
import { Divider } from '@/components/Divider'
import { AnimatedContainer } from '@/components/AnimatedContainer'

const MainLayoutFooter = () => {
  return (
    <AnimatedContainer direction="up" duration={0.5} delay={0.2}>
      <footer className="mt-auto">
        <Container className='flex flex-col py-4 gap-3 items-center'>
          <Divider size="sm" color="default" />
          <Typography variant="body-sm" weight="normal">
            © 2025 Mimiru.
          </Typography>
        </Container>
      </footer>
    </AnimatedContainer>
  )
}

export { MainLayoutFooter as Footer }
