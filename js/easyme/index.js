(function(){
    $(function(){
        $(window).scrollwatch({
            offset : 550,
            on : function(){
                var h = $(".navbar").outerHeight();
                $(".navbar").after($("<div class='clearfix'></div>").height(h));
                $(".navbar").toggleClass('navbar-fixed-top',true);
            },
            off : function(){
                $(".navbar").siblings('.clearfix').remove();
                $(".navbar").toggleClass('navbar-fixed-top',false);
            }
        })
        $("#slideshow-data").nivoSlider({
            effect : 'fade',
            directionNav : false,
            controlNav: false
        });
    });
})()