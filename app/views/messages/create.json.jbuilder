json.(@message, :content, :image_url)
json.date @message.created_at.strftime("%Y/%m/%d %H:%M")
json.name @message.user.name
json.id @message.id