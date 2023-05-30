function Dashboard() {
    return (

        <div className="container-fluid">
            <div className="row">
                {/* main title */}
                <div className="col-12">
                    <div className="main__title">
                        <h2>Dashboard</h2>
                    </div>
                </div>
                {/* end main title */}
            </div>
            <div className="row row--grid">
                {/* stats */}
                <div className="col-12 col-sm-6 col-xl-3">
                    <div className="stats">
                        <span>Unique views this month</span>
                        <p>5 678</p>
                        <img src="img/graph-bar.svg" alt="" />
                    </div>
                </div>
                {/* end stats */}
                {/* stats */}
                <div className="col-12 col-sm-6 col-xl-3">
                    <div className="stats">
                        <span>Items added this month</span>
                        <p>172</p>
                        <img src="img/film.svg" alt="" />
                    </div>
                </div>
                {/* end stats */}
                {/* stats */}
                <div className="col-12 col-sm-6 col-xl-3">
                    <div className="stats">
                        <span>New comments</span>
                        <p>2 573</p>
                        <img src="img/comments.svg" alt="" />
                    </div>
                </div>
                {/* end stats */}
                {/* stats */}
                <div className="col-12 col-sm-6 col-xl-3">
                    <div className="stats">
                        <span>New reviews</span>
                        <p>1 021</p>
                        <img src="img/star-half-alt.svg" alt="" />
                    </div>
                </div>
                {/* end stats */}
            </div>
        </div>

    );
}

export default Dashboard;