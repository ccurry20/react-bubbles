import React, { useState } from "react";
//import axios from "axios";
import { axiosWithAuth } from "../axiosWithAuth"; 

const initialColor = {
  color: "",
  code: { hex: "" }
};

//const ColorList = ({ colors, updateColors }) => 
const ColorList = (props) => {
  //console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  //const [newColors, setNewColors] = useState(props.colors)
  

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
    .put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
    .then(res=>{
      props.updateColors(props.colors.map(color => {
        if (color.id === colorToEdit.id) {
          return colorToEdit;
        } else
        return color;
      }));
     // updateColors(newColors)
        console.log(res)
        //colors.history.push(`/colors/${colorToEdit.id}`);
    })
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    // axios.delete(`http://localhost:5000/api/colors/${this.state.colors}`)
    // .then(res=> {
    //   this.props.history.push('/')
    // })
    axiosWithAuth()
      .delete(`http://localhost:5000/api/colors/${color.id}`)
      .then(res => {
        props.updateColors(props.colors.filter(data => data.id !== color.id))
        // const newColors = colors.filter(c => c.id !== color.id)
        // updateColors(newColors)
      })
      .catch(error => console.log(error))
  };


  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {props.colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={() => deleteColor(color)}>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button onClick={saveEdit} type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
            };

export default ColorList;
