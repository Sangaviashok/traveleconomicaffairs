# Python + Ansible lesson

Lives in city-eats under `lessons/python-ansible/`. It is **not** used by the restaurant website (`npm run dev` / `src/`).

```
You -> playbook (YAML) -> python3 hello_status.py -> JSON -> Ansible debug
```

```bash
cd /Users/sangavia/city-eats/lessons/python-ansible
python3 hello_status.py
python3 -m pip install --user ansible-core
ansible-playbook hello.yml
```
