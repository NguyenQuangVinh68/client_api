import ReactModal from "react-modal";
import { useState, useEffect } from "react";
import apiProduct from "../../../api/apiProduct";
import apiCategory from "../../../api/apiCategory";
import swal from "sweetalert";

function ModalEdit({ id, modalIsOpen, setIsOpen }) {


    const customStyles = {
        overlay: {
            background: "rgb(43 43 49 / 90%)"
        },
        content: {
            width: "50%",
            height: "auto",
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

    const [categories, setCategories] = useState([])

    const [inputForm, setInputForm] = useState({
        id:"",
        name: "",
        category_Id: 1,
        origin: "",
        quantity: "",
        status: 1,
        price: ""
    });



    useEffect(() => {
        (async () => {
            try {
                const { data } = await apiCategory.getAll()
                console.log(data);
                setCategories(data)
                setInputForm({ ...inputForm, category: data[0].id })
            } catch (error) {
                console.log(error);
            }
        })();
    }, [])

    useEffect(() => {
        (async () => {
            try {
                const { data } = await apiProduct.getById(id)
                console.log(data);
                setInputForm({ ...inputForm, ...data })
            } catch (error) {
                console.log(error);
            }
        })();
    }, [])

    const handleInput = (e) => {
        console.log(e.target.value);
        setInputForm({ ...inputForm, [e.target.name]: e.target.value })
    }

    const handleSubmit = (ev) => {
        const data = {
            id: inputForm.id,
            name: inputForm.name,
            category_Id: inputForm.category,
            origin: inputForm.origin,
            quantity: inputForm.quantity,
            status: inputForm.status,
            price: inputForm.price
        };
        ev.preventDefault();
        (async () =>{
            await apiProduct.update(data).then(res =>{
                if(res.status == 200){
                    swal("Update successfully!","You clicked the button!", "success")
                }
                console.log(res.data);
            }).catch(error =>{
                swal("Update faild","You clicked the button!", "error")
                console.log(error);
            })
        })()
    }


    return (
        <ReactModal isOpen={modalIsOpen}
            onRequestClose={e => setIsOpen(false)}
            ariaHideApp={false}
            style={customStyles}
            contentLabel="Modal" >
            <form onSubmit={handleSubmit} className="profile__form">
                <div className="p-2">
                    <h4 className="profile__title text-center">Form Edit Product</h4>
                    <div className="row">
                        <input type="hidden" value={inputForm.id} />
                        <div className="col-6">
                            <div className="profile__group">
                                <label className="profile__label">Name</label>
                                <input name="name" onChange={handleInput} className="profile__input" placeholder="Enter your name product" value={inputForm.name} ></input>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="profile__group">
                                <label className="profile__label">Price</label>
                                <input name="price" onChange={handleInput} className="profile__input" placeholder="Enter your price" value={inputForm.price} ></input>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="profile__group">
                                <label className="profile__label">Origin</label>
                                <input name="origin" onChange={handleInput} className="profile__input" placeholder="Enter your origin" value={inputForm.origin} ></input>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="profile__group">
                                <label className="profile__label">Quantity</label>
                                <input name="quantity" onChange={handleInput} className="profile__input" placeholder="Enter your quantity" value={inputForm.quantity} ></input>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="profile__group">
                                <label className="profile__label">Status</label>
                                <select name="status" value={inputForm.status} onChange={handleInput} className="form-select" aria-label="Default select example" >
                                    <option value="1" selected>Show</option>
                                    <option value="0">Hide</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="profile__group">
                                <label className="profile__label">Category</label>
                                <select name="category_Id" onChange={handleInput} value={inputForm.category} className="form-select" aria-label="Default select example">
                                    {categories.map(items => {
                                    return <option value={items.id} key={items.id} selected={items.id === inputForm.category_Id} >{items.name}</option>
                                })}
                                </select>
                            </div>

                        </div>
                        <div className="col-12">
                            <div className="d-flex justify-content-center mt-5">
                                <button className="btn btn-primary w-100" type="submit">Update</button>
                                <button className="btn btn-secondary w-100" type="button" onClick={e => setIsOpen(false)} >Back</button>
                            </div>
                        </div>
                    </div>

                </div>
            </form>
        </ReactModal>
    );
}

export default ModalEdit;