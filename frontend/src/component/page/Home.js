import {FaReact} from "react-icons/fa";
import {SiSpringboot} from 'react-icons/si'
import {SiJava} from "react-icons/si";
import {SiJavascript} from "react-icons/si";
import {SiMysql} from "react-icons/si";


import Header from './Header'
import {useEffect} from "react";


const Home = () => {

    const getElement = (name) => {
        const element = document.querySelectorAll(`.${name}`)
        return element ? element : null
    }

    const init = () => {
        const titles = getElement('carouselTitle')
        titles.forEach((element, index) => {
            element.addEventListener('mouseover', e => {
                element.style.borderBottom = '1px solid red'
            })
            element.addEventListener('mouseleave', evt => {
                element.style.borderBottom = 'none'
            })
            element.addEventListener('click', evt => {
                titles.forEach(removeActive => {
                    removeActive.classList.remove('active')
                })
                element.classList.add('active')
                info(index)
            })
            info(0)
        })

    }

    const info = (displayIndex) => {
        const element = getElement('carousel')
        element.forEach((e, index) => {
            if (index === displayIndex) {
                e.style.display = 'block'
            } else {
                e.style.display = 'none'
            }
        })
    }

    useEffect(() => {
        init()
    }, [])

    return (
        <div className={'home'}>
            <Header/>
            <div className="mainContainer">
                <div className="positionLeft">
                    <nav>
                        <li className='carouselTitle active'>Project & Tasks</li>
                        <li className='carouselTitle'>Goals</li>
                        <li className='carouselTitle'>Views</li>
                    </nav>
                    <div className="contentInfo">
                        <div className="carousel task">
                            <div className="titleContainer">
                                <h1 className={'title'}>Simplify work & get more done</h1>
                            </div>
                            <div className="infoContainer">
                                <p>Plan, track, and management any type of work with
                                    <span> task</span> that flexes to your needs.
                                </p>
                            </div>
                        </div>
                        <div className="carousel goal">
                            <div className="titleContainer">
                                <h1 className={'title'}>Set goals & crush <br/>them</h1>
                            </div>
                            <div className="infoContainer">
                                <p>Stay on track to hit your goals with targets for task completions
                                    & track your progress.
                                </p>
                            </div>
                        </div>
                        <div className="carousel task">
                            <div className="titleContainer">
                                <h1 className={'title'}>See your work, <br/>you way</h1>
                            </div>
                            <div className="infoContainer">
                                <p>Track tasks on list, update workflows on a Board, and so much more.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="positionBottom">
                        <div className="iconContainer">
                            <SiJava/>
                            <SiJavascript/>
                            <SiSpringboot/>
                            <FaReact/>
                            <SiMysql/>
                        </div>
                    </div>
                </div>
                <div className="positionRight"></div>
            </div>
        </div>
    )
}

export default Home