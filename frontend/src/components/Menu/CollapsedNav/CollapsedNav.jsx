import 'bootstrap/dist/css/bootstrap.css';
import {useContext} from "react";
import {AuthContext} from "../../../App.jsx";

export const CollapsedNav = ({setActiveComponent}) => {

    const {userAuthorized, setUserAuthorized} = useContext(AuthContext);

    return (
        <nav className="navbar" style={{left: "unset"}}>
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                            <li className="nav-item">
                                <a
                                    className="nav-link active"
                                    aria-current="page"
                                    href="#"
                                    onClick={()=>setActiveComponent('Home')}
                                >Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#" onClick={()=>setActiveComponent('Explore')}>Explore</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#" onClick={()=>setActiveComponent('Login / Register')}>Login / Register</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#" onClick={()=> {
                                    setUserAuthorized(false);
                                    localStorage.removeItem('jwtToken');
                                }}>Logout</a>
                            </li>
                        </ul>
                        <hr className="table-group-divider" />
                        <form className="d-flex mt-3" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </div>
        </nav>
    )
}