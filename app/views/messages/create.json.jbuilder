json.id @message.id
	json.content @message.content
	json.image_url @message.image_url
	json.date @message.created_at.strftime("%Y/%m/%d %H:%M")
	json.name @message.user.name