$(document).ready(function($) {
    if (Modernizr.localstorage) {
      $(document).on('click', '.dyslexic-off', function(e) {
        localStorage.setItem('fontStyle', true);
        $('.dyslexic-off').hide();
        $('.dyslexic-on').show();
        $('#discord-about-bio').css('line-height', '1.8');
        $('#formatting-example').css('line-height', '1.8');
        $('#extras-section-container').css('line-height', '2.1');
        $('#settings-block').css('margin-left', '111px');
        applyFontFamily('OpenDyslexic3');
      });
  
      $(document).on('click', '.dyslexic-on', function(e) {
        localStorage.removeItem('fontStyle');
        $('.dyslexic-on').hide();
        $('.dyslexic-off').show();
        applyFontFamily('Geologica Roman');
      });
  
      var is_fontStyle = localStorage.getItem('fontStyle');
  
      if (is_fontStyle === 'true') {
        console.log('fontStyle dyslexic');
        $('.dyslexic-off').hide();
        $('.dyslexic-on').show();
        $('#discord-about-bio').css('line-height', '1.8');
        $('#formatting-example').css('line-height', '1.8');
        $('#extras-section-container').css('line-height', '2.1');
        $('#settings-block').css('margin-left', '111px');
        applyFontFamily('OpenDyslexic3');
      } else if (!is_fontStyle) {
        console.log('fontStyle mono');
        $('.dyslexic-on').hide();
        $('.dyslexic-off').show();
        $('#discord-about-bio').css('line-height', '1.7');
        $('#formatting-example').css('line-height', '1.7');
        $('#extras-section-container').css('line-height', '1.7');
        $('#settings-block').css('margin-left', '121px');
        applyFontFamily('Geologica Roman');
      }
    }
  });
  
  function applyFontFamily(fontFamily) {
    $('body').css('font-family', fontFamily);
  }



  $(document).ready(function($){
    if (Modernizr.localstorage) {
      $(document).on('click', '.feel-modern', function(e) {
        localStorage.setItem('feel', true);
        $('.feel-modern').hide();
        $('.feel-retro').show();
        $('.icon-modern').css(`display`, `none`);
        $('.icon-retro').css(`display`, `inline`);
        $('#font_settings').css('display', 'none');
        applyFontFamily('noto sans mono');
      });
  
      $(document).on('click', '.feel-retro', function(e) {
        localStorage.removeItem('feel');
        localStorage.removeItem('fontStyle');
        $('.dyslexic-off').show();
        $('.dyslexic-on').hide();
        $('.feel-retro').hide();
        $('.feel-modern').show();
        $('.icon-modern').css(`display`, `inline`);
        $('.icon-retro').css(`display`, `none`);
        $('#font_settings').css('display', 'block');
        applyFontFamily('Geologica Roman');
      });
  
      var is_feel = localStorage.getItem('feel');
   
      if(is_feel === "true"){
        console.log('feel retro')
        $('.feel-modern').hide();
        $('.feel-retro').show();
        $('.icon-modern').css(`display`, `none`);
        $('.icon-retro').css(`display`, `inline`);
        $('#font_settings').css('display', 'none');
        applyFontFamily('noto sans mono');
      }   
      if(!is_feel){
        console.log('feel modern');
        $('.feel-retro').hide();
        $('.feel-modern').show();
        $('.icon-modern').css(`display`, `inline`);
        $('.icon-retro').css(`display`, `none`);
        $('#font_settings').css('display', 'block');
        applyFontFamily('Geologica Roman');
        }   
    } 
  });