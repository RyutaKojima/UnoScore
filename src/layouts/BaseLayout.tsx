import React from 'react'
import Head from 'next/head'
import { AppHeader } from '../components/AppHeader'
import { AppFooter } from '../components/AppFooter'
import clsx from 'clsx'

type Props = {
  title?: string
  className?: string
  containerClass?: string
}

export const BaseLayout: React.FC<Props> = ({
  title = 'UNO Score',
  className,
  containerClass,
  children,
}) => {
  return (
    <div className={clsx('min-h-screen flex flex-col', containerClass)}>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppHeader />

      <main className={clsx('flex-1', className)}>{children}</main>

      <AppFooter />
    </div>
  )
}
