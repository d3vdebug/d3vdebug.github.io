---
title: "OverTheWire: Bandit Walkthrough"
description: "Complete walkthrough of OverTheWire Bandit wargame levels 0-15 covering SSH, file permissions, and basic Linux commands."
date: 2026-07-28
category: "OverTheWire"
tags: ["overthewire", "bandit", "linux", "ssh", "beginner"]
platform: "OverTheWire"
difficulty: "Easy"
image: "/images/htb-cypher/htb1.png"
---

# Reconnaissance

Connected to the Bandit server via SSH:

```bash
ssh bandit0@bandit.labs.overthewire.org -p 2220
```

Password: `bandit0`

## Levels 0-5: Basic File Reading and Permissions

### Level 0 → 1

```bash
cat readme
```

Password: `boJ9jbtu2iF0f3f5`

### Level 1 → 2

```bash
cat ./-
```

Password: `3q4t5y`

### Level 2 → 3

```bash
cat 'spaces in this filename'
```

Password: `CdiJowD`

### Level 3 → 4

```bash
cat inhere/.hidden
```

Password: `4N2N2d`

### Level 4 → 5

```bash
cat inhere/-file07
```

Password: `kgv4k2y`

## Levels 6-10: File Types and Special Permissions

### Level 5 → 6

```bash
find / -type f -user bandit6 -group bandit6 2>/dev/null
cat /var/lib/dpkg/info/bandit6.password
```

## Lessons Learned

- Always check for hidden files with `ls -la`
- Use `find` to locate files by user/group
- Check file permissions with `ls -l`
- Read man pages: `man <command>`
