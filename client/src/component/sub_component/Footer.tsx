import {SiSpringboot, SiJava, SiPostgresql, SiJavascript, SiTypescript} from 'react-icons/si'
import {FaReact} from 'react-icons/fa'
import {DiJavascript1} from 'react-icons/di'
import {BsFacebook, BsGithub, BsLinkedin} from 'react-icons/bs'
export const Footer = () => {

    return (
        <div className={'footer pt-4'}>
            <div className="main">
                <div className="layout grid grid-cols-12 sm:grid-cols-1">
                    <div className="resource grid col-span-9 md:grid-cols-1">
                        <div className="tools_use grid grid-cols-2">
                            <div className="frontend grid justify-center">
                                <h5>Frontend Tools</h5>
                                <div className="toolsContainer grid gap-2 mt-6 justify-center sm:grid-cols-2 sm:gap-4">
                                    <DiJavascript1/>
                                    <SiTypescript/>
                                    <FaReact/>
                                </div>
                            </div>
                            <div className="backend grid justify-center">
                                <h5>Backend Tools</h5>
                                <div className="toolsContainer grid gap-2 mt-6 justify-center sm:grid-cols-2 sm:gap-4">
                                    <SiJava/>
                                    <SiSpringboot/>
                                    <SiPostgresql/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="icons sm:mt-10">
                        <div className="sub_title pb-5 sm:hidden">Social Media</div>
                        <div className="container col-span-3 grid grid-cols-3 justify-center sm:pt-6 sm:w-fit sm:mb-5 sm:gap-5 sm:m-auto">
                            <BsGithub/>
                            <BsLinkedin/>
                            <BsFacebook/>
                        </div>
                    </div>
                </div>
                <div className="copyright text-center w-full mt-2 p-5">
                    <p className={'text-center'}>@ Keita organics inc, 2022</p>
                </div>
            </div>
        </div>
    )
}