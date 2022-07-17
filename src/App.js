import { useState,useEffect,useRef } from "react";
import List from "./components/List";
import "./App.css"

const getLocalStorage = ()=>{
  let list = localStorage.getItem("shopping")
  if(list){
    return JSON.parse(localStorage.getItem("shopping"))
  }else{
    return []
  }
}

const App = () => {
  const refContainer=useRef(null)

const [isEditting,setIsEditting]=useState(false);
const [shopping,setShopping]=useState(getLocalStorage())
const [editID,setEditID]=useState(null)
const [msg,setMsg]=useState({message:"",bcg:false})


const handleSubmit = (e)=>{
  e.preventDefault()
  const newItem={id:new Date().getTime(), title:refContainer.current.value}
  if(!newItem.title){
    alert("Please fill in the blanks")
  }else if(newItem.title && isEditting){
  setShopping(
    shopping.map((item)=>{
      if(item.id==editID){
        return {...item,title:refContainer.current.value}
      }
      return item
    })
  )
  setIsEditting(false)
  setMsg({message:"Item Editted",bcg:true})
  }
  else{
   setShopping([newItem,...shopping])
   setMsg({message:"New Item Added",bcg:true})
  }
  refContainer.current.value=""
  setIsEditting(false)
}
// console.log(refContainer.current.value);
// console.log(shopping);

const handleClear = () =>{
  setShopping([])
  setMsg({message:"All Items Removed",bcg:false})
}
const handleRemove = (id)=>{
  setShopping(shopping.filter((item)=>item.id!=id))
  setMsg({message:"Item Removed",bcg:false})
}
const handleEdit = (id)=>{
const oldItem=shopping.find((item)=>item.id===id);
refContainer.current.value=oldItem.title
// setShopping([refContainer.current.value,...shopping])
setIsEditting(true)
const newList= shopping.toString().replace()
setEditID(oldItem.id)
console.log(oldItem.title);
console.log(refContainer.current.value);
}
useEffect(() => {
    localStorage.setItem("shopping",JSON.stringify(shopping))
}, [shopping])

useEffect(() => {
  const timeout = setTimeout(() => {
    setMsg("")
  }, 2000);
  return () => clearTimeout(timeout);
}, [msg]);

  return (
    <div className="main-container">
      <p className={msg.bcg ? "greenBcg" : "pinkBcg"}>{msg.message}</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="grocery">Shopping List</label> <br />
        <input 
        type="text"
        id="grocery" 
        name="grocery"
        placeholder="e.g. laptop" 
        ref={refContainer}
        // value={text}
        // onChange={(e)=>setText(e.target.value)}
        />
        <button type="submit">{!isEditting ? "Submit" : "Edit"}  </button>
      </form>
      {shopping.length>0 &&
       (<main>
       <List shopping={shopping} handleRemove={handleRemove} handleEdit={handleEdit}/>
       <div className="clrDiv">
        <button  className="clearBtn" onClick={handleClear}>CLEAR ALL</button>
       </div>
     </main>)
      }
    </div>
  );
};

export default App;
