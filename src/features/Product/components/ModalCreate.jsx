import { useEffect, useState, useContext } from "react";
import swal from "sweetalert";
import ReactModal from "react-modal";

import apiCategory from "../../../api/apiCategory";
import apiProduct from "../../../api/apiProduct";
import { store } from "../../../context/ContextProvider";

function FormAddProduct({ setIsOpen, modalIsOpen }) {

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
    const userContext = useContext(store)
    const { dispatch } = userContext;

    const [inputForm, setInputForm] = useState({
        name: "",
        category: 1,
        origin: "",
        quantity: "",
        status: "1",
        price: ""
    });

    const [categories, setCategories] = useState([])

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


    const handleInput = (e) => {
        console.log(e.target.value);
        setInputForm({ ...inputForm, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputForm);
        const data = {
            name: inputForm.name,
            category_Id: inputForm.category,
            origin: inputForm.origin,
            quantity: inputForm.quantity,
            status: inputForm.status,
            price: inputForm.price
        };

        (async () => {
            try {
                await apiProduct.create(data).then(res => {
                    if (res.status === 200) {
                        swal("Create successfully!", "You clicked the button!", "success")
                        setIsOpen(false)
                        setInputForm({name:"", category:"1",origin:"",price:"",quantity:"",status:"1"})
                        // dispatch("set_reload_product")
                    } else {
                        swal("Create faild!", "You clicked the button!", "error")
                        console.log(res);
                    }
                })
            } catch (error) {
                console.log(error);
            }
        })()

    }

    return (
        <>
            <ReactModal
                isOpen={modalIsOpen}
                onRequestClose={e => setIsOpen(false)}
                ariaHideApp={false}
                style={customStyles}
                contentLabel="Modal"
            >
                <form onSubmit={handleSubmit} className="profile__form">
                    <div className="p-5">
                        <h4 className="profile__title text-center">Form Add Product</h4>
                        <div className="row">
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
                                    {inputForm.status}
                                    <select name="status" value={inputForm.status} onChange={handleInput} className="form-select" aria-label="Default select example" >
                                        <option value="1" selected>Show</option>
                                        <option value="0">Hide</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="profile__group">
                                    <label className="profile__label">Category</label>
                                    <select name="category" onChange={handleInput} value={inputForm.category} className="form-select" aria-label="Default select example">
                                        {categories.map(items => {
                                            return <option value={items.id} key={items.id} >{items.name}</option>
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="d-flex justify-content-center mt-5">
                                    <button className="btn btn-primary w-100" type="submit">Submit</button>
                                    <button className="btn btn-secondary w-100" type="button" onClick={() => setIsOpen(false)}>Back</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </ReactModal>
        </>
    );
}

export default FormAddProduct;