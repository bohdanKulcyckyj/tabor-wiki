import { ReactNode } from 'react';
import PdaNavigation from './PdaNavigation';

const PdaDevice = ({ children }: { children: ReactNode }) => {
  return (
    <div className="pda-device">
      <>{children}</>
      <PdaNavigation />
    </div>
  );
};

export default PdaDevice;
