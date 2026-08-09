---
title: 'Tool Guide: Setting Up Burp Suite for Web App Testing'
description: >-
  Comprehensive guide to configuring Burp Suite for web application penetration
  testing, including proxy setup, extensions, and workflows.
date: 2026-07-22T00:00:00.000Z
category: Tool Guides
tags:
  - burp-suite
  - web-security
  - proxy
  - penetration-testing
  - guide
platform: ''
difficulty: Easy
image: /images/htb-cypher/htb1.png
slug: tool-guide-burpsuite
dateModified: '2026-08-09'
---

# Prerequisites

- Burp Suite Community or Professional
- Java Runtime Environment (JRE)
- Browser with proxy support

## Installation

Download from [PortSwigger](https://portswigger.net/burp):

```bash
# Verify Java installation
java -version
```

## Configuration

### 1. Proxy Setup

1. Open Burp Suite
2. Go to **Proxy → Options**
3. Add proxy listener on `127.0.0.1:8080`

### 2. Browser Configuration

Configure your browser to use HTTP proxy `127.0.0.1:8080`.

### 3. Install Certificate

```bash
# In Burp: Proxy → Options → Import / export CA certificate
# Save as PEM format
# Import into browser trust store
```

## Essential Extensions

| Extension | Purpose |
|-----------|---------|
| Retire.js | Detects vulnerable JavaScript libraries |
| ActiveScan++ | Enhanced active scanning |
| JSON Web Token | JWT token manipulation |
| HTTP Request Smuggler | Request smuggling detection |

## Workflow

1. **Target → Scope** - Define target URLs
2. **Proxy → Intercept** - Capture requests
3. **Repeater** - Manual request manipulation
4. **Intruder** - Automated fuzzing
5. **Decoder** - Encode/decode payloads

## Tips

- Use **Invisible Proxy** for non-proxy-aware clients
- Configure **Match and Replace** rules for common tokens
- Export findings to HTML/XML for reports
