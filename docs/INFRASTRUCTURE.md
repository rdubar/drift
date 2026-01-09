# Drift Infrastructure

Technical documentation for drift.blog setup.

---

## Domain

| Item | Detail |
|------|--------|
| Domain | drift.blog |
| Registrar | 123-reg |
| Nameservers | Cloudflare (`lloyd.ns.cloudflare.com`, `teresa.ns.cloudflare.com`) |

---

## Hosting

| Item | Detail |
|------|--------|
| Platform | Cloudflare Pages |
| Project | `drift-3h4` |
| Account | rdubar's Google login to Cloudflare |
| URL | drift-3h4.pages.dev (proxied via drift.blog) |

---

## Email

| Item | Detail |
|------|--------|
| Provider | Krystal Hosting |
| Server | roshi-lon.krystal.uk |
| Mailbox | info@drift.blog |
| Webmail | https://webmail.drift.blog or https://roshi-lon.krystal.uk:2096 |

### Mail client settings

```
Incoming Server:  roshi-lon.krystal.uk
IMAP Port:        993
POP3 Port:        995

Outgoing Server:  roshi-lon.krystal.uk
SMTP Port:        465

Authentication:   Required for IMAP, POP3, and SMTP
```

### Contact form

| Item | Detail |
|------|--------|
| Provider | Formspree |
| Form ID | `mgovgopz` |
| Destination | rdubar@gmail.com |
| Dashboard | https://formspree.io/forms |

---

## DNS Records (Cloudflare)

All DNS is managed in Cloudflare. Records as of 8 Jan 2026:

### Website

| Type | Name | Content | Proxy |
|------|------|---------|-------|
| CNAME | drift.blog | drift-3h4.pages.dev | Proxied |

### Email

| Type | Name | Content | Priority | Proxy |
|------|------|---------|----------|-------|
| MX | @ | mx1.krystal.uk | 10 | - |
| MX | @ | mx2.krystal.uk | 20 | - |
| A | mail | 185.194.90.8 | - | DNS only |
| A | webmail | 185.194.90.8 | - | DNS only |

### Email authentication

| Type | Name | Content |
|------|------|---------|
| TXT | @ | `v=spf1 ip4:185.194.90.8 include:_spf.krystal.uk include:relay.k.io ~all` |
| TXT | default._domainkey | `v=DKIM1; k=rsa; p=MIIBIjANB...` (full key from Krystal) |
| TXT | _dmarc | `v=DMARC1; p=none;` |

### Krystal verification (can be removed)

| Type | Name | Content |
|------|------|---------|
| TXT | @ | `krystal-domain-verification` |

### Optional cPanel subdomains

| Type | Name | Content | Proxy |
|------|------|---------|-------|
| A | cpanel | 185.194.90.8 | DNS only |
| A | webdisk | 185.194.90.8 | DNS only |

---

## Setup Process (8 Jan 2026)

### 1. Add domain to Krystal

- Krystal requires verification for domains with external DNS
- Added TXT record `krystal-domain-verification` in Cloudflare
- Then added drift.blog as addon domain in Krystal cPanel

### 2. Create email account

- In Krystal cPanel → Email Accounts → Create
- Created info@drift.blog

### 3. Configure DNS for email

Added in Cloudflare:
1. MX records pointing to Krystal (`mx1.krystal.uk`, `mx2.krystal.uk`)
2. A records for `mail` and `webmail` subdomains (185.194.90.8, DNS only - not proxied)
3. SPF TXT record authorising Krystal to send
4. DKIM TXT record (copied from Krystal Email Deliverability page)
5. DMARC TXT record

### 4. Verify

- Krystal Email Deliverability page shows all green
- DNS propagation confirmed via `dig` commands

---

## Reference: rosh.cloud

Email for rosh.cloud is set up identically on the same Krystal server (roshi-lon.krystal.uk). Use its DNS as reference if needed.

---

*Last updated: 8 Jan 2026*
