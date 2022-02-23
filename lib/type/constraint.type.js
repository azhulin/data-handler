"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
//import type { Context } from "../interface"
__exportStar(require("../component/constraint.component"), exports);
/**
 * The data constraint.
 */
//export type Constraint<T> = [
//  string,
//  (data: T, context: Context) => Constraint.Result | Promise<Constraint.Result>,
//  boolean?,
//]
//export namespace Constraint {
//  export type Result = null | string | [string, Record<string, unknown>]
//  export type Library = {
//    [key: string]: Constraint<any> | ((...args: any) => Constraint<any>) | Library
//  }
//  export type List<T> = Array<Constraint<T> | ((context: Context) => Constraint<T>[])>
//}
