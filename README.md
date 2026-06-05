# Hot Updater — Quy trình Build & Deploy OTA

- React Native 0.77+
- Node.js 20+
- Android SDK + ADB
- Tài khoản Cloudflare (R2, D1, Workers)
- File `.env.hotupdater` đã cấu hình đầy đủ

---

## 1. Lần đầu tiên — Build và cài APK lên thiết bị

Đây là bước cài bản native lên thiết bị. Chỉ cần làm một lần, hoặc khi có thay đổi native code.

### 1.1. Build release APK

```bash
cd android && ./gradlew assembleRelease && cd ..
```

File APK sẽ được tạo tại:
```
android/app/build/outputs/apk/release/app-release.apk
```

### 1.2. Cài APK lên thiết bị qua ADB

Kiểm tra thiết bị đã kết nối:
```bash
adb devices
```

Cài APK:
```bash
adb install -r android/app/build/outputs/apk/release/app-release.apk
```

> **Lưu ý:** `-r` là replace — ghi đè lên bản cũ nếu đã cài rồi.

---

## 2. Deploy OTA Update (không cần build lại native)

Dùng khi chỉ thay đổi JS/UI, không thay đổi native code.

### 2.1. Sửa code trong App.tsx hoặc các file JS

Ví dụ đổi text để nhận biết bản mới:
```tsx
<Text>Version 2 — đã cập nhật OTA</Text>
```

### 2.2. Deploy bundle lên Cloudflare R2 + D1

```bash
npx hot-updater deploy -p android
```

Hoặc deploy cả 2 platform:
```bash
npx hot-updater deploy
```

Hoặc deploy interactive + force reload:
```bash
npx hot-updater deploy -i -f
```

CLI sẽ hỏi:

| Câu hỏi | Trả lời |
|---|---|
| Platform | android / ios |
| Target app version | Phải khớp với `versionName` trong `android/app/build.gradle`, ví dụ `1.0` |
| Channel | `production` |

> **Quan trọng:** `Target app version` phải khớp chính xác với `versionName` trong `android/app/build.gradle`. Nếu sai, app sẽ không nhận được update.

### 2.3. Kiểm tra deploy thành công

Log thành công sẽ hiện:
```
✅ Build Complete (bare)
✅ Upload Complete (r2Storage)
✅ Update Complete (d1Database)
🚀 Deployment Successful
```

---

## 3. Test update trên thiết bị

1. Tắt app hoàn toàn trên điện thoại (swipe close)
2. Mở lại app
3. App sẽ tự động gọi check-update đến Cloudflare Worker
4. Nếu có bản mới: hiện `fallbackComponent` trong lúc tải
5. Sau khi tải xong: app reload với UI mới

---

## 4. Quản lý bundle — Console

Mở web console để xem danh sách bundle, bật/tắt, rollback:

```bash
npx hot-updater console
```

Truy cập tại: `http://localhost:1422`

---

## 5. Rollback về bản cũ

Trong console tại `http://localhost:1422`, tìm bundle muốn rollback về → bấm **Disable** bundle hiện tại → app sẽ tự động dùng bundle cũ.

Hoặc disable qua CLI:
```bash
npx hot-updater console
```

---

## 6. Tóm tắt lệnh thường dùng

```bash
# Build release APK
cd android && ./gradlew assembleRelease && cd ..

# Cài APK lên thiết bị
adb install -r android/app/build/outputs/apk/release/app-release.apk

# Deploy OTA cho Android
npx hot-updater deploy -p android

# Deploy OTA cho iOS
npx hot-updater deploy -p ios

# Deploy cả 2 platform (interactive)
npx hot-updater deploy -i

# Deploy interactive + force reload ngay lập tức
npx hot-updater deploy -i -f

# Mở console quản lý
npx hot-updater console

# Kiểm tra cấu hình
npx hot-updater doctor --server-base-url YOUR_URL
```

---

## 7. Lưu ý quan trọng

- **Debug build** không nhận OTA update — phải dùng **release build**
- OTA chỉ update được **JS bundle**, không update được native code (Java/Kotlin/Swift)
- Khi thay đổi native code (thêm package native, sửa Android/iOS code) phải build lại APK và cài lại qua ADB
- File `.env.hotupdater` chứa credentials, không được commit lên git
- `versionName` trong `build.gradle` phải khớp với `Target app version` khi deploy