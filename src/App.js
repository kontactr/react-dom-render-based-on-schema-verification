import React from "react";

import ReactDOM from "react-dom";

import "./styles.css";
import jsonScheme from "./schema";
import schemaJSX from "./display";

import { userData, postData } from "./data";

export default function App() {
  return <></>;
}

const isDataProp = (prop, value, schema) => {
  if (typeof value === "object") {
    return true;
  } else {
    return false;
  }
};

const isPrimitive = (value, schema) => {
  return !schema[value];
};

const isTypeProp = (prop, value, schema) => {
  if (prop === "type") {
    return [true, isPrimitive(value, schema)];
  } else {
    return [false, undefined];
  }
};

const schemaParse = (currentSchema = {}, rootSchema = {}) => {
  let dataTypes = {};
  for (let type of Object.keys(currentSchema)) {
    const value = currentSchema[type];
    let [isType, isPrimitiveResult] = isTypeProp(type, value, rootSchema);
    //console.log(isType, isPrimitiveResult);
    if (isType) {
      dataTypes[type] = value;
      if (!isPrimitiveResult) {
        dataTypes = {
          ...dataTypes,
          ...schemaParse(rootSchema[value], rootSchema),
          type: value
        };
      }
    } else {
      let isObject = isDataProp(type, value);
      if (isObject) {
        dataTypes[type] = schemaParse(value, rootSchema);
      } else {
        dataTypes[type] = value;
      }
    }
  }
  return dataTypes;
};

const modifiedSchema = schemaParse(jsonScheme, jsonScheme);

const rootElement = document.getElementById("root");
const jsx = schemaJSX({ user: userData, post: postData }, modifiedSchema);
ReactDOM.render(jsx, rootElement);
