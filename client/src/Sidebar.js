import { BrowserRouter as Router, NavLink, Route, Switch } from "react-router-dom"

function SidebarCustom(props) {
    return (
        <Switch>
            <aside
                className="collapse d-sm-block col-sm-4 col-12 bg-light below-nav"
                id="left-sidebar"
            >
                <div className="list-group list-group-flush">
                    Photo: Lmao
                </div>
                <div className="list-group list-group-flush">
                    Name: Rocco Papaleo
                </div>
                <div className="list-group list-group-flush">
                    Id:103847582
                </div>
                <div className="list-group list-group-flush">
                    Lezzo
                </div>
            </aside>
        </Switch>
    );
}



export default SidebarCustom;
