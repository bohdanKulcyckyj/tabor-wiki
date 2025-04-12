import { ReactNode } from 'react'

const PdaFullScreen = ({ children } : { children: ReactNode}) => {
  return (
    <div className="pda-full-screen">{children}</div>
  )
}

export default PdaFullScreen