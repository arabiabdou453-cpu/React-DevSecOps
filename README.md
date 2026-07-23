# React DevSecOps Portal (`secure-test-app`)

[![LIVE DEMO](https://img.shields.io/badge/LIVE__DEMO-HTTPS%3A%2F%2FSECURE--TEST--APP.VERCEL.APP-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://secure-test-app.vercel.app)
[![TypeScript](https://img.shields.io/badge/TYPESCRIPT-STRICT-blue?style=for-the-badge&logo=typescript&logoColor=white)](#)
[![React](https://img.shields.io/badge/REACT-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](#)
[![Vite](https://img.shields.io/badge/VITE-8.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](#)

👉 **[Open Live App on Vercel: https://secure-test-app.vercel.app](https://secure-test-app.vercel.app)**

---

![Security](https://img.shields.io/badge/Security-DevSecOps-blue)
![CI](https://img.shields.io/badge/CI-GitHub%20Actions-success)
![CodeQL](https://img.shields.io/badge/CodeQL-enabled-green)
![SBOM](https://img.shields.io/badge/SBOM-generated-orange)
![OpenSSF](https://img.shields.io/badge/OpenSSF-Scorecard-purple)

## Overview

Security-Test is a production-oriented repository implementing an enterprise DevSecOps security pipeline for `secure-test-app`.

The project integrates automated security validation from development to production delivery, including code quality verification, secret detection, static analysis, dependency scanning, software supply chain protection, and continuous integration verification.

The repository follows a shift-left security approach where security controls are integrated throughout the software development lifecycle.

---

# DevSecOps Architecture

```
+---------------------------+
| CI Build Verification     |
|                           |
| - TypeScript validation   |
| - Tests execution         |
| - Production build check  |
+---------------------------+
              |
              v
+---------------------------+
| Security Pipeline         |
|                           |
| - Gitleaks                |
| - Semgrep                 |
| - Trivy                   |
| - CodeQL                  |
| - SBOM Generation         |
| - OpenSSF Scorecard       |
+---------------------------+
              |
              v
    Protected main branch
              |
              v
      Production Delivery (Vercel)
```

---

# Implemented Security Controls

## Application Quality

The CI pipeline validates application quality before merging changes.

Implemented:
- TypeScript compilation checks
- Automated test execution
- Production build verification
- Dependency installation validation

These checks prevent production failures caused by:
- TypeScript compilation errors
- Broken builds
- Missing dependencies
- Invalid application states

---

## Secret Protection

Implemented security controls:
- Gitleaks secret detection
- Repository secret scanning
- Prevention of accidental credential exposure

Protected against:
- API key exposure
- Token leakage
- Password commits
- Private credential leaks

---

## Static Application Security Testing (SAST)

Implemented:
- GitHub CodeQL analysis
- Semgrep security scanning

These tools detect:
- Security vulnerabilities
- Unsafe coding patterns
- Workflow security issues
before production deployment.

---

## Dependency Security

Implemented:
- npm audit dependency analysis
- Trivy vulnerability scanning
- Dependabot dependency monitoring

Protection against:
- Vulnerable packages
- Known CVEs
- Outdated dependencies
- Third-party dependency risks

---

## Software Supply Chain Security

Implemented:
- GitHub Actions pinned to immutable commit SHA references
- SBOM generation using SPDX format
- OpenSSF Scorecard analysis
- Automated dependency monitoring

This protects the project against:
- Compromised dependencies
- Malicious GitHub Actions changes
- Software supply chain attacks

---

# GitHub Actions Workflows

- `ci.yml`
- `security.yml`
- `codeql.yml`
- `sbom.yml`
- `scorecard.yml`

---

# Development Security Rules

- Never commit secrets or credentials
- Never expose private keys or sensitive tokens in source code
- Never use mutable GitHub Action references
- All changes must pass CI validation
- Production changes require Pull Request review
- Security checks must pass before merging
- Dependencies must be continuously monitored

---

# Current Security Status

Implemented:
- ✅ Protected main branch  
- ✅ CI build verification  
- ✅ TypeScript validation  
- ✅ Production build checks  
- ✅ Secret scanning  
- ✅ SAST security scanning  
- ✅ Dependency scanning  
- ✅ Dependabot monitoring  
- ✅ SBOM generation  
- ✅ GitHub Actions SHA pinning  
- ✅ CodeQL analysis  
- ✅ OpenSSF Scorecard  
- ✅ Security-focused CI/CD pipeline  
- ✅ Live Production Deployment on Vercel

---

# Security Philosophy

Security is integrated into every development stage:

**Code → Build → Test → Scan → Validate → Deploy**

The repository follows a shift-left security approach where vulnerabilities, dependency risks, and production failures are detected early before reaching production.