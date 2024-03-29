"use strict";

class swiperInstance {
    constructor(options) {
        this.delay = options.delay || 5000;
        this.itemArr = options.itemArr || [];
        this.index;
        this._index;
        this._timer
        this.init();

    }
    init() {
        this._watchIndex();
        if (this.index === undefined) {
            this.index = 0;
        }
        this._createTimer();
        this._mouseEvenLoad();
        this._contralCreate();

    }
    // 绑定监听key
    _watchIndex() {
        let _this = this;
        Object.defineProperty(_this, 'index', {
            get: () => {
                return _this._index;
            },
            set: (num) => {
                _this._index = num;
                _this.changeItem(num)
            }
        })
    }
    // 创建轮询
    _createTimer() {
        let _this = this;
        if (this._timer) return
        _this.itemArr
        this._timer = setInterval(() => {

            this.index < _this.itemArr.length - 1 ? this.index += 1 : this.index = 0
        }, this.delay + 500)
    }
    // dom操作
    changeItem() {
        this.itemArr.map((node, index) => {
            if (index == this.index) {
                setTimeout(() => {
                    this.itemArr[index].classList.add("opacity-100");
                    this.itemArr[index].querySelectorAll('p').forEach(element => {
                        element.style.display = 'block'
                    });
                }, 300)

            } else {
                // this.itemArr[index].classList.add("opacity-0", "z-10");
                this.itemArr[index].classList.remove("opacity-100");
                this.itemArr[index].querySelectorAll('p').forEach(element => {
                    element.style.display = 'none'
                });

            }
        })
    }
    // 鼠标悬停事件
    _mouseEvenLoad() {
        let _this = this;
        let clearTimer = () => {
            if (this._timer) {
                clearInterval(this._timer);
                this._timer = null;
            }
        }
        this.itemArr.forEach(node => {
            node.addEventListener("mouseenter", clearTimer);
            node.addEventListener("mouseleave", function () {
                this._createTimer();
            }.bind(_this))
        })
    }
    // 控制器生成
    _contralCreate() {
        let div = document.createElement('div');
        div.classList.add('swiper-contral');
        this.itemArr.forEach((item, index) => {
            let node = document.createElement('div');
            node.classList.add('swiper-contral-item', 'cursor-pointer');
            node.setAttribute('node_id', index);
            node.addEventListener('click', (e) => {
                let index = e.target.getAttribute('node_id')
                this.jumpTopage(index)
            })
            div.append(node);
        })
        this.itemArr[0].parentNode.append(div);
    }
    // 跳转到某一页
    jumpTopage(num) {
        if (num > this.itemArr.length) {
            num = Math.floor(num / this.itemArr.length)
        }
        clearInterval(this._timer);
        this._timer = null;
        this.index = num;
        this._createTimer()

    }
}
let options = {
    delay: 5000,
    itemArr: [].slice.call(document.getElementsByClassName("swiper-item"))
}
window.swiper = new swiperInstance(options);