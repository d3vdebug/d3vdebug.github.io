---
title: 'CTF Walkthrough: CyberApoc'
description: >-
  PWN challenge involving buffer overflow with NX bypass using ret2libc on a
  64-bit Linux binary.
date: 2026-08-03T00:00:00.000Z
category: picoCTF
tags:
  - ctf
  - linux
platform: PicoCTF
difficulty: Hard
image: >-
  https://github.com/user-attachments/assets/f299e8d5-b633-4285-9c5a-ad6428ecd6ad
slug: ptf-sample-ctf
dateModified: '2026-08-09'
---

# Reconnaissance

Downloaded the binary and checked protections:

```bash
checksec --file=vuln
file vuln
```

![image](https://github.com/user-attachments/assets/f299e8d5-b633-4285-9c5a-ad6428ecd6ad)
