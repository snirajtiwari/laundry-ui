import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).ready(function() {
      $(".open-left").click(function(e) {
        e.stopPropagation();
        openLeftBar();
      });
    
    $("#sidebar-menu a").click(function(e) {
      e.stopPropagation();
      menuItemClick(e);
    });
    $("#btn-fullscreen").on('click', function() {
      toggle_fullscreen(document);
    });
     //$("#sidebar-menu ul li.has_sub a.active").parents("li:last").children("a:first").addClass("active").trigger("click");
     changeptype();
     initscrolls();
  });

    function openLeftBar(){
      $("#wrapper").toggleClass("enlarged");
      $("#wrapper").addClass("forced");

      if($("#wrapper").hasClass("enlarged") && $("body").hasClass("fixed-left")) {
        $("body").removeClass("fixed-left").addClass("fixed-left-void");
      } else if(!$("#wrapper").hasClass("enlarged") && $("body").hasClass("fixed-left-void")) {
        $("body").removeClass("fixed-left-void").addClass("fixed-left");
      }
      
      if($("#wrapper").hasClass("enlarged")) {
        $(".left ul").removeAttr("style");
      } else {
        $(".subdrop").siblings("ul:first").show();
      }
      
      toggle_slimscroll(".slimscrollleft");
      $("body").trigger("resize");
    }
    function toggle_slimscroll(item){
      if($("#wrapper").hasClass("enlarged")){
        $(item).css("overflow","inherit").parent().css("overflow","inherit");
        $(item). siblings(".slimScrollBar").css("visibility","hidden");
      }else{
        $(item).css("overflow","hidden").parent().css("overflow","hidden");
        $(item). siblings(".slimScrollBar").css("visibility","visible");
      }
  }
  function menuItemClick(e){    
    if(!$("#wrapper").hasClass("enlarged")){
      if($(e.target).parent().hasClass("has_sub")) {
        e.preventDefault();
      }   
      if(!$(e.target).hasClass("subdrop")) {
        // hide any open menus and remove all other classes
        $("ul",$(e.target).parents("ul:first")).slideUp(350);
        $("a",$(e.target).parents("ul:first")).removeClass("subdrop");
        $("#sidebar-menu .pull-right i").removeClass("mdi-minus").addClass("mdi-plus");
        
        // open our new menu and add the open class
        $(e.target).next("ul").slideDown(350);
        $(e.target).addClass("subdrop");
        $(".pull-right i",$(e.target).parents(".has_sub:last")).removeClass("mdi-plus").addClass("mdi-minus");
        $(".pull-right i",$(e.target).siblings("ul")).removeClass("mdi-minus").addClass("mdi-plus");
      }else if($(e.target).hasClass("subdrop")) {
        $(e.target).removeClass("subdrop");
        $(e.target).next("ul").slideUp(350);
        $(".pull-right i",$(e.target).parent()).removeClass("mdi-minus").addClass("mdi-plus");
      }
    } 
  }
  function toggle_fullscreen(document){
    var $this = this;
      var fullscreenEnabled = document.fullscreenEnabled || document.mozFullScreenEnabled || document.webkitFullscreenEnabled;
      if(fullscreenEnabled) {
        if(!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
          launchFullscreen(document.documentElement);
        } else{
          exitFullscreen(document);
        }
      }
  }
  function launchFullscreen(element){
    if(element.requestFullscreen) {
      element.requestFullscreen();
    } else if(element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if(element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if(element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  }
  function exitFullscreen(document){
    if(document.exitFullscreen) {
      exitFullscreen(document);
    } else if(document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if(document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
 
  function changeptype(){
    let w,h,dw,dh;
    w = $(window).width();
    h = $(window).height();
    dw = $(document).width();
    dh = $(document).height();

    if($.browser.mobile === true){
        $("body").addClass("mobile").removeClass("fixed-left");
    }

    if(!$("#wrapper").hasClass("forced")){
      if(w > 1024){
        $("body").removeClass("smallscreen").addClass("widescreen");
          $("#wrapper").removeClass("enlarged");
      }else{
        $("body").removeClass("widescreen").addClass("smallscreen");
        $("#wrapper").addClass("enlarged");
        $(".left ul").removeAttr("style");
      }
      if($("#wrapper").hasClass("enlarged") && $("body").hasClass("fixed-left")){
        $("body").removeClass("fixed-left").addClass("fixed-left-void");
      }else if(!$("#wrapper").hasClass("enlarged") && $("body").hasClass("fixed-left-void")){
        $("body").removeClass("fixed-left-void").addClass("fixed-left");
      }

  }
  toggle_slimscroll(".slimscrollleft");
  }
  function initscrolls(){
    if($.browser.mobile !== true){
      //SLIM SCROLL
      $('.slimscroller').slimscroll({
        height: 'auto',
        size: "5px"
      });

      $('.slimscrollleft').slimScroll({
          height: 'auto',
          position: 'right',
          size: "5px",
          color: '#7A868F',
          wheelStep: 5
      });
  }
}
  }

}
