import sendgrid
import os


def email_users():
    sg = sendgrid.SendGridAPIClient(apikey=os.environ.get('SENDGRID_API_KEY'))
    data = {
      "personalizations": [
        {
          "to": [
            {
              "email": "fan.huang.33@gmail.com"
            }
          ],
          "subject": "Sending sdfsdfsdfsdwith SendGrid is Fun"
        }
      ],
      "from": {
        "email": "kaiketsu@kaiketsu.com"
      },
      "content": [
        {
          "type": "text/plain",
          "value": "and easy to do anywhere, even with Python"
        }
      ]
    }
    response = sg.client.mail.send.post(request_body=data)
    print(response.status_code)
    print(response.body)
    print(response.headers)