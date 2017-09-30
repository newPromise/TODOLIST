/**
 * Created by dell-dell on 2017/9/20.
 */
/**

document.getElementById('msg').textContent = '使用webpack调用的一个接口数据';

let filter = [1, 2].filter((item) => {
  return item > 3;
});
let num = 0;
// 使用reduce 实现的去重操作
let reduce = ['a', 'b', 'v', 'c', 'c', 'c', 'e', 'a'].reduce((pev, next) => {
  if (pev.indexOf(next) >= 0) {
    num--;
  } else {
    num++;
    pev.push(next);
  }
  return pev;
}, []);
let reduceObj = ['a', 'b', 'v', 'c', 'c', 'c', 'e', 'a'].reduce((pev, next) => {
  pev[next] = pev[next] + 1 || 1;
  return pev;
}, {});

// 使用递归的时候, 要注意函数从哪里退出，如何退出
// 使用strArr.reduce 进行数组的迭代计算, 接收 next pev
// 使用递归的思想实现的通过类名获取到相应的元素
function $(context, fnode) {
  context = context.trim();
  let strArr = context.split(' ');
  let len = strArr.length;
  let node = null;
  if (len > 1) {
    node = strArr.reduce((pev, next) => {
      // 在递归的过程中, 递归过程一直是在这个过程中实现的
      return $(next, pev);
    }, '');

  }
  // 如果递归结束， 使用 return 进行返回
  if (node) return node;
  switch (context.slice(0, 1)) {
    case '.':
      if (fnode) {
        fnode = [].slice.call(fnode).filter((node) => {
          if (node.getElementsByClassName(context.slice(1))) {
            return node.getElementsByClassName(context.slice(1))[0];
          }
        })
      }
      return document.getElementsByClassName(context.slice(1));
    break;
    case '#':
      return document.getElementById(context.slice(1));
    break;
  }
}
*/
