# WAJEB File Management Application

## Project Overview
Full-stack file management application allowing users to send files to each other with user authentication and upload restrictions.

## Technology Stack
- Frontend: React 19.1.1 + Vite + SASS
- Backend: Fastify + Node.js + MongoDB + Mongoose  
- Authentication: JWT with bcrypt password hashing
- File Upload: Fastify multipart with local file storage

## Test Framework
targetFramework: Playwright

## Architecture  
- Frontend: `/front` - React SPA with context providers for auth, theme, language
- Backend: `/back` - RESTful API with JWT middleware protection
- Database: MongoDB with Mongoose ODM

## Key Features
- User registration and login
- File upload with 3-day cooldown restriction per user
- User-to-user file sharing by username  
- File download with access control
- File deletion (by recipient only)
- Multi-language support (EN/AR)
- Theme switching (light/dark)

## Current Issues (NOT FIXED)
1. Files being sent to wrong recipients (appearing in sender's received files)  
2. File deletion not working in received files section
3. Downloaded files are empty (no content)