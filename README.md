# alertify
Hack the North 2018 Project

### Streaming Video from the Turtlebot to Linux Debian (64 bit)
1. Run `$ sudo raspi-config` in terminal and use GUI to enable camera.
2. Run `$ sudo apt-get install vlc`
3. Run `$ raspivid -t 0 -o -hf -w 640 -h 360 -fps 25 | cvlc -vvv stream:///dev/stdin --sout '#standard{access=http, mux=ts,dst=:8090}' :demux=h264`
4. Open VLC and go to Media -> Open Network Stream -> http://{ADDRESS_OF_TURTLEBOT}:8090

### Fitbit Iconic Integration
- Uses Cloud Functions (Firebase) with HTTP Triggers for `GET` requests

Endpoint is: https://us-central1-alertify-34e6b.cloudfunctions.net/alert
Will return JSON object "Alerted that there has been a fall!" with status code 304.



