import {BrowserRouter as Router, NavLink, Route, Switch,} from "react-router-dom";

function SidebarCustom(props) {
  return (
    <div className="navbar navbar-dark navbar-expand-sm fixed-top">
      <aside
        className="collapse d-sm-block col-sm-4 col-7 below-nav"
        id="left-sidebar"
      >
        <div className="list-group list-group-flush">
          
          Photo: rotfl
             
        </div>
        <div className="list-group list-group-flush">
          
          Name: Zeb
             
        </div>
        <div className="list-group list-group-flush">
          
          Id:6546984
             
        </div>
        <div className="list-group list-group-flush">
          
          Mhanz
             
        </div>
      </aside>
    </div>
  );
}

export default SidebarCustom;
