import { FaEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";

const List = ({ shopping, handleRemove,handleEdit }) => {
  // console.log(shopping);
  return (
    <div >
      {shopping.map((item) => {
        const { title, id } = item;
        return (
          <div key={id} className="content">
            <p>{title}</p>
            <div className="btnDiv">
            <button  className="edit" type="button" onClick={()=>handleEdit(id)}>
              <FaEdit />
            </button>
            <button className="delete" type="button" onClick={()=>handleRemove(id)}>
              <FaTrashAlt />
            </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default List;
