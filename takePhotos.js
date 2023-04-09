
// Erzugt eine Array mit 12 oder 20 zellen, es bittet mir eine arrray mit gedopelte inhalt weil mein 
// Fotos haben die gleiche namen, und bittet auch die mischung. 
let choose = (count) => {
  let nums1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  let nums2 = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6];

  if (count == 12) {
    let ranNums = [];
    let i = nums2.length;
    let j = 0;
    while (count--) {
      j = ~~(Math.random() * (count + 1));
      ranNums.push(nums2[j]);
      nums2.splice(j, 1);
    }
    return ranNums;
  } else {
    let ranNums = [];
    let i = nums1.length;
    let j = 0;
    while (count--) {
      j = ~~(Math.random() * (count + 1));
      ranNums.push(nums1[j]);
      nums1.splice(j, 1);
    }
    return ranNums;
  }
};
