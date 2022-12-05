import React from 'react'
import './PlannerItem.css'

function PlannerItem(props) {
  return (props.trigger) ? (
    <div className="planner-item">
        <div className="planner-item-inner">
            <button className="close-icon" onClick={() => props.setTrigger(false)}><i class="lni lni-close"></i></button>
            {props.children}
        </div>
    </div>
  ):"";
}

export default PlannerItem