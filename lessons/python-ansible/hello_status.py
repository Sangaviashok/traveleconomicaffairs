#!/usr/bin/env python3
"""Tiny lesson script: Ansible will run this and read the printed JSON."""
import json
import os

place = os.environ.get("PLACE", "Bengaluru")
payload = {"ok": True, "message": f"Hello from {place}", "tool": "python"}
print(json.dumps(payload))
