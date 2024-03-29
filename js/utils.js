
// 图片懒加载

function imgLazyLoadFu(className) {

    const divArr = [].slice.call(document.getElementsByClassName('lazy-bg'));
    const imgArr = [].slice.call(document.getElementsByClassName('lazy-img'));
    let imageObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                var dom = entry.target;
                dom.src = dom.getAttribute("data-src");
                dom.classList.remove("lazy-img");
                imageObserver.unobserve(dom);
            }
        });
    });
    let bgObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                var dom = entry.target;
                dom.style.backgroundImage = `url(${dom.getAttribute('data-src')})`
                dom.classList.remove("lazy-bg");
                bgObserver.unobserve(dom);
            }
        });
    });


    imgArr.forEach(image => {
        imageObserver.observe(image);
    });
    divArr.forEach(div => {
        bgObserver.observe(div);
    });
}