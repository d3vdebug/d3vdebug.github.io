---
title: "TryHackMe: Mr. Robot CTF"
description: "Complete Mr. Robot themed CTF on TryHackMe involving web enumeration, WordPress exploitation, and privilege escalation."
date: 2026-08-01
category: "TryHackMe"
tags: ["tryhackme", "linux", "wordpress", "cms", "privilege-escalation"]
platform: "TryHackMe"
difficulty: "Easy"
image: "/images/htb-cypher/htb1.png"
---

# Reconnaissance

```bash
nmap -sC -sV -oA mr-robot 10.10.11.XXX
```

| Port | Service | Version |
|------|---------|---------|
| 80 | HTTP | Apache httpd |
| 443 | HTTPS | Apache httpd |

## Enumeration

Used `dirb` to find hidden directories:

```bash
dirb http://10.10.11.XXX /usr/share/wordlists/dirb/common.txt
```

Found WordPress installation and a robots.txt file containing interesting entries.

## Exploitation

Enumerated WordPress users and exploited a vulnerability:

```bash
wpscan --url http://10.10.11.XXX -e u
```

Used the obtained credentials to log in and get a shell via the theme editor.

## Privilege Escalation

Found SUID binary and misconfigured permissions:

```bash
find / -perm -4000 2>/dev/null
```

## Flags

```
flag1: ******************************
flag2: ******************************
flag3: ******************************
```

## Remediation

- Keep WordPress core and plugins updated
- Remove unused themes and plugins
- Restrict file editing in wp-config.php
