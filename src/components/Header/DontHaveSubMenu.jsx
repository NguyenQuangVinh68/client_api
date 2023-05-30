import { useState } from "react";
import SearchData from "../SearchData";

function DontHaveSubMenu({title}) {

    const [data, setData] = useState([])

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
                        <SearchData setData={setData} />
                        {/* end search */}
                    </div>
                </div>
            </div>
        </div>
     );
}

export default DontHaveSubMenu;