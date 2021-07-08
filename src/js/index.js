import LocomotiveScroll from './modules/locomotive-scroll.min.js';

const scroll = new LocomotiveScroll({
  el: document.querySelector('[data-scroll-container]'),
  smooth: true,
  multiplier: 1, // スクロールの速度（値が小さいほど遅くなる）
});
