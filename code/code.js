$(document).ready(function($) {
    if (Modernizr.localstorage) {
      $(document).on('click', '.dyslexic-off', function(e) {
        localStorage.setItem('fontStyle', true);
        $('.dyslexic-off').hide();
        $('.dyslexic-off').css('margin-bottom', '0px');
        $('.dyslexic-off').css('margin-top', '-8px');
        $('.dyslexic-on').show();
        $('.dyslexic-on').css('font-family', 'OpenDyslexic3');
        $('.dyslexic-on').css('margin-top', '-8px');
        $('.dyslexic-on').css('margin-bottom', '0px');
        $('#text').css('font-family', 'OpenDyslexic3');
        $('#listening-to-spotify-song').css('font-family', 'OpenDyslexic3');
        $('#listening-to-spotify-song').css('font-size', '22px');
        $('#listening-to-spotify-song').css('margin-top', '-6px');
        $('#listening-to-spotify-artist').css('font-family', 'OpenDyslexic3');
        $('#listening-to-spotify-artist').css('margin-top', '-62px');
        $('#listening-to-spotify-artist').css('height', '30px');
        $('#listening-to-spotify-song').css('max-height', '90px');
        $('#menu').css('font-family', 'OpenDyslexic3');
        $('.icon-modern').css('margin-right', '-16px');
        $('#theme-toggle').css('margin-top', '-8px');
        $('#theme-toggle').css('margin-bottom', '0px');
        $('.friends-on').css('margin-top', '-8px');
        $('.friends-on').css('margin-bottom', '0px');
        $('.friends-off').css('margin-top', '-8px');
        $('.friends-off').css('margin-bottom', '0px');
        $('#toggleButton').css('margin-top', '-8px');
        $('#toggleButton').css('margin-bottom', '0px');
      });
  
      $(document).on('click', '.dyslexic-on', function(e) {
        localStorage.removeItem('fontStyle');
        $('.dyslexic-on').hide();
        $('.dyslexic-on').css('margin-top', '5px');
        $('.dyslexic-on').css('margin-bottom', '20px');
        $('.dyslexic-off').show();
        $('.dyslexic-off').css('margin-bottom', '20px');
        $('.dyslexic-off').css('margin-top', '5px');
        
        $('#menu').css('font-family', 'Geologica Roman');
        $('#listening-to-spotify-artist').css('font-family', 'Geologica Roman');
        $('#text').css('font-family', 'Geologica Roman');
        $('#listening-to-spotify-song').css('font-family', 'Geologica Roman');
        $('.dyslexic-on').css('font-family', 'Geologica Roman');

        $('.icon-modern').css('margin-right', '0px');
        $('#theme-toggle').css('margin-top', '5px');
        $('#theme-toggle').css('margin-bottom', '20px');
        $('.friends-on').css('margin-top', '5px');
        $('.friends-on').css('margin-bottom', '20px');
        $('.friends-off').css('margin-top', '5px');
        $('.friends-off').css('margin-bottom', '20px');
        $('#toggleButton').css('margin-top', '5px');
        $('#toggleButton').css('margin-bottom', '20px');

        $('#listening-to-spotify-song').css('font-size', '26px');
        $('#listening-to-spotify-song').css('margin-top', '-4px');
        $('#listening-to-spotify-artist').css('margin-top', '-60px');
        $('#listening-to-spotify-artist').css('height', '24px');
        $('#listening-to-spotify-song').css('max-height', '66px');
        applyFontFamily('Geologica Roman');
      });
  
      var is_fontStyle = localStorage.getItem('fontStyle');
  
      if (is_fontStyle === 'true') {
        console.log('fontStyle dyslexic');
        $('.dyslexic-off').hide();
        $('.dyslexic-off').css('margin-bottom', '0px');
        $('.dyslexic-off').css('margin-top', '-8px');
        $('.dyslexic-on').show();
        $('.dyslexic-on').css('font-family', 'OpenDyslexic3');
        $('.dyslexic-on').css('margin-top', '-8px');
        $('.dyslexic-on').css('margin-bottom', '0px');
        $('#text').css('font-family', 'OpenDyslexic3');
        $('#listening-to-spotify-song').css('font-family', 'OpenDyslexic3');
        $('#listening-to-spotify-song').css('font-size', '22px');
        $('#listening-to-spotify-song').css('margin-top', '-6px');
        $('#listening-to-spotify-artist').css('font-family', 'OpenDyslexic3');
        $('#listening-to-spotify-artist').css('margin-top', '-62px');
        $('#listening-to-spotify-artist').css('height', '30px');
        $('#listening-to-spotify-song').css('max-height', '90px');
        $('#menu').css('font-family', 'OpenDyslexic3');
        $('.icon-modern').css('margin-right', '-16px');
        $('#theme-toggle').css('margin-top', '-8px');
        $('#theme-toggle').css('margin-bottom', '0px');
        $('.friends-on').css('margin-top', '-8px');
        $('.friends-on').css('margin-bottom', '0px');
        $('.friends-off').css('margin-top', '-8px');
        $('.friends-off').css('margin-bottom', '0px');
        $('#toggleButton').css('margin-top', '-8px');
        $('#toggleButton').css('margin-bottom', '0px');
      } else if (!is_fontStyle) {
        console.log('fontStyle mono');
        $('.dyslexic-on').hide();
        $('.dyslexic-on').css('margin-top', '5px');
        $('.dyslexic-on').css('margin-bottom', '20px');
        $('.dyslexic-off').show();
        $('.dyslexic-off').css('margin-bottom', '20px');
        $('.dyslexic-off').css('margin-top', '5px');
        
        $('#menu').css('font-family', 'Geologica Roman');
        $('#listening-to-spotify-artist').css('font-family', 'Geologica Roman');
        $('#text').css('font-family', 'Geologica Roman');
        $('#listening-to-spotify-song').css('font-family', 'Geologica Roman');
        $('.dyslexic-on').css('font-family', 'Geologica Roman');

        $('.icon-modern').css('margin-right', '0px');
        $('#theme-toggle').css('margin-top', '5px');
        $('#theme-toggle').css('margin-bottom', '20px');
        $('.friends-on').css('margin-top', '5px');
        $('.friends-on').css('margin-bottom', '20px');
        $('.friends-off').css('margin-top', '5px');
        $('.friends-off').css('margin-bottom', '20px');
        $('#toggleButton').css('margin-top', '5px');
        $('#toggleButton').css('margin-bottom', '20px');

        $('#listening-to-spotify-song').css('font-size', '26px');
        $('#listening-to-spotify-song').css('margin-top', '-4px');
        $('#listening-to-spotify-artist').css('margin-top', '-60px');
        $('#listening-to-spotify-artist').css('height', '24px');
        $('#listening-to-spotify-song').css('max-height', '66px');
        applyFontFamily('Geologica Roman');
      }
    }
  });
  
  function applyFontFamily(fontFamily) {
    $('body').css('font-family', fontFamily);
  }



  $(document).ready(function($){
    if (Modernizr.localstorage) {
      $(document).on('click', '.friends-on', function(e) {
        localStorage.setItem('feel', true);
        $('.friends-on').hide();
        $('.friends-off').show();
        $('#left_side_scrollable').css(`display`, `none`);
        $('#left_side_scrollable2').css(`display`, `none`);
      });
  
      $(document).on('click', '.friends-off', function(e) {
        localStorage.removeItem('feel');
        localStorage.removeItem('fontStyle');
        $('.friends-off').hide();
        $('.friends-on').show();
        $('#left_side_scrollable').css(`display`, `flex`);
        $('#left_side_scrollable2').css(`display`, `flex`);
      });
  
      var is_feel = localStorage.getItem('feel');
   
      if(is_feel === "true"){
        console.log('feel retro')
        $('.friends-on').hide();
        $('.friends-off').show();
        $('#left_side_scrollable').css(`display`, `none`);
        $('#left_side_scrollable2').css(`display`, `none`);
      }   
      if(!is_feel){
        console.log('feel modern');
        $('.friends-off').hide();
        $('.friends-on').show();
        $('#left_side_scrollable').css(`display`, `flex`);
        $('#left_side_scrollable2').css(`display`, `flex`);
        }   
    } 
  });