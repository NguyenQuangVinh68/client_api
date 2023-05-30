import Cookies from "universal-cookie";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import ReactPaginate from "react-paginate";
import Cookie from "universal-cookie";

import { store } from "../../context/ContextProvider";
import Loading from "../../components/Loading"
import apiProduct from "../../api/apiProduct";
import ListProducts from "./components/ListProducts";
import ModalCreate from "./components/ModalCreate";
import Search from "./components/Search";
import NotFound from "../../components/NotFound";
// import Pagination from "../../components/Pagination";

function Product() {
  const cookie = new Cookie();
  const navigate = useNavigate();
  const userContext = useContext(store)

  const [modalOpenCreate, setModalOpenCreate] = useState(false)
  const [products, setProducts] = useState([])
  const [load, setLoad] = useState(true)
  const [page,setPage] = useState(1)

  const [paginator, setPaginator] = useState({
    currentPageNumber: 1,
    hasNextPage: null,
    hasPreviousPage: null,
    totalPages: null,
    totalRecords: null,
    pageSize: null
  })
  const user = JSON.parse(localStorage.getItem("user"));

  console.log(user?.exp * 1000);

  if (user?.exp * 1000 < Date.now()) {
    localStorage.clear()
    cookie.remove("jwt_authentication")
    navigate("/auth/login")
  }

  // paginator
  const handlePageClick = (e) => {
    setPage(+e.selected + 1)
    getProduct(+e.selected + 1)
  }

  // get all product
  useEffect(() => {
    console.log("efect product");
    getProduct(page);
  }, [userContext])


  const getProduct = async (page) => {
    try {
      console.log(page, "page");
      const { data, pagination } = await apiProduct.getAll(page);
      setLoad(false)
      setProducts(data)
      setPaginator(pagination)
      console.log(pagination);
    } catch (error) {
      if (error.response.status === 401) {
        navigate("/auth/login")
      }
    }
  }

  return (
    <div className="row">
      {/* main title */}
      <div className="col-12">
        <div className="main__title">
          <h2>Product</h2>
          <div className="main__title-wrap">
            <div className="me-5">
              <button className="btn btn-light text-black" onClick={() => setModalOpenCreate(true)}>Add product</button>
            </div>
            {/* search */}
            <Search setProducts={setProducts} />
            {/* end search */}
          </div>
        </div>
      </div>
      {/* end main title */}
      {/* product */}
      {load ? <Loading /> :
        products.length > 0 ? <ListProducts data={products} /> : <NotFound />}
      {/* end product */}
      {/* paginator */}
      {products.length > 0 && <div className="paginator-wrap">
        <span>{paginator.pageSize} from {paginator.totalRecords}</span>
        <ReactPaginate className="paginator" style={{ width: "auto !importan" }}
          nextLabel="next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={1}
          pageCount={paginator.totalPages}
          previousLabel="prev"
          pageClassName="paginator__item"
          previousClassName="paginator__item paginator__item--prev"
          nextClassName="paginator__item paginator__item--next"
          breakLabel="..."
          breakClassName="paginator__item"
          activeClassName="paginator__item--active"
          renderOnZeroPageCount={null}
        />
      </div>}
      <ModalCreate setIsOpen={setModalOpenCreate} modalIsOpen={modalOpenCreate} />
      {/* end paginator */}
    </div>


  );
}
// }

export default Product;
