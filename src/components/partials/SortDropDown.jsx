import React from 'react'

const SortDropDown = ({title,options,func}) => {
  return (
    <div className="select ml-5">
        <select name="format" 
        onChange={func}
        id="format" defaultValue="0">
            <option value="0" disabled>
                {title}
            </option>
            {options.map((item,i)=>(
                <option key={i} value={item}>
                    {item.toUpperCase()}
                </option>
            ))}
        </select>
    </div>
  )
}

export default SortDropDown