"use strict";!function(){if(navigator.userAgent.match(/(iPhone|iPad|iPod|Android)/i))return;document.addEventListener("contextmenu",function(e){return e.preventDefault()})}(),$(document).ready(function(n){n('a[href^="#"]').click(function(){var e=n("header").height(),t=n(this).attr("href"),i=n("#"==t||""==t?"html":t).offset().top-e-70;return n("html, body").animate({scrollTop:i},800,"swing"),!1}),n(function(){var t=0;n(window).on("scroll",function(){var e=n(this).scrollTop();e<t||0==e?n("#js-headerChange").removeClass("is-change"):n("#js-headerChange").addClass("is-change"),t=e})}),n(function(){n(".js-openImgModal").on("click",function(){var e=n(this).next();n(e).fadeIn()}),n(".js-closeImgModal").on("click",function(){n(".js-modalContent").fadeOut(function(){})})}),n(function(){n(".gallery-container").magnificPopup({delegate:"a",type:"image",gallery:{enabled:!0}})})});var memoriesSlider=new Swiper(".js-memoriesSlider",{loop:!0,loopedSlides:5,loopAdditionalSlides:7,speed:1e3,slidesPerView:1.69,spaceBetween:10,centeredSlides:!0,simulateTouch:!1,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},breakpoints:{992:{slidesPerView:3.42}}}),movieSlider=new Swiper(".js-movieSlider",{loop:!0,loopedSlides:3,loopAdditionalSlides:5,speed:1e3,slidesPerView:1.137,spaceBetween:80,centeredSlides:!0,simulateTouch:!1,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},breakpoints:{992:{slidesPerView:1,spaceBetween:10}}}),reportSlider=new Swiper(".js-reportSlider",{loop:!0,loopedSlides:8,loopAdditionalSlides:10,speed:1e3,slidesPerView:1.75,spaceBetween:20,centeredSlides:!0,simulateTouch:!1,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},breakpoints:{992:{slidesPerView:3.465}}}),podcastSlider=new Swiper(".js-podcastSlider",{loop:!0,loopedSlides:3,loopAdditionalSlides:5,speed:1e3,slidesPerView:1.13,spaceBetween:80,centeredSlides:!0,simulateTouch:!1,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"}});document.addEventListener("DOMContentLoaded",function(){for(var r=document.querySelectorAll(".js-tabTrigger"),s=document.querySelectorAll(".js-tabTarget"),e=0;e<r.length;e++)r[e].addEventListener("click",function(e){for(var t=e.currentTarget,i=document.getElementById(t.dataset.id),n=0;n<r.length;n++)r[n].classList.remove("is-active");t.classList.add("is-active");for(var o=0;o<s.length;o++)s[o].classList.remove("is-active");null!==i&&i.classList.add("is-active")})}),function(){var o=window.innerHeight;function e(){o=window.innerHeight}window.addEventListener("load",e),window.addEventListener("resize",e);var t=document.querySelectorAll(".para-item");function i(){t.forEach(function(e,t){e.style.transform="";var i=e.getBoundingClientRect().top-o,n=e.getAttribute("data-reg")?Number(e.getAttribute("data-reg")):-5;i<0&&(e.style.transform="translate(0,"+i/n+"px)")})}(t=Array.prototype.slice.call(t,0)).length&&(i(),window.addEventListener("load",i),window.addEventListener("resize",i),window.addEventListener("scroll",i,{passive:!0}))}();