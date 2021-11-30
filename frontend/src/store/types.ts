import { AppDispatch } from "./store";
import { AnyAction } from "redux";


export type ActionToState<State, Action extends AnyAction> = (state: State, action: Action) => State;

export interface ActionDispatchParams<Action extends AnyAction> { dispatch: AppDispatch, action: Action }

export function createActionDispatcher<Action extends AnyAction>(): (params: ActionDispatchParams<Action>) => void {
    return ({ dispatch, action }) => dispatch(action);
}