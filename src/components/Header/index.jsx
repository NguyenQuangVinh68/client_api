import { Outlet } from "react-router-dom";


import Search from "../../features/Product/components/Search";

function Header({title}) {
    return (
        <div className="row">
            {/* main title */}
            <div className="col-12">
                <div className="main__title">
                    <h2>{title}</h2>
                    <div className="main__title-wrap">
                        <div className="me-5">
                            <button className="btn btn-light text-black" >Add {title}</button>
                        </div>
                        {/* search */}
                        <Search />
                        {/* end search */}
                    </div>
                </div>
            </div>
            <Outlet />
        </div>
    );
}

export default Header;