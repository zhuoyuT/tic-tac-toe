import { useState } from "react";

export default function Player({name: initalName, symbol, isActive, onChangeName }){

    const [name,setName] = useState(initalName);
    const [isEditing, setIsEditing] = useState(false);

    function handleEditClick(){
        setIsEditing((editing) => !editing);

        if(isEditing){
            onChangeName(symbol,name);
        }
    }
    function handleNameChange(event){
        setName(event.target.value)
    }

    let playerName = <span className="player-symbol">{name}</span>;
    let btnCaption = "Edit"
    if (isEditing){
        playerName = <input type="text" required value={name} onChange={handleNameChange}/>;
        btnCaption = "Save";
    }
    else{
        playerName = <span className="player-symbol">{name}</span>;
        btnCaption = "Edit"
    }
    return (    
    <li className={isActive ? "active": undefined}>
        <span className="player">
          {playerName}
          <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={handleEditClick}>{btnCaption}</button>
    </li>)
}