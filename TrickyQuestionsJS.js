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
  if(!Array.isArray(promiseArray)){
    throw TypeError("Must be an Array of promises")
  }
  if(promiseArray.length===0){
    return []
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
function flattenArray(value){
  return value.flat(1)
}
function deepFlattenArray(value) {
  let result = [];
  value.forEach((element) => {
    if (Array.isArray(element)) {
      flattenArray(element).forEach(item=>result.push(item))
    } else {
      result.push(element);
    }
  });
  return result;
}