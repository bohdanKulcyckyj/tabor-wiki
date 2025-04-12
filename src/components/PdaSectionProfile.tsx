import PdaSectionBase from './PdaSection';

const PdaSectionProfile = () => {
  return (
    <PdaSectionBase title="Subjekt: bio" className="pda-section-profile">
      <div>
        <div>
          <ul>
            <li>
              <p>Jméno/Příjmení:</p>
              <p>Chlap Obecny</p>
            </li>
            <li>
              <p>Přezdívka:</p>
              <p>Radim</p>
            </li>
            <li>
              <p>Zastoupení ve frakci:</p>
              <p>Kult Obelisku</p>
            </li>
            <li>
              <p>Působnost v Sektoru:</p>
              <p>Neznámá</p>
            </li>
            <li>
              <p>Arzenál:</p>
              <p>AK-47</p>
            </li>
          </ul>
        </div>
      </div>
    </PdaSectionBase>
  );
};

export default PdaSectionProfile;
