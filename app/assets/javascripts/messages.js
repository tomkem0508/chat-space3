$(document).on('turbolinks:load', function(){
  // メッセージ表示のHTML生成
  function buildHTML(message) {
    var content = message.content ? `${ message.content }` : "";
    var image_url = (message.image_url) ? `<image class="lower-message_image" src="${ message.image_url }">` : "";
    var html = `<div class="message" id="${ message.id }">
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                      ${ message.name }
                    </div>
                    <div class="upper-message__date">
                      ${ message.date }
                    </div>
                  </div>
                  <div class="lower-message">
                    <p class="lower-message__content">
                      ${message.content}
                      ${image_url}
                    </p>
                  </div>
                </div>`
    return html;
  }
  // メッセージの非同期通信
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')

    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('#new_message')[0].reset();
      $('.form__submit').attr('disabled', false);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight });
    })
    .fail(function(data){
      alert('エラーが発生したためメッセージは送信できませんでした。');
      $('.form__submit').attr('disabled', false);
    })
  })
});