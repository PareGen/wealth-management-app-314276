# Deployment Rehberi - Render

Bu rehber, SaaS Template projesini Render platformunda deploy etmek için gereken tüm adımları içermektedir.

## İçindekiler

1. [Gereksinimler](#gereksinimler)
2. [Render'da Deploy](#rendarda-deploy)
3. [Environment Variables](#environment-variables)
4. [Migration Çalıştırma](#migration-çalıştırma)
5. [Troubleshooting](#troubleshooting)

---

## Gereksinimler

- [Render hesabı](https://render.com) (ücretsiz tier kullanılabilir)
- GitHub/GitLab reposu (kod burada olmalı)
- Node.js 20+ ve pnpm 8+ (lokal test için)

---

## Render'da Deploy

### 1. Render Blueprint ile Deploy (Önerilen)

Projede `render.yaml` dosyası bulunmaktadır. Bu dosya tüm servisleri otomatik olarak oluşturur.

#### Adımlar:

1. **Render Dashboard'a gidin**: https://dashboard.render.com/

2. **"New +" butonuna tıklayın** ve **"Blueprint"** seçeneğini seçin.

3. **GitHub/GitLab repo'nuzu bağlayın**:
   - "Connect a repository" butonuna tıklayın
   - Projenizi seçin ve yetkilendirin

4. **Blueprint'i onaylayın**:
   - Render otomatik olarak `render.yaml` dosyasını algılayacak
   - 3 servis göreceksiniz:
     - `saas-template-db` (PostgreSQL Database)
     - `saas-template-api` (Backend API)
     - `saas-template-frontend` (Frontend)
   - **"Apply"** butonuna tıklayın

5. **İlk deployment başlayacak**:
   - PostgreSQL database oluşturulur (~2 dakika)
   - Backend build edilir ve deploy edilir (~5-8 dakika)
   - Frontend ilk denemede başarısız olabilir (NEXT_PUBLIC_API_URL eksik olduğu için)

6. **Frontend için NEXT_PUBLIC_API_URL ekleme** (Kritik Adım):
   - Backend servisiniz deploy edildikten sonra URL'sini kopyalayın
   - Örnek: `https://saas-template-api.onrender.com`
   - Frontend servisinize gidin → **"Environment"** sekmesi
   - **"Add Environment Variable"** butonuna tıklayın
   - Key: `NEXT_PUBLIC_API_URL`
   - Value: `https://saas-template-api.onrender.com/api/v1` (URL'nin sonuna `/api/v1` ekleyin)
   - **"Save Changes"** → Frontend otomatik olarak yeniden deploy edilecek

### 2. Manuel Deploy (Alternatif)

Blueprint yerine manuel olarak da servisler oluşturulabilir:

#### 2.1. PostgreSQL Database Oluşturma

1. Dashboard'dan **"New +" → "PostgreSQL"**
2. Name: `saas-template-db`
3. Database: `saas_template`
4. User: `saas_user`
5. Region: `Frankfurt` (veya size en yakın)
6. Plan: `Free`
7. **"Create Database"**

#### 2.2. Backend API Servisi Oluşturma

1. Dashboard'dan **"New +" → "Web Service"**
2. Repo'nuzu seçin
3. Yapılandırma:
   - **Name**: `saas-template-api`
   - **Region**: `Frankfurt`
   - **Branch**: `main`
   - **Root Directory**: Boş bırak
   - **Runtime**: `Node`
   - **Build Command**: `pnpm install && pnpm build:api`
   - **Start Command**: `pnpm start:api`
   - **Plan**: `Free`
4. **"Advanced" → "Health Check Path"**: `/api/v1/health`
5. Environment Variables ekleyin (aşağıdaki tabloya bakın)
6. **"Create Web Service"**

#### 2.3. Frontend Servisi Oluşturma

1. Dashboard'dan **"New +" → "Web Service"**
2. Repo'nuzu seçin
3. Yapılandırma:
   - **Name**: `saas-template-frontend`
   - **Region**: `Frankfurt`
   - **Branch**: `main`
   - **Root Directory**: Boş bırak
   - **Runtime**: `Node`
   - **Build Command**: `pnpm install && pnpm build:frontend`
   - **Start Command**: `pnpm start:frontend`
   - **Plan**: `Free`
4. Environment Variables ekleyin (aşağıdaki tabloya bakın)
5. **"Create Web Service"**

---

## Environment Variables

### Backend API Environment Variables

Render Dashboard'da backend servisinize gidin → **"Environment"** sekmesi:

| Key                  | Value                                          | Açıklama                                    |
|----------------------|------------------------------------------------|---------------------------------------------|
| `NODE_ENV`           | `production`                                   | Ortam                                       |
| `PORT`               | `10000`                                        | Render otomatik atar                        |
| `API_PREFIX`         | `/api/v1`                                      | API prefix                                  |
| `DATABASE_URL`       | (Render otomatik bağlar)                       | PostgreSQL connection string                |
| `JWT_SECRET`         | (güçlü bir secret oluşturun)                   | JWT token secret - min 32 karakter         |
| `JWT_EXPIRY`         | `1d`                                           | Access token süresi                         |
| `JWT_REFRESH_SECRET` | (güçlü bir secret oluşturun)                   | Refresh token secret - min 32 karakter     |
| `JWT_REFRESH_EXPIRY` | `7d`                                           | Refresh token süresi                        |
| `CORS_ORIGIN`        | `https://your-frontend.onrender.com`           | Frontend URL (deployment sonrası güncelleyin) |
| `THROTTLE_TTL`       | `60`                                           | Rate limit pencere süresi (saniye)          |
| `THROTTLE_LIMIT`     | `100`                                          | Rate limit - istek sayısı                   |

**Önemli Notlar**:

- `DATABASE_URL`: Blueprint kullanıyorsanız otomatik bağlanır. Manuel oluşturuyorsanız:
  - Database servisinizden **"Info"** sekmesine gidin
  - **"Internal Database URL"** kopyalayın
  - Backend servisinde environment variable olarak ekleyin

- `JWT_SECRET` ve `JWT_REFRESH_SECRET`: Güçlü rastgele stringler kullanın:
  ```bash
  # Node.js ile generate etmek için:
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  ```

- `CORS_ORIGIN`: Frontend deploy edildikten sonra URL'yi buraya ekleyin.

### Frontend Environment Variables

Render Dashboard'da frontend servisinize gidin → **"Environment"** sekmesi:

| Key                    | Value                                      | Açıklama                    |
|------------------------|--------------------------------------------|-----------------------------|
| `NODE_ENV`             | `production`                               | Ortam (Blueprint ile otomatik eklenir) |
| `NEXT_PUBLIC_API_URL`  | `https://your-api.onrender.com/api/v1`    | Backend API URL (**Manuel eklenmelidir**) |

**⚠️ ÖNEMLİ: NEXT_PUBLIC_API_URL Manuel Eklenmelidir**:

Blueprint deployment'tan sonra bu değişkeni manuel olarak eklemeniz gerekir:

1. Backend servisiniz deploy edildikten sonra URL'sini alın
   - Dashboard → `saas-template-api` → URL'yi kopyalayın
   - Örnek: `https://saas-template-api.onrender.com`

2. Frontend servisinize gidin
   - Dashboard → `saas-template-frontend` → **"Environment"** sekmesi
   - **"Add Environment Variable"**

3. Environment variable ekleyin:
   - **Key**: `NEXT_PUBLIC_API_URL`
   - **Value**: `https://saas-template-api.onrender.com/api/v1`
   - ⚠️ Mutlaka sonuna `/api/v1` ekleyin!
   - **"Save Changes"**

4. Frontend otomatik olarak yeniden deploy edilecek (~5-8 dakika)

---

## Migration Çalıştırma

Database migration'lar **otomatik olarak çalışır**. Backend servisinin `start:api` scripti migration'ları otomatik çalıştırır.

### Migration Durumunu Kontrol Etme

1. Render Dashboard → Backend servisiniz → **"Logs"** sekmesi
2. Deployment loglarında şu satırları göreceksiniz:
   ```
   Running migrations...
   Migration CreateUsersTable has been executed successfully
   Migration CreateProjectsTable has been executed successfully
   ```

### Manuel Migration Çalıştırma (Gerekirse)

Eğer migration'lar otomatik çalışmazsa:

1. Render Dashboard → Backend servisiniz → **"Shell"** sekmesi
2. Aşağıdaki komutları çalıştırın:
   ```bash
   cd packages/database
   pnpm typeorm migration:run -d src/config/data-source.ts
   ```

### Yeni Migration Ekleme

Local'de yeni migration oluşturduktan sonra:

1. Git'e commit edin ve push edin
2. Render otomatik olarak yeniden deploy edecek
3. Yeni migration'lar otomatik çalışacak

---

## Deployment Sonrası Kontroller

### 1. Backend API Kontrolü

Browser'da backend URL'nizi açın (örn: `https://your-api.onrender.com/api/v1`):

- 404 alırsanız → Normal (root endpoint yok)
- Health check: `https://your-api.onrender.com/api/v1/health` (200 OK dönmeli)

### 2. Frontend Kontrolü

Browser'da frontend URL'nizi açın (örn: `https://your-frontend.onrender.com`):

- Ana sayfa yüklenmeli
- Login/Register sayfaları çalışmalı

### 3. Database Bağlantı Kontrolü

Backend logs'da şu satırı görmeli:
```
🚀 Application is running on: http://localhost:10000/api/v1
```

Hata yoksa database bağlantısı başarılı demektir.

---

## Troubleshooting

### Problem: Backend başlamıyor

**Çözüm**:

1. Logs'u kontrol edin (Dashboard → Service → Logs)
2. `DATABASE_URL` doğru ayarlanmış mı kontrol edin
3. Migration'lar başarılı çalıştı mı kontrol edin
4. Node.js versiyonu 20+ olduğundan emin olun

### Problem: Frontend API'ye erişemiyor (CORS hatası)

**Çözüm**:

1. Backend `CORS_ORIGIN` environment variable'ını kontrol edin
2. Frontend URL'nin tam olarak ayarlandığından emin olun (protokol dahil: `https://...`)
3. Backend'i yeniden deploy edin (env variable değişikliğinden sonra)

### Problem: "Module not found" hatası

**Çözüm**:

1. Build command'in doğru olduğundan emin olun:
   - Backend: `pnpm install && pnpm build:api`
   - Frontend: `pnpm install && pnpm build:frontend`
2. `pnpm-lock.yaml` dosyasının commit edildiğinden emin olun
3. Clear build cache ve yeniden deploy edin

### Problem: Migration'lar çalışmıyor

**Çözüm**:

1. Backend logs'unda "Running migrations" satırını arayın
2. `DATABASE_URL` environment variable'ının doğru ayarlandığından emin olun
3. Shell'den manuel migration çalıştırın (yukarıdaki adımlara bakın)

### Problem: Free tier services "spinning down"

**Açıklama**: Render free tier servisleri 15 dakika hareketsizlikten sonra uyku moduna geçer. İlk istek ~30 saniye sürebilir.

**Çözüm**:

- Production için paid plan kullanın
- Ya da health check servisleri kullanarak servisleri aktif tutun (örn: UptimeRobot, Cron-job.org)

### Problem: Build timeout

**Çözüm**:

1. Build komutunun optimize olduğundan emin olun
2. Gereksiz dependencies var mı kontrol edin
3. Turbo cache'i temizleyin: `pnpm clean && git commit`
4. Render support'a build time artışı isteyin

---

## Render Blueprint Yapılandırması

Proje root'unda `render.yaml` dosyası bulunur. Bu dosya tüm servisleri tanımlar.

### render.yaml Yapısı:

```yaml
services:
  - type: pserv          # PostgreSQL Database
  - type: web            # Backend API
  - type: web            # Frontend
```

### Servisleri Güncelleme:

`render.yaml`'i düzenleyip commit ettiğinizde:

1. Render Dashboard → Blueprint → **"Apply"** butonu belirecek
2. Butona tıklayarak değişiklikleri uygulayın

---

## Production Checklist

Deploy öncesi kontrol listesi:

- [ ] `JWT_SECRET` ve `JWT_REFRESH_SECRET` güçlü rastgele stringler
- [ ] `CORS_ORIGIN` production frontend URL'si
- [ ] `NODE_ENV=production` ayarlı
- [ ] Database backup stratejisi oluşturuldu
- [ ] Error monitoring kuruldu (örn: Sentry)
- [ ] Rate limiting ayarları test edildi
- [ ] SSL/HTTPS aktif (Render otomatik sağlar)
- [ ] Environment variables production'da güvenli şekilde saklanıyor

---

## Faydalı Linkler

- [Render Docs](https://render.com/docs)
- [Render Blueprint Docs](https://render.com/docs/infrastructure-as-code)
- [Node.js on Render](https://render.com/docs/deploy-node-express-app)
- [PostgreSQL on Render](https://render.com/docs/databases)

---

## Destek

Sorun yaşıyorsanız:

1. [Render Community](https://community.render.com/)
2. [GitHub Issues](https://github.com/your-repo/issues)
3. Render Support (dashboard'dan ticket açın)

---

**Not**: Render free tier, üretim ortamı için sınırlı özelliklere sahiptir. Production deployment için paid plan önerilir.

