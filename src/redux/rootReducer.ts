import { combineReducers } from "redux";
import customerReducer from "./customer/reducer";
import saleReducer from "./sale/reducer";

const rootReducer = combineReducers({customerReducer, saleReducer})

export default rootReducer