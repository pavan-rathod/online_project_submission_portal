jQuery(window).load(function () {
    setTimeout(function () {
		link = $('a[href="'+window.location.href+'"]');
		item=link.parents("li").addClass("active");
		//item.parents('ul').css("display","block");
		//item.children('a').addClass("active toggled");
    }, 10);

});

 