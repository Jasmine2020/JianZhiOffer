function MyPromise(executor){
    // value 记录异步任务成功的执行结果
      this.value = null;
    // status 记录当前状态，初始化是 pending
      this.status = 'pending';
    // reason 记录异步任务失败的原因
      this.reason = null;
      
    // 缓存两个队列，维护 resolved 和 rejected 各自对应的处理函数
    this.onResolvedQueue = [];
    this.onRejectedQueue = [];
    
      var self = this;
      
      function resolve(value){
      if(self.status !== 'pending'){
        console.log('MyPromise,status is pending')
        return;
      }
          self.value = value;
          self.status = 'resolved';
          console.log('MyPromise,status change to resolved')
      setTimeout(()=>{
        console.log('MyPromise,setTimeout',self.onResolvedQueue)
        self.onResolvedQueue.forEach(resolved => resolved(self.value));
      });
      }
      
      function reject(reason){
      if(self.status !== 'pending'){
        return;
      }
      self.reason = reason;
      self.status = 'rejected';
      setTimeout(function(){
        self.onRejectedQueue.forEach(rejected => rejected(self.reason));
      })
    }
    // 把 resolve 和 reject 能力赋予执行器
    executor(resolve,reject);
  }


  // then方法接受两个入参，可选
MyPromise.prototype.then = function(onResolved,onRejected){
    // onResolved 和 onRejected必须是函数；如果不是，我们此处用一个透传来兜底
    if(typeof onResolved !== 'function'){
      onResolved = function(x){ return x };
    }
    if(typeof onRejected !== 'function'){
      onRejected = function(y){ return y };
    }
    
    var self = this;
    
    if(self.status === 'resolved'){
        console.log('then,onResolved')
      onResolved(self.value);
    }else if(self.status === 'rejected'){
      onRejected(self.reason);
    }else if(self.status === 'pending'){
        console.log('then,pending push')
      self.onResolvedQueue.push(onResolved);
      self.onRejectedQueue.push(onRejected);
    }
    
    return this;
  };


  const cutePromise = new MyPromise(function (resolve, reject) {
    resolve('成了！');
});
cutePromise.then((value) => {
    console.log(value)
    console.log('我是第 1 个任务')
}).then(value => {
    console.log('我是第 2 个任务')
});