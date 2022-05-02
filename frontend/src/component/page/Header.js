import {Link} from "react-router-dom";
import routePath from "../../route/RoutePath";
import Logo from "../app_logo/Logo";

const Header = ({width, color}) => {

    return (
        <header className={'appHeader'}>
            <nav>
                <div className="logoContainer">
                    <strong>
                        <Link to={'/'}>
                            <Logo fontWidth={width} />
                        </Link>
                    </strong>
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