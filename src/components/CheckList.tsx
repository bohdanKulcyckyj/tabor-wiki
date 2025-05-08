import { useObservable } from '@legendapp/state/react';
import { z } from 'zod';

type CheckListProps = {
  data: string[];
  uniqueId: string;
};

type TaskObjective = {
  label: string;
  checked: boolean;
};

const toStorageKey = (uniqueId: string) => {
  const key = `${uniqueId}-objectives`;
  return key;
}

const getCheckedObjectivesFromLocalStorage = (key: string): string[] => {
  try {
    const objectivesOutput = localStorage.getItem(key);
    if (objectivesOutput) {
      const parsedObjectives = z
        .array(z.string())
        .parse(JSON.parse(objectivesOutput));
      return parsedObjectives;
    }
  } catch (e: unknown) {
    console.error(e);
  }

  return [];
};

const CheckList = ({ data, uniqueId }: CheckListProps) => {
  const objectives$ = useObservable((): TaskObjective[] => {
    const checkedObjectives = getCheckedObjectivesFromLocalStorage(uniqueId);
    return data.map((label) => {
      return {
        label,
        checked: checkedObjectives.includes(label),
      };
    });
  });

  const handleToggleObjective = (obj: TaskObjective) => {
    const checkedObjectives = getCheckedObjectivesFromLocalStorage(toStorageKey(uniqueId));
    if (checkedObjectives.includes(obj.label)) {
      const newCheckedObjectives = checkedObjectives.filter(
        (label) => label !== obj.label,
      );
      localStorage.setItem(toStorageKey(uniqueId), JSON.stringify(newCheckedObjectives));
    } else {
      const newCheckedObjectives = [...checkedObjectives, obj.label];
      localStorage.setItem(toStorageKey(uniqueId), JSON.stringify(newCheckedObjectives));
    }

    objectives$.set((prev) => {
      const newObjectives = prev.map((objective) => {
        if (objective.label === obj.label) {
          return { ...objective, checked: obj.checked };
        }
        return objective;
      });
      return newObjectives;
    });
  };

  return (
    <ul className="checklist">
      {objectives$.get().map(({ label, checked }, index) => (
        <li key={index} className="checklist__item">
          <input
            id={index + label}
            type="checkbox"
            defaultChecked={checked}
            onClick={() => handleToggleObjective({ label, checked })}
          />
          <label htmlFor={index + label}>{label}</label>
        </li>
      ))}
    </ul>
  );
};

export default CheckList;
