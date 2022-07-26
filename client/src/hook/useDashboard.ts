import {useContext} from "react"

import {useAppDispatch, useAppSelector} from "../setup/store/ReduxHook";
import {AuthContext} from "../setup/context/Context";

let openMenu: Element | null
let closeMenu: Element | null
let dropDownMenu: Element | null;

export const useDashboard = () => {
    const authCtx = useContext(AuthContext)
    const dispatch = useAppDispatch()

}