import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import type {AppDispatch, AppStore} from "./store";

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppStore> = useSelector