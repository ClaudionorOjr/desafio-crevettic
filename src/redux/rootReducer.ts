import { combineReducers } from "redux";
import { customerReducer } from "./customer/reducer";
import { saleReducer } from "./sale/reducer";

const rootReducer = combineReducers({customerReducer, saleReducer})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer