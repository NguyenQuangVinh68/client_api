import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import apiCategory from "../../api/apiCategory";
import Category from "./component/Category";
import Loading from "../../components/Loading";


function Categories() {
  const [categories, setCategories] = useState([])
  const [load, setLoad] = useState(true)

  useEffect(() => {
    (async () => {
      try {
        const { data } = await apiCategory.getAll()
        console.log(data);
        setCategories(data)
      } catch (error) {
        console.log(error);
      }
      setLoad(false)
    })();
  }, [])
  return (

    <div className="row">
      {/* main title */}
      <div className="col-12">
        <div className="main__title">
          <h2>Category</h2>
          <span className="main__title-stat">{categories?.length}</span>
          <div className="main__title-wrap">
            {/* search */}
            <form action="#" className="main__title-form">
              <input type="text" placeholder="Find category" />
              <button type="button">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M21.71,20.29,18,16.61A9,9,0,1,0,16.61,18l3.68,3.68a1,1,0,0,0,1.42,0A1,1,0,0,0,21.71,20.29ZM11,18a7,7,0,1,1,7-7A7,7,0,0,1,11,18Z" />
                </svg>
              </button>
            </form>
            {/* end search */}
          </div>
        </div>
      </div>

      {load ? <Loading /> : <div className="col-12">
        <div
          className="main__table-wrap mCustomScrollbar _mCS_3"
          style={{ overflow: "visible" }}
        >
          <div
            id="mCSB_3"
            className="mCustomScrollBox mCS-custom-bar2 mCSB_horizontal mCSB_outside"
            style={{ maxHeight: "none" }}
            tabIndex={0}
          >
            <div
              id="mCSB_3_container"
              className="mCSB_container"
              style={{
                position: "relative",
                top: 0,
                left: 0,
                width: 1137,
                minWidth: "100%",
                overflowX: "inherit",
              }}
              dir="ltr"
            >
              <table className="main__table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>STATUS</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((items) => {
                    return <Category key={items.id} categories={items} />
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>}

    </div>
  )
}

export default Categories;