import React from "react";

const isObject = (value) => {
  let result = false;
  for (let key of Object.keys(value)) {
    if (typeof value[key] === "object") {
      result = true;
      break;
    }
  }
  return result;
};

const isArray = (value) => {
  return value.list;
};

const primitiveRender = (value) => {
  value = value.toString();
  return <div>{value}</div>;
};

const arrayRender = (arrayData = [], schema) => {
  console.log(arrayData, schema, 24);
  return arrayData.map((data) => {
    return schemaJSX(data, schema);
  });
};

const schemaJSX = (data = {}, schema = {}) => {
  console.log(data, 33);
  let jsxArray = [];
  if (Array.isArray(data)) {
    jsxArray = [...jsxArray, ...arrayRender(data, schema)];
  } else if (typeof data === "object") {
    let dataKeys = Object.keys(data);
    for (let dataKey of dataKeys) {
      const dataValue = data[dataKey];
      if (!schema[dataKey]) {
        continue;
      }

      if (isArray(schema[dataKey])) {
        jsxArray = [...jsxArray, ...arrayRender(dataValue, schema[dataKey])];
      } else if (isObject(schema[dataKey])) {
        jsxArray.push(schemaJSX(dataValue, schema[dataKey]));
      } else {
        jsxArray.push(primitiveRender(dataValue));
      }
    }
  } else {
    jsxArray.push(primitiveRender(data));
  }

  return <>{jsxArray}</>;
};

export default schemaJSX;
