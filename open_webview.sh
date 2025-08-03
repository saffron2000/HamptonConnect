#!/bin/bash
echo 'Opening webview...'
python3 -c "
import webbrowser
import time
time.sleep(1)
webbrowser.open('http://localhost:5000')
"
