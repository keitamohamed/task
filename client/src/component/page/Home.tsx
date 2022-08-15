import {useEffect} from "react";
import {SiJava, SiJavascript, SiMysql, SiSpringboot} from "react-icons/si";
import {FaReact} from "react-icons/fa"
import Header from "./Header";

export const Home = () => {

    const getElement = (name: string) => {
        const element = document.querySelectorAll(`.${name}`)
        return element ? element : null
    }

    const init = () => {
        const titles = getElement('carouselTitle')
        titles?.forEach((element, index) => {
            element.addEventListener('mouseover', () => {
                // @ts-ignore
                element.style.borderBottom = '1px solid red'
            })
            element.addEventListener('mouseleave', () => {
                // @ts-ignore
                element.style.borderBottom = 'none'
            })
            element.addEventListener('click', () => {
                titles.forEach(removeActive => {
                    removeActive.classList.remove('active')
                })
                element.classList.add('active')
                info(index)
            })
            info(0)
        })

    }

    const info = (displayIndex: number) => {
        const element = getElement('carousel')
        element?.forEach((e, index) => {
            if (index === displayIndex) {
                // @ts-ignore
                e.style.display = 'block'
            } else {
                // @ts-ignore
                e.style.display = 'none'
            }
        })
    }

    useEffect(() => {
        init()
    }, [])


    return (
        <div className="home">
            <Header width={'40%'} color={undefined}  />
            <div className="mainContainer md:!mt-10 sm:!mt-16 md:z-0 sm:z-0">
                <div className="show_top">
                    <div className="positionLeft">
                        <nav>
                            <li className='carouselTitle active'>Project</li>
                            <li className='carouselTitle'>Goals</li>
                            <li className='carouselTitle'>Views</li>
                        </nav>
                        <div className="contentInfo">
                            <div className="carousel task">
                                <div className="titleContainer">
                                    <h1 className={'title'}>Simplify <span>work &</span> get more done</h1>
                                </div>
                                <div className="infoContainer">
                                    <p>Plan, track, and management any type of work with
                                        <span> task</span> that flexes to your needs.
                                    </p>
                                </div>
                            </div>
                            <div className="carousel goal">
                                <div className="titleContainer">
                                    <h1 className={'title'}>Set goals <span>&</span> crush them</h1>
                                </div>
                                <div className="infoContainer">
                                    <p>Stay on track to hit your goals with targets for task completions
                                        & track your progress.
                                    </p>
                                </div>
                            </div>
                            <div className="carousel task">
                                <div className="titleContainer">
                                    <h1 className={'title'}>See your <span>work,</span> <br/>you way</h1>
                                </div>
                                <div className="infoContainer">
                                    <p>Track tasks on list, update workflows on a Board, and so much more.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="positionRight"/>
                </div>
            </div>
            <div className="containerPosition">
                <div className="iconContainer">
                    <SiJava/>
                    <SiJavascript/>
                    <SiSpringboot/>
                    <FaReact/>
                    <SiMysql/>
                </div>
            </div>
        </div>
    )
}