import React from 'react'
import type { Story } from '@ladle/react'
import Card from '.'

interface CardStoryProps {
  isGlowing: boolean
}

export const CardStory: Story<CardStoryProps> = ({
  isGlowing,
}: CardStoryProps) => (
  <Card isGlowing={isGlowing} renderContent={() => <div>content</div>} />
)
CardStory.args = {
  isGlowing: true,
}
