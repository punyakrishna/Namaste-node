// console.log(global)   //global object
// console.log(this); //empty object
// console.log(globalThis); //its proposed in 2020 --- a common name of global object accross all the platfoems ex:- browser, nodejs any runtime env

console.log(globalThis === global); //true-- points to the same reference

// Module exports

let a = 10,
  b = 10;

// common js modules

const { sum } = require("./modules/commonjsmodule");
let x = 20; //If we dont import the varaible even if we exports that we can reuse the same variable
sum(a, b);

//ES modules---- import and export

import { sumInEsModule } from "./modules/esmodule.js";
sumInEsModule(a, b);



