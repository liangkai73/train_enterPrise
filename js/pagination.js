
class lk_pagination {
    constructor(targetDom, options) {
        const { size = 8, total = 0, handleCb, active = 1 } = options;
        this.size = size;
        this.total = total;
        this.handleCb = handleCb;
        this.targetDom = targetDom;
        this.DomTree = {
            ul: '',
            size: '',
            pre: '',
            pageNum: '',
            next: '',
            jump: '',
        }

        this._active;

        this.init();
        this.active = active;
    }
    //     <div class="lk-pagination w-full my-5 flex flex-row justify-center">
    //     <ul class="flex flex-row w-full justify-center">
    //       <li class="flex flex-row">
    //         <select name="" id="" class="cursor-pointer">
    //           <option value="8">每页8个</option>
    //           <option value="16">每页16个</option>
    //           <option value="24">每页24个</option>
    //         </select>
    //       </li>
    //       <li class="mx-5 page-pre cursor-pointer">上一页</li>
    //       <li class="mx-3 page-child cursor-pointer">1</li>
    //       <li class="mx-3 page-child cursor-pointer">2</li>
    //       <li class="mx-3 page-child cursor-pointer">3</li>
    //       <li class="mx-5 page-next cursor-pointer">下一页</li>
    //       <li class="mx-5 page-jump cursor-pointer">跳转</li>
    //       <li>
    //         <input
    //           class="w-[50px] px-1 border border-[#000] rounded-sm"
    //           type="number"
    //           min="1"
    //           max="3"
    //           placeholder="页码"
    //         />
    //       </li>
    //     </ul>
    //   </div>
    //    初始化
    set active(num) {
        if (typeof (num) != 'number') {
            return console.error('页面跳转数据类型错误');
        }
        this._active = num;

        this._jumpTo(num)
    }
    get active() {
        return this._active;
    }
    init() {
        this.getDomSize();
        this.getDomPreNext();
        this.getDomPageNum();
        this.getDomJump();
        this.createPagination();
        return this
    }
    // 跳转显示到某页;
    _jumpTo(num) {
        let maxPage = Math.ceil(this.total / this.size);
        if (num > maxPage) {
            console.error('页码限制,最大为' + maxPage)
            return
        }
        this.DomTree.pageNum.forEach(el => {
            el.classList.remove('text-[#ff350d]')
        })
        this.DomTree.pageNum[num - 1].classList.add('text-[#ff350d]');
        window.location.hash = num;
        let params = {
            size: this.size,
            page: this.active
        }

        this.handleCb(params);


    }
    // 分页选择器
    getDomSize() {
        const { size } = this;
        let li = document.createElement('li');
        li.classList.add(['flex', 'flex-row']);
        li.innerHTML = `
        <select name="" id="" class="cursor-pointer">
                ${[1, 2, 3, 4].map(i => ` <option value="${8 * i}">每页${8 * i}个</option>`).join('')}
        </select>
        `
        this.DomTree.size = li;

        const changeFn = (e) => {
            let newSize = e.target.options[e.target.selectedIndex].value;
            if (newSize != this.size) {
                this.size = newSize;
                this.DomTree.pageNum.forEach((el) => {
                    this.DomTree.ul.removeChild(el);
                })
                this.getDomPageNum();
                let f = document.createDocumentFragment();
                this.DomTree.pageNum.forEach(el => {
                    f.appendChild(el)
                })
                this.DomTree.ul.insertBefore(f, this.DomTree.next);


                this.DomTree.jump[1].children[0].max = Math.ceil(this.total / newSize);
                this.DomTree.jump[1].children[0].value = 1;
                this.active = 1;
            }
        }
        li.children[0].removeEventListener('change', changeFn)
        li.children[0].addEventListener('change', changeFn)





    }
    // 上一页|下一页
    getDomPreNext() {
        let pre = document.createElement('li');
        pre.classList.add('mx-5', 'page-pre', 'cursor-pointer', 'hover:text-[#ff350d]');
        pre.innerHTML = '上一页';
        let next = document.createElement('li');
        next.classList.add('mx-5', 'page-next', 'cursor-pointer', 'hover:text-[#ff350d]');
        next.innerHTML = '下一页';

        pre.addEventListener('click', () => {
            if (this.active < 2) return
            this.active = (this.active - 1);
        })
        next.addEventListener('click', () => {
            if (this.active >= this.DomTree.pageNum.length) return
            this.active = (this.active + 1);
        })
        this.DomTree.pre = pre;
        this.DomTree.next = next;
    }
    // 页面生成
    getDomPageNum() {
        let arr = [];
        let totalNum = Math.ceil(this.total / this.size);

        for (let i = 1; i <= totalNum; i++) {
            let li = document.createElement('li');
            li.setAttribute('dataNum', i);
            li.classList.add('mx-3', 'page-child', 'cursor-pointer', 'hover:text-[#ff350d]');
            if (this.active == i) {
                li.classList.add('text-[#ff350d]')
            }
            li.innerHTML = i

            li.addEventListener('click', (e) => {
                let num = e.target.getAttribute('dataNum');
                this.active = num * 1;

            })

            arr.push(li);
        }

        this.DomTree.pageNum = arr;

    }
    // 跳转
    getDomJump() {
        const { size } = this;
        let totalNum = Math.ceil(this.total / size);
        let Fragment = [];
        let li1 = document.createElement('li');
        let li2 = document.createElement('li');

        li1.classList.add('mx-5', 'page-jump', 'cursor-pointer', 'hover:text-[#ff350d]');
        li1.innerHTML = '跳转';
        li2.innerHTML = `
       <input
                 class="w-[50px] px-1 border border-[#000] rounded-sm"
                 type="number"
                 min="1"
                 max="${totalNum}"
                 placeholder="页码"
                 />
        
       `

        li1.addEventListener('click', e => {
            let val = li2.children[0].value;
            this.active = val * 1
        })

        li2.children[0].addEventListener('blur', e => {
            const max = e.target.getAttribute('max');
            const min = e.target.getAttribute('min');

            if (e.target.value > (max * 1)) {
                e.target.value = max * 1
            }
            if (e.target.value < (min * 1)) {
                e.target.value = min * 1
            }
        })


        Fragment.push(li1);
        Fragment.push(li2);
        this.DomTree.jump = Fragment
    }
    // 构造pagination容器
    createPagination() {
        let ul = document.createElement('ul');
        ul.classList.add('flex', 'flex-row', 'w-full', 'justify-center');
        let Fragment = document.createDocumentFragment();

        Fragment.appendChild(this.DomTree.size);
        Fragment.appendChild(this.DomTree.pre);
        this.DomTree.pageNum.forEach(el => {
            Fragment.appendChild(el)
        });
        Fragment.appendChild(this.DomTree.next);
        this.DomTree.jump.forEach(el => {
            Fragment.appendChild(el)
        });

        ul.append(Fragment);
        this.targetDom.innerHTML = '';
        this.targetDom.appendChild(ul);
        this.DomTree.ul = ul;
    }
}

