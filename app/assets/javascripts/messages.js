$(function(){
  // メッセージ表示のHTML生成
  function buildHTML(message) {
    var content = message.content ? `${ message.content }` : "";
    var image_url = (message.image_url) ? `<image class="lower-message_image" src="${ message.image_url }">` : "";
    var html = `<div class="message" data-message-id="${ message.id }">
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
                      ${content}
                    </p>
                      ${image_url}
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

//自動更新
  $(function(){
    setInterval(autoUpdate, 3000);
  });
  function autoUpdate() {
    if (location.href.match(/\/groups\/\d+\/messages/)) {
      var last_message_id = $('.message').last().data('message-id');
      $.ajax({
        url: 'api/messages',
        type: 'GET',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        if (messages.length !== 0) {
          messages.forEach(function(message) {
          var html = buildHTML(message);
            $('.messages').append(html);
            $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
          });
        }
       })
       .fail(function(){
        alert("自動メッセージ取得に失敗しました");
      })
    } else {
      clearInterval(autoUpdate);
    }
  };
});