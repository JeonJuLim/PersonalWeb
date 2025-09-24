// IntersectionObserver to toggle .is-inview on .reveal elements
(function(){
    const items = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window) || !items.length) return;
    const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
    if (e.isIntersecting) {
    e.target.classList.add('is-inview');
    io.unobserve(e.target);
    }
    })
    }, { rootMargin: '0px 0px -10% 0px', threshold: .1 });
    items.forEach(el=>io.observe(el));
    })();