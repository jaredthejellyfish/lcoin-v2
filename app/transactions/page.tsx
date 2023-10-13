import TransactionSearch from '@/components/transaction-search'
import { ArrowRightIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const TransactionsPage = () => {
  return (
    <main className='p-3'>
        <Link href="/">
            <ArrowRightIcon className="mb-2 rotate-180" />
            <span className='sr-only'>Return</span>
        </Link>
        <h1 className='mb-3 text-3xl font-semibold'>Transactions</h1>
        <TransactionSearch />
    </main>
  )
}

export default TransactionsPage