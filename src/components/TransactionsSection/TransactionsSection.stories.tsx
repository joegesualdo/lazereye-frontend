import React from 'react'
import type { Story } from '@ladle/react'
import TransactionsSection from '.'

interface TransactionsSectionStoryProps {
  transactions: number
  tps30Day: number
}
export const TransactionsSectionStory: Story<TransactionsSectionStoryProps> = ({
  transactions,
  tps30Day,
}: TransactionsSectionStoryProps) => (
  <TransactionsSection transactions={transactions} tps30Day={tps30Day} />
)
TransactionsSectionStory.storyName = 'TransactionsSection'
TransactionsSectionStory.args = {
  transactions: 7000000,
  tps30Day: 3,
}

export default {
  title: 'TransactionsSection',
}
