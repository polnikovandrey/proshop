import { AppDispatch } from "../store";
import { AnyAction } from "redux";

export type ActionToState<State, Action extends AnyAction> = (state: State, action: Action) => State;

export interface ActionDispatchParams<Action extends AnyAction> { dispatch: AppDispatch, action: Action }

export interface ActionDispatcher<Action extends AnyAction> {
    dispatchAction(action: Action): void;
}