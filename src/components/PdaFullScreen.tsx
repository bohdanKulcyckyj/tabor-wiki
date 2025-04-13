import { ReactNode } from 'react'

const PdaFullScreen = ({ children } : { children: ReactNode}) => {
  return (
    <div className="pda-fullscreen">{children}</div>
  )
}

export default PdaFullScreen