import { ActionReducer, ActionReducerMap, MetaReducer } from "@ngrx/store";
import { countReducer } from "../reducer/count.reducer";
import { BookState } from "./book.state";
import { bookReducer } from "../reducer/book.reduce";
import { LocalStorageConfig, localStorageSync } from "ngrx-store-localstorage"

export interface AppState {
  countState : CountState;
  bookState : BookState;
}

export interface CountState{
  count : number;
}

export const AppReducer : ActionReducerMap<AppState> = {  //connect reducer to app state
  countState : countReducer,
  bookState : bookReducer
}

const storeage:MetaReducer = (reducer:ActionReducer<any,any>) => {
  return localStorageSync({...appConfig,storage:localStorage})(reducer);
}

const appConfig: LocalStorageConfig = {
  rehydrate: true,
  storage: sessionStorage,
  keys: ['bookState']
}

export const metaReducers: MetaReducer[] = [storeage];  //connect meta reducer to app state

