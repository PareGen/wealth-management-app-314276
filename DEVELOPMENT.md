# Development Guide

Bu dokümantasyon, monorepo üzerinde geliştirme yaparken kullanmanız gereken komutları ve best practice'leri içerir.

## 📦 Bağımlılık Yönetimi

```bash
# Tüm bağımlılıkları yükle
pnpm install

# Belirli bir workspace'e bağımlılık ekle
pnpm --filter @saas-template/api add <package>
pnpm --filter @saas-template/frontend add <package>
```

## 🔨 Development Komutları

### Geliştirme Sunucuları

```bash
# Tüm servisleri geliştirme modunda başlat
pnpm dev

# Sadece backend API
pnpm --filter @saas-template/api dev

# Sadece frontend
pnpm --filter @saas-template/frontend dev
```

### Build

```bash
# Tüm paketleri build et
pnpm build

# Sadece API build et
pnpm build:api

# Sadece frontend build et
pnpm build:frontend
```

## ✅ Kod Kalitesi Kontrolleri

### Biome (Linting & Formatting)

```bash
# Sadece kontrol et (CI için)
pnpm check:ci

# Kontrol et ve otomatik düzelt
pnpm check

# Sadece formatla
pnpm format

# Format kontrolü (düzeltme yapmadan)
pnpm format:check
```

### TypeScript Tip Kontrolü

```bash
# Tüm paketlerde tip kontrolü
pnpm typecheck
```

### Tam Validasyon (CI Pipeline)

```bash
# Lint + TypeCheck + Build (commit öncesi önerilen)
pnpm validate
```

## 🚀 Önerilen İş Akışı

### Commit Öncesi

```bash
# 1. Kodu formatla ve hataları düzelt
pnpm check

# 2. Tüm kontrolleri çalıştır
pnpm validate
```

### CI/CD Pipeline

```bash
# GitHub Actions / GitLab CI için
pnpm validate
```

## ⚠️ Önemli Notlar

### TypeCheck ve Build İlişkisi

- **UYARI**: `typecheck` komutu workspace paketlerinin (`@saas-template/core`, `@saas-template/database`) build edilmiş olmasını gerektirir.
- `turbo.json`'da `typecheck` görevi `^build` bağımlılığına sahiptir, bu yüzden otomatik olarak gerekli paketler build edilir.
- Temiz bir clone sonrası direkt `pnpm typecheck` çalışacaktır.

### Monorepo Yapısı

```
apps/
  ├── api/          # NestJS backend
  └── frontend/     # Next.js frontend
packages/
  ├── core/         # Paylaşılan types, DTOs, constants
  ├── database/     # TypeORM entities & migrations
  └── ui/           # Paylaşılan UI components
```

### Workspace Bağımlılıkları

Workspace paketleri birbirlerine `workspace:*` ile bağlıdır:

```json
{
  "dependencies": {
    "@saas-template/core": "workspace:*",
    "@saas-template/database": "workspace:*"
  }
}
```

## 🗄️ Database Migration

```bash
# Migration oluştur
cd packages/database
pnpm migration:generate src/migrations/MigrationName

# Migration çalıştır
pnpm migration:run

# Migration geri al
pnpm migration:revert
```

## 🧹 Temizlik

```bash
# Build çıktılarını temizle
turbo run clean

# Tüm node_modules ve build çıktılarını sil
pnpm clean
```

## 🔍 Hata Ayıklama

### TypeScript Hataları

```bash
# Önce build'i kontrol et
pnpm build

# Sonra typecheck
pnpm typecheck
```

### Biome Hataları

```bash
# Otomatik düzelt
pnpm check

# Eğer düzeltemezse, manuel düzeltme gerekir
pnpm check:ci
```

### Cache Sorunları

```bash
# Turbo cache'i temizle
rm -rf .turbo

# Paket cache'lerini temizle
pnpm clean
pnpm install
```

## 📚 Daha Fazla Bilgi

- [Turbo Documentation](https://turbo.build/repo/docs)
- [pnpm Workspaces](https://pnpm.io/workspaces)
- [Biome](https://biomejs.dev/)
- [TypeORM Migrations](https://typeorm.io/migrations)

