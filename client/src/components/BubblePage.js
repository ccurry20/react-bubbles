import React, {useState, useEffect} from "react";
import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import { axiosWithAuth } from "../axiosWithAuth";



const BubblePage = (props) => {
  console.log(props)
  const [colorList, setColorList] = useState([]);
  useEffect(()=>{
    axiosWithAuth()
    .get('/api/colors')
    .then(res=>{
      setColorList(res.data)
    })
  },[setColorList])
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
  return (
    <>
      <ColorList history={props.history} colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

  

export default BubblePage;
