(function () {
  // ボタンと本体
  const openButton = document.getElementById('js-drawerOpen');
  const drawer = document.querySelector('.js-drawer');
  const closeButton = drawer.querySelector('#js-closeDrawer button');
  const backdrop = drawer.querySelector('.js-backdrop');
  const closeDrawerItems = document.querySelectorAll('.js-closeItem');
  // const main = document.getElementsByTagName('main')[0];
  // 現在の状態（開いていたらtrue）
  let drawerOpen = false;

  // stateは真偽値
  function changeAriaExpanded(state) {
    const value = state ? 'true' : 'false';
    drawer.setAttribute('aria-expanded', value);
    openButton.setAttribute('aria-expanded', value);
    closeButton.setAttribute('aria-expanded', value);
  }

  // stateは真偽値
  function changeState(state) {
    if (state === drawerOpen) {
      // console.log('2回以上連続で同じ状態に変更しようとしました');
      return;
    }
    changeAriaExpanded(state);
    drawerOpen = state;
  }

  function openDrawer() {
    changeState(true);
    bodyScrollPrevent(true);
  }

  function closeDrawer() {
    changeState(false);
    bodyScrollPrevent(false);
  }

  function onClickOpenButton() {
    openDrawer();
  }

  function onClickCloseButton() {
    closeDrawer();
  }
  function bodyScrollPrevent(flag) {
    let scrollPosition;
    const body = document.getElementsByTagName('body')[0];
    const ua = window.navigator.userAgent.toLowerCase();
    const isiOS =
      ua.indexOf('iphone') > -1 ||
      ua.indexOf('ipad') > -1 ||
      (ua.indexOf('macintosh') > -1 && 'ontouchend' in document);
    const scrollBarWidth = window.innerWidth - document.body.clientWidth;
    if (flag) {
      body.style.paddingRight = scrollBarWidth + 'px';
      if (isiOS) {
        scrollPosition = -window.pageYOffset;
        body.style.position = 'fixed';
        body.style.width = '100%';
        body.style.top = scrollPosition + 'px';
      } else {
        body.style.overflow = 'hidden';
      }
    } else if (!flag) {
      body.style.paddingRight = '';
      if (isiOS) {
        scrollPosition = parseInt(body.style.top.replace(/[^0-9]/g, ''));
        body.style.position = '';
        body.style.width = '';
        body.style.top = '';
        window.scrollTo(0, scrollPosition);
      } else {
        body.style.overflow = '';
      }
    }
  }

  openButton.addEventListener('click', onClickOpenButton, false);
  closeButton.addEventListener('click', onClickCloseButton, false);
  backdrop.addEventListener('click', onClickCloseButton, false);
  for (var i = 0; i < closeDrawerItems.length; i++) {
    closeDrawerItems[i].addEventListener('click', onClickCloseButton, false);
  }
})();
