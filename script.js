function hash(key) {
  let hashCode = 0;
  const primeNumber = 31;
  for (let i = 0; i < key.length; i++) {
    hashCode = hashCode * primeNumber + key.charCodeAt(i);
  }
  return hashCode;
}
const hashMap = (currentArrSize=16,loadFactor=.75) => {
  let currentLength = 0;
  let arrSize = currentArrSize;
  let hashArr = new Array(arrSize);

  function calculateLoadFactor(){
    return currentLength / arrSize;
  }

  function resize(){
    const OldArr=hashArr;
    arrSize*=2;
    hashArr=new Array(arrSize)
    OldArr.forEach(bucket=>{
      if(bucket&&bucket.length>0){
        bucket.forEach((item)=>{
        set(Object.keys(item),Object.values(item))  
        })
      }
    })
  }

  const set = (key, value) => {
    let hashVal = hash(key);
    hashVal %= arrSize;
    if (!hashArr[hashVal]) {
      hashArr[hashVal] = {};
    }
    hashArr[hashVal][key] = value;
    currentLength++;
    if (calculateLoadFactor()>loadFactor){
      resize()
      }
  };
  const get = (key) => {
    let hashVal = hash(key);
    hashVal %= arrSize;
    if (!hashArr[hashVal]) {
      return null;
    } else return hashArr[hashVal][key];
  };
  const has = (key) => {
    return get(key) ? true : false;
  };
  const remove = (key) => {
    let hashVal = hash(key);
    hashVal %= arrSize;
    if (!hashArr[hashVal] || !hashArr[hashVal][key]) return false;

    hashArr[hashVal] = Object.keys(hashArr[hashVal])
      .filter((objKey) => objKey !== key)
      .reduce((newObj, Key) => {
        newObj[Key] = details[Key];
        return newObj;
      }, {});
    return true;
  };
  const length = () => {
    return currentLength;
  };
  const clear = () => {
    currentLength=0;
    hashArr=[]

};
  const keys = () => {
    let keys=[];
    hashArr.forEach(objects=>{
        if(objects){
            keys.push(...Object.keys(objects))
        }
    })
    return keys;

  };
  const values = () => {
     let values = [];
     hashArr.forEach((objects) => {
       if (objects) {
         values.push(...Object.values(objects));
       }
     });
     return values;

  };
  const entries = () => {
     let entries = [];
     hashArr.forEach((objects) => {
       if (objects) {
         entries.push(...Object.entries(objects));
       }
     });
     return entries;
  };

  return { set, get, has, remove, length, clear, keys, values, entries };
};

let newHash = hashMap();
newHash.set("Mahmoud", "Barghout");
newHash.set("John","cena")
newHash.set("welcome","to the jungle")
newHash.set("soso", "leeh");
console.log(newHash.get("soso"));
newHash.set("soso", "booso");
console.log(newHash.get("soso"));
// //console.log(newHash.remove("soso"));
// console.log(newHash.get("soso"));

console.log(newHash.has("Mahmoud"));
console.log(newHash.length());
console.log(newHash.keys());
console.log(newHash.values());
console.log(newHash.entries());



//newHash.clear()
//console.log(newHash.get("Mahmoud"));
//console.log(newHash.length());

