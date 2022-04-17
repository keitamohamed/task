import {FaReact} from "react-icons/fa";
import {SiSpringboot} from 'react-icons/si'

import Header from './Header'

const Home = () => {
    return (
        <div className={'home'}>
            <Header/>
            <div className="mainContainer">
                <div className="positionLeft">
                    <nav>
                        <li className={'active'}>Project & Tasks</li>
                        <li>Goals</li>
                        <li>Views</li>
                    </nav>
                    <div className="contentInfo">
                        <div className="titleContainer">
                            <h1 className={'title'}>Simplify work and get more done.</h1>
                        </div>
                        <div className="infoContainer">
                            <p>Plan, track, and management
                                any type of work with <span>taskie</span> project management
                                that flexes to your needs.
                            </p>
                        </div>
                    </div>
                    <div className="iconContainer">
                        <SiSpringboot />
                        <FaReact />
                    </div>
                    <h2>Build With Spring boot & React</h2>
                </div>
                <div className="positionRight"></div>
            </div>
        </div>
    )
}

export default Home