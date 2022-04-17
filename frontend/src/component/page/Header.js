import {Link} from "react-router-dom";
import routePath from "../../route/RoutePath";

const Header = () => {

    return (
        <header className={'appHeader'}>
            <nav>
                <div className="logoContainer">
                    <h2>Header Logo</h2>
                </div>
                <div className="linkContainer">
                    {
                        routePath.map((link, index) => {
                            return link.showLink ? (<Link key={index} to={link.path} value={link.name} >
                                {link.name}
                            </Link>) : ''
                        })
                    }
                </div>
            </nav>
        </header>
    )

}

export default Header