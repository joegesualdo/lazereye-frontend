import React from 'react'
import type { Story } from '@ladle/react'
import SectionHeader from '.'

interface SectionHeaderStoryProps {
  title: string
}

export const SectionHeaderStory: Story<SectionHeaderStoryProps> = ({
  title,
}: SectionHeaderStoryProps) => <SectionHeader title={title} />
SectionHeaderStory.args = {
  title: 'Market Data',
}
