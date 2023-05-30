import ReactModal from "react-modal";
import { useContext } from "react";
import swal from "sweetalert";

import apiProduct from "../../../api/apiProduct";
import { store } from "../../../context/ContextProvider";


function ModalDelete({id,modalIsOpen,setIsOpen,name}) {

  const userContext = useContext(store)
  const { dispatch } = userContext;

  const customStyles = {
    overlay: {
      background: "rgb(43 43 49 / 70%)"
    },
    content: {
      top: '50%',
      left: '60%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      background: "#28282d",
      border: "none",
      padding: "none"
    },
  };

  const handleDelete = (ev, id) => {
    console.log(id);
    ev.preventDefault();
    apiProduct.delete(id).then(res => {
      if (res.status == 200) {
        setIsOpen(false)
        swal("Delete successfully!", "You clicked the button!", "success");
        dispatch("set_reload_product")
      }
    }).catch(error=>{
      swal("Delete faild!", "You clicked the button!", "success");
      console.log(error);
    })
  }
    return ( 
        <ReactModal isOpen={modalIsOpen}
        onRequestClose={e => setIsOpen(false)}
        ariaHideApp={false}
        style={customStyles}
        contentLabel="Modal"  >
        <div id="modal-delete" className="zoom-anim-dialog modal m-0"  >
          <h6 className="modal__title">Prodcut delete</h6>
          <p className="modal__text">
            Are you sure to permanently delete this product<br />
            {name} ?
          </p>
          <div className="modal__btns">
            <button className="modal__btn modal__btn--apply" type="button" onClick={(e) => handleDelete(e, id)}>
              Delete
            </button>
            <button className="modal__btn modal__btn--dismiss" type="button" onClick={() => setIsOpen(false)}>
              Dismiss
            </button>
          </div>
        </div>
      </ReactModal>
     );
}

export default ModalDelete;