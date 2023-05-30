
import Product from "./Product";


function ListProducts({ data, setReload }) {
  return (
    <div className="col-12">
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
                  <th>CATEGORY ID</th>
                  <th>QUANTITY</th>
                  <th>STATUS</th>
                  <th>ORIGIN</th>
                  <th>PRICE</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {data.map((items) => {
                  return <Product key={items.id} product={items} setReload={setReload} />
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListProducts;