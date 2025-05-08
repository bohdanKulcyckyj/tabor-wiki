import { use$ } from "@legendapp/state/react"
import { z } from "zod"

type CheckListProps = {
    data: string[],
    uniqueId: string
}

type TaskObjective = {
  label: string
  checked: boolean
}

const getCheckedObjectivesFromLocalStorage = (uniqueId: string): string[] => {
  try {
    const objectivesOutput = localStorage.getItem(uniqueId)
    if (objectivesOutput) {
      const parsedObjectives = z.array(z.string()).parse(JSON.parse(objectivesOutput))
      return parsedObjectives
    }
  } catch (e: unknown) {
    console.error(e)
  }

  return []
}

const CheckList = ({ data, uniqueId }: CheckListProps) => {
  const handleToggleObjective = (obj: TaskObjective) => {
      const checkedObjectives = getCheckedObjectivesFromLocalStorage(uniqueId)
      if(checkedObjectives.includes(obj.label)) {
        const newCheckedObjectives = checkedObjectives.filter((label) => label !== obj.label)
        localStorage.setItem(uniqueId, JSON.stringify(newCheckedObjectives))
      } else {
        const newCheckedObjectives = [...checkedObjectives, obj.label]
        localStorage.setItem(uniqueId, JSON.stringify(newCheckedObjectives))
      }
  }

  const objectives$ = use$((): TaskObjective[] => {
    const checkedObjectives = getCheckedObjectivesFromLocalStorage(uniqueId)
    return data.map((label) => {
      return {
        label,
        checked: checkedObjectives.includes(label),
      }
    }
  )})

  return (
    <ul className="checklist">  
        {objectives$.map(({ label, checked }, index) => (
            <li key={index} className="checklist__item">
                <input id={index + label} type="checkbox" defaultChecked={checked} onClick={() => handleToggleObjective({label, checked})} />
                <label htmlFor={index + label} onClick={() => handleToggleObjective({label, checked})}>{label}</label>
            </li>
        ))}
    </ul>
  )
}

export default CheckList