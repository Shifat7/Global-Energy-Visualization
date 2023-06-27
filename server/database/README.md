# Instructions

From this directory build with `docker build -t energy .`

Run with `docker run -d --name energy_db -p 0.0.0.0:27022:27017/tcp energy`

Run detached with `docker run -d -p 127.0.0.1:27022:27017/tcp energy`.

Username: energy

Password: see the mongo-init file (change it if you want to)
