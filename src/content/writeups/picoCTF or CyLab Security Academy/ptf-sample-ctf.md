---
title: 'picoCTF 2025: Forensics Writeup'
description: >-
  Solving file forensics challenges including steganography, file carving, and
  memory analysis from picoCTF 2025.
date: 2026-07-30T00:00:00.000Z
category: picoCTF
tags:
  - picoctf
  - forensics
  - steganography
  - file-carving
  - ctf
platform: picoCTF
difficulty: Medium
image: /images/htb-cypher/htb1.png
slug: picoctf-forensics
dateModified: '2026-08-09'
---

# Reconnaissance

Downloaded the binary and checked protections:

```bash
checksec --file=vuln
file vuln
```

![image](https://github.com/user-attachments/assets/f299e8d5-b633-4285-9c5a-ad6428ecd6ad)
