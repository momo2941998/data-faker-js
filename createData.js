// import * as Randexp from 'randexp'
const RandExp = require('randexp');
const fs = require('fs');

var randomText = function(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
var randomInt = function(i) {
  return Math.floor(Math.random() * i);
}
var randomDate = function () {
  let x = new Date();
  let date = new Date(x.getTime() + 1000*(randomInt(7200) - 3600));
  return date;
}

var ranBool = function () {
  return Math.random() < 0.5 ? true: false;
}

let genData= (number) => {
  let data = [];
  for (let i = 0;i< number; i++){
    let incidentId = new RandExp(/[a-z]\w{25}/).gen();
    let numOfReceive = randomInt(3)+1;
    let arr = [];
    for (let i = 0; i< numOfReceive; i++){
      let e = {
        _id: new RandExp(/[a-z]\w{20}/).gen(),
        isSeen: ranBool()
      }
      arr.push(e);
    }
    let e = {
      // id: new RandExp(/[a-z]\w{30}/).gen(),
      fromUser: {
        _id: new RandExp(/[a-z]\w{20}/).gen(),
        username: new RandExp(/(kiểm lâm|nhân viên giám sát|admin) (X|Y|Z)/).gen()
      },
      toUser: arr,
      content: new RandExp("sự cố (drone|cháy rừng| hệ thống) (A|B|C) (phát hiện|thay đổi)").gen(),
      level: randomInt(5) + 1,
      createdAt: randomDate(),
      status: randomInt(3),
      incident: {
        _id: incidentId,
        _type: randomInt(5)
      },
      
      link: 'http://test.com/' + incidentId
    }
    data.push(e);
  }

  return data;
}

let data1 = genData(20);
console.log(data1);
fs.writeFile("./data.json", JSON.stringify(data1, null, 2), function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
}); 
