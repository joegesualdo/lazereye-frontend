import React from 'react'

interface SectionHeaderProps {
  emoji: string
  title: string
}
const SectionHeader: React.FC<SectionHeaderProps> = ({ title, emoji }) => (
  <div
    style={{
      marginBottom: 20,
      width: '100%',
      backgroundColor: '#2C2D30',
      fontFamily:
        "'SF Pro Text',-apple-system,BlinkMacSystemFont,Roboto,'Segoe UI',Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol'",
    }}
  >
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div style={{ height: 1, flexGrow: 1, backgroundColor: '#FF2D55' }}></div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          paddingRight: 5,
          paddingLeft: 5,
          gap: 5,
        }}
      >
        <div>{emoji}</div>
        <div
          style={{
            color: '#ABABAC',
            textTransform: 'uppercase',
            fontWeight: 'bold',
          }}
        >
          {title}
        </div>
      </div>
      <div style={{ height: 1, flexGrow: 1, backgroundColor: '#FF2D55' }}></div>
    </div>
  </div>
)

export default SectionHeader
