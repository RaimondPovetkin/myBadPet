import {createStore} from "vuex";
import {elsementsState} from "./elsementsState";

export default createStore({
    modules: {
        elsements: elsementsState,
    }
});