$(document).ready(function () {

    //hide all descriptions
    $('.description').hide();

    function showFullHeight() {

       $('.gallery li').each(function() {

        $(this).find('.btn').click(function(e){

        console.log('Botão clicado');
        
        e.preventDefault();

         //NO MATTER WHAT WE CLOSE ALL OPEN SLIDES
            $('.description').slideUp('normal');

         //IF THE NEXT SLIDE WASN'T OPEN THEN OPEN IT
            if($(this).next().is(':hidden') == true) {
                
                //ADD THE ON CLASS TO THE BUTTON
                $(this).addClass('on');
                  
                //OPEN THE SLIDE
                $(this).next().slideDown('normal');



             } 
            
       }); //click
      });//each
    }//function


    //load the function when the doc is ready       
  showFullHeight();
  
});





$(function() {
  $(".img-w").each(function() {
    $(this).wrap("<div class='img-c'></div>")
    let imgSrc = $(this).find("img").attr("src");
     $(this).css('background-image', 'url(' + imgSrc + ')');
  })
            
  
  $(".img-c").click(function() {
    let w = $(this).outerWidth()
    let h = $(this).outerHeight()
    let x = $(this).offset().left
    let y = $(this).offset().top
    
    
    $(".active1").not($(this)).remove()
    let copy = $(this).clone();
    copy.insertAfter($(this)).height(h).width(w).delay(500).addClass("active1")
    $(".active1").css('top', y - 8);
    $(".active1").css('left', x - 8);
    
      setTimeout(function() {
    copy.addClass("positioned")
  }, 0)
    
  }) 
  
  

  
})

$(document).on("click", ".img-c.active1", function() {
  let copy = $(this)
  copy.removeClass("positioned active1").addClass("postactive1")
  setTimeout(function() {
    copy.remove();
  }, 500)
})