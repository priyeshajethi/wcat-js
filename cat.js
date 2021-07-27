#!/usr/bin/env node

let fs = require("fs");
(function () {
  let cmd = process.argv.slice(2);

  let options = [];
  let files = [];
  let str = ``;

  for (let i = 0; i < cmd.length; i++) {
    if (cmd[i].startsWith("-")) {
      options.push(cmd[i]);
    } else {
      files.push(cmd[i]);
    }
  }

  for (let j = 0; j < files.length; j++) {
    if (fs.existsSync(files[j])) {
      str += fs.readFileSync(files[j]).toString();
    } else {
      console.log("invalid file");
      return;
    }
  }

    
    str = str.split("\n")
    
    if (options.includes("-s")) {
        str = removeLargeSpaces(str)

    }

    let nIndex = options.indexOf("-n");
    let bIndex = options.indexOf("-b");

    if(nIndex > -1 && bIndex > -1){
      if(nIndex > bIndex) str = appendNumbersToLines(str, false);//use -b;
      else str = appendNumbersToLines(str, true);//use -n;
    }else if(nIndex > -1){
      //use -n
      str = appendNumbersToLines(str, true);
    }else if(bIndex > -1){
      //use -b
      str = appendNumbersToLines(str, false);
    }
    
    str = str.join("\n")

    
  console.log(str);
})();

// console.log(options);
// console.log(files);

function appendNumbersToLines(arr, nonEmptyAppend){
  let y = [], lineNumber = 1;
  for(let i = 1; i <= arr.length; i++){
    if(nonEmptyAppend){
      y.push(lineNumber + " "+arr[i-1]);
      ++lineNumber;
    }else{
      // console.log(arr[i] == "" + " : " + arr[i]);
      if(arr[i-1] == "" || arr[i-1] =="\r") y.push(arr[i-1]);
      else{
         y.push(lineNumber + " "+arr[i-1]);
         ++lineNumber;
      }
    }
  }
  return y;
}

function removeLargeSpaces(arr) {
  let y = [];

  let flag = false;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === "" || arr[i]=="\r") {
      if (flag === true) {
        continue;
      } else {
        y.push(arr[i]);
        flag = true;
      }
    } else {
      y.push(arr[i]);
      flag = false;
    }
  }

  return y;
}