import React, {SFC, ChangeEvent} from 'react'

import {CHANGES, RELATIVE_OPERATORS, SHIFTS} from 'src/kapacitor/constants'
import Dropdown from 'src/shared/components/Dropdown'

import {AlertRule} from 'src/types'

const mapToItems = (arr: string[], type: string) =>
  arr.map(text => ({text, type}))
const changes = mapToItems(CHANGES, 'change')
const shifts = mapToItems(SHIFTS, 'shift')
const operators = mapToItems(RELATIVE_OPERATORS, 'operator')

interface TypeItem {
  type: string
  text: string
}
interface Props {
  onRuleTypeInputChange: (e: ChangeEvent<HTMLInputElement>) => void
  onDropdownChange: (item: TypeItem) => void
  rule: AlertRule
}

const Relative: SFC<Props> = ({
  onRuleTypeInputChange,
  onDropdownChange,
  rule: {
    values: {change, shift, operator, value},
  },
}) => (
  <div className="rule-section--row rule-section--row-first rule-section--border-bottom">
    <p>Send Alert when</p>
    <Dropdown
      className="dropdown-110"
      menuClass="dropdown-malachite"
      items={changes}
      selected={change}
      onChoose={onDropdownChange}
    />
    <p>compared to previous</p>
    <Dropdown
      className="dropdown-80"
      menuClass="dropdown-malachite"
      items={shifts}
      selected={shift}
      onChoose={onDropdownChange}
    />
    <p>is</p>
    <Dropdown
      className="dropdown-160"
      menuClass="dropdown-malachite"
      items={operators}
      selected={operator}
      onChoose={onDropdownChange}
    />
    <form style={{display: 'flex'}}>
      <input
        className="form-control input-sm form-malachite monotype"
        style={{width: '160px', marginLeft: '6px'}}
        type="text"
        name="lower"
        spellCheck={false}
        value={value}
        onChange={onRuleTypeInputChange}
        required={true}
      />
    </form>
    {change === CHANGES[1] ? <p>%</p> : null}
  </div>
)

export default Relative
