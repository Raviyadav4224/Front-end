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

// Implement a function that performs a deep copy of a value, but also handles circular references.
function deepCopyWithCircularReferences(value, visited) {
  console.log(typeof value);

  if (typeof value !== "object" || value === null) {
    return value;
  }
  let copyObjWithCircularReference = {};

  if (Array.isArray(value)) {
  }
  Object.entries(value).map(
    ([key, value]) => (copyObjWithCircularReference[key] = value)
  );
  return copyObjWithCircularReference;
}

// Implement the functionality behaviour of Promise.any

async function promiseAll(promiseArray) {
  console.log("promiseArray", promiseArray);
  if (!Array.isArray(promiseArray)) {
    throw TypeError("Must be an Array of promises");
  }
  if (promiseArray.length === 0) {
    return [];
  }
  let result = [];
  try {
    for (const promise of promiseArray) {
      let res = await promise;
      result.push(res);
    }
    return result;
  } catch (error) {
    return error;
  }
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

// Deep Clone an Object

function deepClone(obj) {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }
  let clone = Array.isArray(obj) ? [] : {};

  for (const key in obj) {
    clone[key] = deepClone(obj[key]);
  }
  return clone;
}

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
