/**
 * Created by dell-dell on 2017/9/19.
 */
// 相关需要的 css html 引入到 js 文件, 统一进行打包
// 这里是系统的所有文件的入口文件, 导入html 实现 html 文件的自动更新
import '../CSS/main.css';
import '../public/index.html';
/**
 * @description 根据路由变化控制显示内容
 * @param {String} path: 表示变化的路由路径
 * @param { function } func: 路由变化之后的回调函数
 *
 * **/
function Router(path, func) {
  this.path = path;
  this.fn = func;
}
Router.prototype = {
  getUrl: function () {
    let that = this;
    window.addEventListener('hashchange', function () {
      if (location.hash === that.path) {
        that.fn();
      }
    })
  }
};

// 增加新事件，跳转到事件编辑页面
let toWrite = new Router('#/addNew', function () {
  let addNew = new TogShow(['write'], ['things']);
  addNew.togDisplay();
  $('write')[0].innerHTML = '';
  // do something
  let newObj = new DosAction();
  newObj.itemEdit();
});
toWrite.getUrl();

/**
 * @description 获取到已完成的事件和未完成的事件
 * @return {Object} 表示事件的集合
 *
 * **/
function getThings() {
  let things = {};
  let addNew = new TogShow(['things'], ['write']);
  addNew.togDisplay();
  let noDoneThing = new Storage('noDone');
  let doneThing = new Storage('done');
  let getNoDone = noDoneThing.get() || [];
  let getDone = doneThing.get() || [];
  things.getDone = getDone;
  things.getNoDone = getNoDone;
  return things;
}

// 获取到全部的事件

let getAll = new Router('#/all', function () {
  $('all')[0].innerHTML = '';
  getThings().getNoDone.map((item, index) => {
    let i = new Additems(item.title, item.con, item.statu, index);
    $('all')[0].appendChild(i.addItems());
  });
  getThings().getDone.map((item, index) => {
    let i = new Additems(item.title, item.con, item.statu, index);
    $('all')[0].appendChild(i.addItems());
  })
});

getAll.getUrl();

// 获取到已完成的事件

let getDone = new Router('#/done', function () {
  $('all')[0].innerHTML = '';
  getThings().getDone.map((item, index) => {
    let i = new Additems(item.title, item.con, item.statu, index);
    $('all')[0].appendChild(i.addItems());
  })
});
getDone.getUrl();

// 获取到未完成的事件

let getNoDone = new Router('#/notDone', function () {
  $('all')[0].innerHTML = '';
  getThings().getNoDone.map((item, index) => {
    let i = new Additems(item.title, item.con, item.statu, index);
    $('all')[0].appendChild(i.addItems());
  })
});

getNoDone.getUrl();

// 编辑页面取消编辑，调回事项列表
let cancelWrite = new Router('#/main', function () {
  let cancel = new TogShow(['things'], ['write']);
  cancel.togDisplay();
});
cancelWrite.getUrl();

// 确认编辑，保存编辑内容，跳回事项列表// 使用storage 进行存储
let ensureWrite = new Router('#/ensure', function () {
  let ensure = new TogShow(['things'], ['write']);
  ensure.togDisplay();
});
ensureWrite.getUrl();

/**
 * @description 用于添加事项
 * @param {String}: {
 *  tit: 事项的标题
 *  con: 事项的内容
 *  statu: 事项的状态 ‘Done’ or ‘noDone’
 *  key: 表示事项的标识
 *
 * }
 *
 * **/

function Additems(tit, con, statu, key) {
  this.cl = 'write';
  this.tit = tit;
  this.con = con;
  this.statu = statu;
  this.key = key;
}
Additems.prototype = {
  addItems: function () {
    let that = this;
    let input = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    let div1 = document.createElement('div');
    div1.appendChild(input);
    let Ospan = document.createElement('span');
    Ospan.innerText = that.tit;
    let div2 = document.createElement('div');
    div2.appendChild(Ospan);
    let arr = (that.statu === 'done' ? ['编辑', '查看', '删除'] : ['编辑', '查看', '删除', 'Done']);
    let div3 = document.createElement('div');
    arr.map((item, index) => {
      let a = document.createElement('a');
      a.innerText = item;
      a.onclick = function () {
        let w = document.getElementsByClassName('write')[0];
        w.innerHTML = '';
        if (index === 0) {
          // 编辑页面
          a.setAttribute('href', '#/edit');
          let toEdit = new Router('#/edit', function () {
            let addNew = new TogShow(['write'], ['things']);
            addNew.togDisplay();
            $('write')[0].innerHTML = '';
            // do something
            let newObj = new DosAction(that.tit, that.con, that.key);
            newObj.itemEdit();
          });
          toEdit.getUrl();
        }
        if (index === 1) {
          a.setAttribute('href', '#/view');
          let toView = new Router('#/view', function () {
            let addNew = new TogShow(['write'], ['things']);
            addNew.togDisplay();
            $('write')[0].innerHTML = '';
            let viewObj = new DosAction(that.tit, that.con, that.key);
            viewObj.itemDetail();
          });
          toView.getUrl();
        }
        if (index === 2) {
          // 進行刪除操作,
          let delAct = new Storage(that.statu, that.key);
          delAct.del();
          div.parentNode.removeChild(div);
        }
        if (index === 3) {
          a.parentNode.removeChild(a);
          let doneThing = new Storage('done', '', that.tit, that.con);
          doneThing.set();
          let delnoDone = new Storage('noDone', that.key);
          delnoDone.del();
        }
        getAll.getUrl();
        let nowLocat = location.hash;
        location.hash = '/';
        location.hash = nowLocat;
      };
      div3.appendChild(a);
    });
    let div = document.createElement('div');
    div.className = 'item';
    let divArr = [div1, div2, div3];
    divArr.map((item) => {
      div.appendChild(item)
    });
    return div;
  }
};

/**
 * @description 用来进行存储操作， 进行操作内容的获得，设置 删除
 * @param {String} statu: 表示事项的状态
 * @param {String} key: 表示事项的标识
 * @param {String} tit: 事件的标题
 * @param {String} con: 表示事件的内容
 * **/
function Storage(statu, key, tit, con) {
  // key 用来标记存储的内容
  this.tit = tit;
  this.con = con;
  this.statu = statu;
  this.key = key;
  this.value = {title: this.tit, con: this.con, statu: this.statu}
}
// set 保存内容，需要判断 item 是否已经存在
Storage.prototype = {
  set: function () {
    let that = this;
    let dataArr = sessionStorage.getItem(that.statu) ? JSON.parse(sessionStorage.getItem(that.statu)) : [];
    that.value.statu = that.statu;
    if (that.key || that.key === 0) {
      dataArr[that.key] = that.value;
    } else {
      that.value.key = dataArr.length;
      dataArr[dataArr.length] = that.value;
    }
    sessionStorage.setItem(that.statu, JSON.stringify(dataArr));
  },
  // 删除操作, 如何判断删除的是哪一个？
  del: function () {
    let that = this;
    let store = that.get() || [];
    store.map((item, index) => {
      if (index === that.key) {
        store.splice(that.key, 1)
      }
    });
    sessionStorage.setItem(that.statu, JSON.stringify(store));
  },
  get: function () {
    let that = this;
    // 返回的是一个数组对象，数组中保存着对象的内容
    let data = JSON.parse(sessionStorage.getItem(that.statu));
    return data;
  }
};

/**
 * @description 编辑页面的操作
 *
 * @param {String} tit: 事件的标题
 * @param {String} con: 事件的内容
 * @param {String} key: 事件的标识
 * **/

let DosAction = function (tit = '', con = '', key) {
  this.tit = tit;
  this.con = con;
  this.key = key;
  this.cl = 'write';
};

DosAction.prototype = {
  itemEdit: function () {
    let that = this;
    let div = c('div');
    let titInput = c('input');
    titInput.setAttribute('type', 'text');
    titInput.className = 'editTit';
    titInput.value = that.tit;
    titInput.setAttribute('placeholder', '请输入标题');
    let body = c('textarea');
    body.value = that.con;
    body.className = 'editBody';
    body.setAttribute('placeholder', '请输入内容');
    let actArr = ['取消', '确定'];
    let arrP = c('p');
    actArr.map((item, index) => {
      let act = c('a');
      act.onclick = function () {
        // 编辑确定按钮
        if (index === 1) {
          // 这里过于耦合
          let save = new Storage('noDone', that.key, titInput.value, body.value);
          save.set();
          let delDone = new Storage('done', that.key);
          delDone.del();
        }
        act.setAttribute('href', '#/all');
      };
      act.innerText = item;
      arrP.appendChild(act);
    });
    div.appendChild(titInput);
    div.appendChild(body);
    div.appendChild(arrP);
    $(that.cl)[0].appendChild(div);
  },
  itemDetail: function () {
    let that = this;
    let tit = c('p');
    tit.className = 'thingTitle';
    let back = c('p');
    let backLink = c('a');
    backLink.innerText = '返回';
    backLink.setAttribute('href', '#/all');
    let con = c('div');
    tit.innerText = that.tit;
    con.innerText = that.con;
    con.className = 'thingContent';
    $(that.cl)[0].appendChild(tit);
    $(that.cl)[0].appendChild(con);
    back.appendChild(backLink);
    $(that.cl)[0].appendChild(back);
  }
};

/**
 * @description 控制元素的显示和隐藏
 * @param {string} showClass: 要显示的元素样式
 * @param {string} hideClass: 要隐藏的元素样式
 *
 *
 * **/
function TogShow(showClass, hideClass) {
  this.showItem = showClass;
  this.hideItem = hideClass;
}
TogShow.prototype = {
  togDisplay: function () {
    let that = this;
    let allItems = [...that.showItem, ...that.hideItem];
    allItems.map((item) => {
      document.getElementsByClassName(item)[0].style.display = 'none';
    });
    that.showItem.map((item) => {
      document.getElementsByClassName(item)[0].style.display = 'block';
    });
  }
};

// 对于切换是否完成的选项进行操作
let links = document.getElementsByClassName('nav')[0];
let linksa = links.getElementsByTagName('a');

let linkArr = [].slice.call(linksa);

linkArr.map((item, index, arr) => {
  item.onclick = function () {
    arr.map((its) => {
      its.className = '';
    });
    item.className = 'active';
  }
});

function $(name) {
  return document.getElementsByClassName(name);
}
function c(tag) {
  return document.createElement(tag)
}
