import { useState, useEffect, useRef } from "react";
import apiProduct from "../../../api/apiProduct";

function Search({ setProducts }) {

    const [txtSearch, setTxtSearch] = useState("")
    const typingTimeoutRef = useRef(null)

    const handleChange = (e) => {
        setTxtSearch(e.target.value)
    }
    useEffect(() => {

        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current)
        }

        typingTimeoutRef.current = setTimeout(() => {
            console.log(txtSearch);
            if (txtSearch === "") {
                (async () => {
                    try {
                        const { data } = await apiProduct.getAll(1)
                        setProducts(data)
                    } catch (error) {
                        console.log(error);
                    }
                })();
            } else {
                (async () => {
                    try {
                        const { data } = await apiProduct.search(txtSearch)
                        setProducts(data)
                    } catch (error) {
                        console.log(error);
                    }
                })();
            }
        }, 3000)
        return () => clearTimeout(typingTimeoutRef.current)
    }, [txtSearch])

    return (
        <form action="#" className="main__title-form">
            <input type="text" onChange={handleChange} name="txtSearch" value={txtSearch} placeholder="Find product by category or product" />
            <button type="button">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M21.71,20.29,18,16.61A9,9,0,1,0,16.61,18l3.68,3.68a1,1,0,0,0,1.42,0A1,1,0,0,0,21.71,20.29ZM11,18a7,7,0,1,1,7-7A7,7,0,0,1,11,18Z" />
                </svg>
            </button>
        </form>
    );
}

export default Search;