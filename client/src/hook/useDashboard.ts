import {useContext, useEffect} from "react"

import {useAppDispatch, useAppSelector} from "../setup/store/ReduxHook";
import {AuthContext} from "../setup/context/Context";
import {useProject} from "./useProject";

let openMenu: HTMLElement
let closeMenu: HTMLElement
let dropDownMenu: HTMLElement

export const useDashboard = () => {
    const {loadProjects, loadTaskDue} = useProject()
    const authCtx = useContext(AuthContext)
    const dispatch = useAppDispatch()
    const {project, projects} = useAppSelector((state) => state.project)
    const {taskDue} = useAppSelector((state) => state.task)

    const getElement = (name: string): HTMLElement => {
        return document.querySelector(`.${name}`) as HTMLElement
    }

    const showHideDropdown = (elementOne: Element | null) => {
        if (!elementOne) {
            return
        }
        if (elementOne.classList.contains('openMenu')) {
            dropDownMenu?.removeAttribute('open')
            dropDownMenu?.setAttribute('closed', '')
        }
        if (elementOne.classList.contains('closeMenu') && elementOne.hasAttribute('open')) {
            dropDownMenu?.removeAttribute('closed')
            dropDownMenu?.setAttribute('open', '')
        }
    }

    const toggleMenu = async (openMenuElement: Element | null, closeMenuElement: Element | null, closed: boolean) => {
        // if (!closed && closeMenuElement!) {
        //     closeMenuElement.removeAttribute('closed')
        //     getElement('closeMenu').setAttribute('open', '')
        // }
        closeMenuElement?.removeAttribute('closed')
        closeMenuElement?.setAttribute('closing', '')
        closeMenuElement?.addEventListener('animationend', () => {
            closeMenuElement.setAttribute('closed', '')
            closeMenuElement.removeAttribute('closing')
            closeMenuElement.removeAttribute('open')
            showHideDropdown(openMenuElement)

        },{once: true})

        openMenuElement?.removeAttribute('closed')
        openMenuElement?.setAttribute('open', '')
    }

    const initElement = () => {
        if (openMenu === undefined || closeMenu === undefined) {
            openMenu = getElement('openMenu')
            closeMenu = getElement('closeMenu')
            dropDownMenu = getElement('dropdownContent')
        }
        if (openMenu.hasAttribute('open')) {
            closeMenu = getElement('closeMenu')
            openMenu = getElement('openMenu')
            dropDownMenu = getElement('dropdownContent')
        }
        openMenu?.setAttribute('open', '')
    }

    useEffect(() => {
        // initElement()
        loadProjects()
        loadTaskDue()
    }, [openMenu, closeMenu])

    return {toggleMenu, taskDue, openMenu, closeMenu}
}