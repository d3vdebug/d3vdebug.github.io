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

Downloaded the challenge file and analyzed its properties:

```bash
file forensics-challenge.zip
exiftool forensics-challenge.zip
```

## Enumeration

Extracted the archive and found multiple files:

```bash
unzip forensics-challenge.zip
```

Discovered a suspicious image file and a memory dump.

## Exploitation

### Steganography

Extracted hidden data using `binwalk` and `steghide`:

```bash
binwalk image.png
steghide extract -sf image.png
```

### File Carving

Used `foremost` to recover deleted files from the memory dump:

```bash
foremost -t jpg,pdf -i memory.dump -o output/
```

## Flags

```
picoCTF{******************************}
```

## Lessons Learned

- Always check file signatures with `file` and `binwalk`
- Steganography tools: steghide, zsteg, stegsolve
- Memory analysis with volatility or rekall
