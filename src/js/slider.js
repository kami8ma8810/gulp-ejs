(function (c, b, a, d) {
  c(function () {
    var g = c(b).width();
    var m = c(b).height();
    var q;
    var e;
    var h;
    var l = c('.l-main__visual');
    var v = c('.top-kv-slider');
    var n = c('.slide-item', v);
    var f = c('.slide-pager', v);
    var u = 5000;
    var r = n.length;
    var p = 0;
    var s = 'transitionend webkitTransitionEnd oTransitionEnd mozTransitionEnd';
    c(b)
      .on('resize.kv', function () {
        q = c(b).width();
        e = c(b).height();
        if (c('.sp', v).css('display') == 'block') {
          h = true;
        } else {
          h = false;
        }
        if (h && g !== q) {
          l.height(e);
          g = q;
        } else {
          if (!h) {
            l.removeAttr('style');
          }
        }
      })
      .resize();
    if (h) {
      l.height(e);
    }
    var o = true;
    var j;
    var t;
    var k = 'next';
    function i() {
      var y = n.eq(p);
      c('.slide-visual span', n).off(s);
      c('.slide-meta', n).off(s);
      if (j) {
        j = clearTimeout(j);
      }
      if (t) {
        j = clearTimeout(j);
      }
      var x;
      n.not(y).css({
        'z-index': 0,
      });
      y.css({
        'z-index': r,
      });
      if (k == 'next') {
        x = p - 1;
        if (x < 0) {
          x = r - 1;
        }
      } else {
        x = p + 1;
        if (x > r - 1) {
          x = 0;
        }
      }
      n.eq(x).css({
        'z-index': 1,
      });
      c('.slide-visual', y).removeAttr('style');
      c('.slide-visual', y).removeClass('is-active');
      c('.slide-visual span', y).removeClass('is-active');
      c('.slide-meta', y).removeClass('is-active');
      c('.now', f).text(p + 1);
      t = setTimeout(function () {
        c('.slide-visual', y).addClass('is-active');
      }, 20);
      if (b.matchMedia('(max-width: 959px)').matches) {
        if (o) {
          c('.slide-visual', y).width('100%');
          o = false;
        }
      } else {
        if (b.matchMedia('(min-width:960px)').matches) {
          if (o) {
            c('.slide-visual', y).width('100%');
            o = false;
          }
        }
      }
      var w = c('.slide-meta', y).length;
      c('.slide-visual span', y).off(s);
      c('.slide-meta', y).addClass('is-active');
      c('.slide-meta', n).not(c('.slide-meta', y)).removeClass('is-active');
      j = setTimeout(function () {
        k = 'next';
        p++;
        if (p > r - 1) {
          p = 0;
        }
        requestAnimationFrame(function () {
          i();
        });
      }, u);
    }
    c('.now', f).text(p + 1);
    c('.max', f).text(r);
    c('.prev', f).on('click', function (w) {
      k = 'prev';
      p--;
      if (p < 0) {
        p = r - 1;
      }
      i();
    });
    c('.next', f).on('click', function (w) {
      k = 'next';
      p++;
      if (p > r - 1) {
        p = 0;
      }
      i();
    });
    i();
  });
})(jQuery, window, window.document);
