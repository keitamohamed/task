import {Link} from "react-router-dom";
import Logo from "../logo/Logo";
import {routePath} from "../../setup/route/RoutePath";

interface Props {
    width: string,
    color: string | null
}

const Header = (props: Props) => {


    return (
        <header className='header'>
            <nav>
                <div className="logoContainer">
                    <strong>
                        <Link to={'/'}>
                            <Logo width={props.width} color={props.color} />
                        </Link>
                    </strong>
                </div>
                <div className="linkContainer">
                    {/*{*/}
                    {/*    routePath.map((link, index) => {*/}
                    {/*        if (link.protected && authCtx.cookie.accessToken && link.showLink) {*/}
                    {/*            return (<Link key={index} to={link.path} value={link.name} >*/}
                    {/*                {link.name}*/}
                    {/*            </Link>)*/}
                    {/*        }*/}
                    {/*        if (!link.protected && !authCtx.cookie.accessToken && link.showLink) {*/}
                    {/*            return (<Link key={index} to={link.path} value={link.name} >{link.name}</Link>)*/}
                    {/*        }*/}
                    {/*    })*/}
                    {/*}*/}
                    {/*{*/}
                    {/*    authCtx.cookie.accessToken ? <li onClick={logout}>logout </li> : ''*/}
                    {/*}*/}
                </div>
            </nav>
        </header>
    )
}

export default Header