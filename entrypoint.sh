#!/bin/bash

gunicorn backend.app:app --bind 127.0.0.1:5000 &
nginx -g 'daemon off;'
