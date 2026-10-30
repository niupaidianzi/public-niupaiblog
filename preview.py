# -*- coding: utf-8 -*-
"""
牛排安逸的小屋 · 本地一键预览
启动静态服务器并自动打开浏览器。
用法：双击 start.bat，或命令行运行 python preview.py，Ctrl+C 退出
"""
import os
import socketserver
import threading
import webbrowser
from http.server import SimpleHTTPRequestHandler

PORT = 8000
LOCAL_URL = f"http://127.0.0.1:{PORT}"
# 切到脚本所在目录，保证服务的是网站根目录
os.chdir(os.path.dirname(os.path.abspath(__file__)))


class Handler(SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass  # 屏蔽请求日志，保持窗口干净


def main():
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("127.0.0.1", PORT), Handler) as httpd:
        print("=" * 48, flush=True)
        print("  牛排安逸的小屋 · 本地预览已启动", flush=True)
        print(f"  访问地址: {LOCAL_URL}", flush=True)
        print("  按 Ctrl+C 停止服务", flush=True)
        print("=" * 48, flush=True)
        threading.Timer(0.8, lambda: webbrowser.open(LOCAL_URL)).start()
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n服务已停止，再见！", flush=True)


if __name__ == "__main__":
    main()
