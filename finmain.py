import time
from slackclient import SlackClient

token = "xoxp-24611045604-24614642517-24620576849-1efaf3233d"
channelId = "C0QJ2PFQV"

#Slack Client here
sc = SlackClient(token)

#Connect to channel
print sc.api_call("chat.postinfo",channel=channelId)

#Post Welcome Message and publish my name
print sc.api_call("chat.postMessage", channel="#general", text=":tada: I am here to take care of you and repeat 1 character ;-) :tada:",username='Finbot', icon_emoji=':robot_face:')

#Listen to incoming messages and respond
if sc.rtm_connect():
	while True:
		str = sc.rtm_read()
#Intelligent Job to be done here for FinBot
		if len(str) == 0:
			time.sleep(1)
		elif len(str) < 2:
			sc.api_call("chat.postMessage", channel="#general", text="Not even two characters? U douchebag!",username='Finbot', icon_emoji=':robot_face:')
		else:
			sc.api_call("chat.postMessage", channel="#general", text=str[0],username='Finbot', icon_emoji=':robot_face:')
		time.sleep(1)
else:
	print "Connection failed"