// Implement a function that determines if two values are deep equal.
function deepEqual(value1, value2, visited = new Set()) {
  //date
  // objects
  // arrays

  //Primitive data types and Functions,null & undefined
  if (value1 === value2) return true;

  // if both types are diiferent
  if (typeof value1 !== typeof value2) return false;

  //date
  if (value1 instanceof Date && value2 instanceof Date) {
    if (value1.getTime() === value2.getTime()) return true;
  }

  // Objects and Arrays

  if (typeof value1 === "object" && typeof value2 === "object") {
    // checking for circular references
    // visited is an Set which has unique values
    console.log("visited", visited);
    if (visited.has(value1) || visited.has(value2)) return value1 === value2;
    visited.add(value1);
    visited.add(value2);
    console.log("visited", visited);
    // Arrays
    if (Array.isArray(value1) && Array.isArray(value2)) {
      // let keys1=Object.keys(value1)
      // let keys2=Object.keys(value2)
      // if(keys1.length!==keys2.length) return false

      if (value1.length !== value2.length) return false;
      for (let i = 0; i < value1.length; i++) {
        if (!deepEqual(value1[i], value2[i], visited)) return false;
      }
      return true;
    }

    // Objects
    if (!Array.isArray(value1) && !Array.isArray(value2)) {
      let keys1 = Object.keys(value1);
      let keys2 = Object.keys(value2);
      if (keys1.length !== keys2.length) return false;

      for (let i = 0; i < keys1.length; i++) {
        if (!deepEqual(value1[keys1[i]], value2[i], visited)) return false;
      }

      // for(const key of keys1){
      //   if (!deepEqual(value1[key], value2[key], visited)) return false;
      // }
      return true;
    }
  }

  return false;
}

// Polyfill for Promise.all
function allPromise(promiseArr) {
  return new Promise((resolve, reject) => {
    let result = [];
    let completed = 0;
    promiseArr.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((res) => {
          result[index] = res;
          completed++;
          if (completed === promiseArr.length) {
            resolve(result);
          }
        })
        .catch((err) => reject(err));
    });
  });
}

// Implement a function that recursively flattens an array into a single level deep.

function deepFlatten(arr) {
  const result = [];

  function flat(element) {
    if (Array.isArray(element)) {
      for (const item of element) {
        flat(item);
      }
    } else {
      result.push(element);
    }
  }

  for (const element of arr) {
    flat(element);
  }

  return result;
}

// implement getElementById

function getElementById(id) {
  function traverse(node) {
    // Checks if ID is present in the node or not
    if (node.id === id) {
      return node;
    }

    for (const child of node.children) {
      // Check for all childs
      const result = traverse(child);
      if (result) return result;
    }

    // if no match found
    return null;
  }

  return traverse(document.body);
}

//Implement getElementsByClassName

function getElementsByClassName(classname) {
  const result = [];
  function traverse(node) {
    // Check if node contains the given class name then add it to result
    if (node.classList.contains(classname)) {
      result.push(node);
    }

    // Check for all Childs whether they contain the given classname or not

    for (const child of node.children) {
      traverse(child);
    }
  }

  traverse(document.body);

  return result;
}

// Deep Clone an Object which handles primitives, Arrays & Objects, Date,RegExp,Map,Set & Circular References

function deepClone(value, visited = new WeakMap()) {
  // Primitive data types
  if (typeof value !== "object" || value === null) {
    return value;
  }

  // Handling Circular References
  if (visited.has(value)) {
    return visited.get(value);
  }

  // Date Object
  if (value instanceof Date) {
    return new Date(value.getTime());
  }

  // RegExp Object
  if (value instanceof RegExp) {
    return new RegExp(value.source, value.flags);
  }

  // Map Object
  if (value instanceof Map) {
    const resultMap = new Map();
    visited.set(value, resultMap);
    for (const [key, val] of value.entries()) {
      resultMap.set(deepClone(key, visited), deepClone(val, visited));
    }
    return resultMap;
  }

  // Set Object
  if (value instanceof Set) {
    let resultSet = new Set();
    visited.set(value, resultSet);
    for (const elem of value.values()) {
      resultSet.add(deepClone(elem, visited));
    }
    return resultSet;
  }

  const clone = Array.isArray(value) ? [] : {};

  // Adding Clone to Visited Objects
  visited.set(value, clone);

  // Handling Arrays and Objects
  for (const key of Object.keys(value)) {
    // Object.keys is used so that prototypes and not added to the keys
    clone[key] = deepClone(value[key], visited);
  }

  return clone;
}

let obj1 = {
  name: "ravi",
  age: 27,
  address: {
    countryCode: "IN",
    state: "West Bengal",
  },
  salary: null,
  dateOfJoining: new Date("2021-12-06").toLocaleDateString("en-IN"),
  someSets: new Set([1, 2, 3, 4, 5, 4]),
};

obj1["circular"] = obj1;
Object.setPrototypeOf(obj1, {
  logMe: function () {
    console.log("Hey", this.name);
  },
});
let obj2 = deepClone(obj1);

obj2.salary = 27000;
obj2.address.state = "Bihar";
console.log("obj1", obj1);
console.log("obj2", obj2);

// Call the given function for given number of times only(similar to throttle)

const rateLimitApi = (timeSpan, rate, callback) => {
  let count = 0;
  let lastTime = 0;
  return function (...args) {
    let currentTime = Date.now();
    console.log(currentTime - lastTime, timeSpan, count);
    if (currentTime - lastTime >= timeSpan) {
      lastTime = currentTime;
      count = 0;
    }
    if (count <= rate) {
      count += 1;
      callback(...args);
    }
  };
};

// one promise finishes and then next one starts

async function handlePromisesOneByOne() {
  let res = [];
  for (const promise of [1, 2, 3, 4, 5, 6]) {
    try {
      const data = await getProducts(promise);
      res.push(data);
    } catch (error) {
      console.log(error.message);
    }
  }
  return res;
}
handlePromisesOneByOne().then((res) => console.log(res));

// Memoize a function

function memoizeFunc(func) {
  let cache = new Map();

  return function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      console.log("From Cache");
      return cache.get(key);
    } else {
      const result = func.call(this, ...args); // If we dont use call here, then this might be undefined, we can use Arrow function here to fix this
      cache.set(key, result);
      return result;
    }
  };
}

// Polyfill for Filter method

Array.prototype.mapFilter = function (callbackFn) {
  let result = [];

  this.map((item, index, arr) => {
    if (callbackFn(item, index, arr)) {
      result.push(item);
    }
  });

  return result;
};

// Polyfill for Array.forEach

Array.prototype.eachFor = function (callbackFn) {
  for (let index = 0; index < this.length; index++) {
    callbackFn.call(this, this[index], index, this);
  }
};

// Polyfill for Array.forEach method but works for async methods in series i.e one by one

Array.prototype.forEachAsync = async function (callbackFn) {
  // To Check whether the given function is Async or not
  if (callbackFn.constructor.name !== "AsyncFunction") {
    throw new Error(
      `Callback must be an Async Function, received: ${callbackFn.constructor.name}`
    );
  }

  // Wrapping the callback into Promise so that it can handle non-promises
  for (let index = 0; index < this.length; index++) {
    await Promise.resolve(callbackFn.call(this, this[index], index, this));
  }
};

// Actual Length of an Object considering Symbols and enumerable false keys as well

Object.defineProperty(obj, "actualLength", {
  get() {
    return [
      ...Object.getOwnPropertyNames(this).filter(
        (item) => item !== "actualLength"
      ),
      ...Object.getOwnPropertySymbols(this),
    ].length;
  },
});

// CLOSURES AND HOISTING QUESTIONS
// ------------------------------------------------------------------------------------------

// * SCOPES -
//  var are function scoped and can be re-declared in the same scope
// whereas let is block scope , it cannot be re-declared
// function outer() {
//   console.log(a); // (1)
//   var a = 10;
//   var inner = function () {
//     console.log(a); // (2)
//     a = 20;
//     console.log(a); // (3)
//   };
//   inner();
//   console.log(a); // (4)
// }

// outer();

// --------------------------------------------------------------------------------------------------------
// 1.
// function outer() {
//   var x = 5;

//   function inner() {
//     let x = 10; // Shadowing the outer `x`
//     console.log(x); // (1)
//   }

//   console.log(x); // (2)
//   inner();
//   console.log(x); // (3)
// }

// outer();

// 2.
// function outer() {
//   console.log(a); // (1)

//   var a = 10;

//   var inner = function () {
//     console.log(a); // (2)
//     a = 20; // Modifies `a` in `outer`
//     console.log(a); // (3)
//   };

//   inner();
//   console.log(a); // (4)
// }

// outer();

// 3.
// function outer() {
//   var a = 10;

//   for (let i = 0; i < 3; i++) {
//     console.log(a, i); // (1)
//     let a = i * 2; // Shadows `a` in `outer`
//     console.log(a); // (2)
//   }

//   console.log(a); // (3)
// }

// outer();

// 4.
// function outer() {
//   var a = 100;

//   function inner() {
//     console.log(a); // (1)

//     var a = 50; // Shadowed
//     console.log(a); // (2)
//   }

//   return inner;
// }

// const innerFunc = outer();
// innerFunc();

// 5.
// function outer(a) {
//   console.log(a); // (1)

//   function inner(a) {
//     console.log(a); // (2)

//     a = 30; // Updates `a` in `inner`
//     console.log(a); // (3)
//   }

//   inner(20);
//   console.log(a); // (4)
// }

// outer(10);

// 6.
// function outer() {
//   this.value = 50;

//   const inner = () => {
//     console.log(this.value); // (1)
//     this.value += 10; // Modifies `value` in `outer`
//     console.log(this.value); // (2)
//   };

//   inner();
//   console.log(this.value); // (3)
// }

// const obj = new outer();

// 7.
// function outer(a, b) {
//   console.log(arguments[0], arguments[1]); // (1)

//   function inner(a) {
//     console.log(arguments[0]); // (2)

//     a = 30; // Updates the local `a`
//     console.log(a); // (3)
//     console.log(arguments[0]); // (4)
//   }

//   inner(20);
// }

// outer(10, 40);

// 8.
// function outer() {
//   var a = 10;

//   (function inner() {
//     console.log(a); // (1)
//     var a = 20; // Shadowed
//     console.log(a); // (2)
//   })();

//   console.log(a); // (3)
// }

// outer();

// 9.
// var a = 10;
// function test() {
//   console.log(a);

//   if (true) {
//     console.log(a);
//     var a = 10;
//     let b = 20;
//   }
//   console.log(b);
// }
// test();
