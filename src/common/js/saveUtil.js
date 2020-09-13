/**
 * Created by Administrator on 2019/9/16.
 */
export function saveToLocal(id,key,value){
  let info = window.localStorage._info_;
  if(!info){
    info = {};
    info[id] = {};
  }else{
    info = JSON.parse(info);
    if (!info[id]) {
      info[id] = {};
    }
  }
  info[id][key] = value;
  window.localStorage._info_ = JSON.stringify(info);
}

export function loadFromLocal(id,key,def){
  let info = window.localStorage._info_;
  if (!info) {
    return def;
  }
  info = JSON.parse(info)[id];
  if (!info) {
    return def;
  }
  let ret = info[key];
  return ret || def;
}
