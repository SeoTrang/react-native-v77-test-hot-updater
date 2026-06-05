
### 1. Chi phí Cloudflare R2 (Lưu trữ & Tải file Bundle)

Trang này chứa thông tin về **10 GB lưu trữ miễn phí**, **10 triệu request Class B miễn phí**, và quan trọng nhất là chính sách **Miễn phí băng thông (Zero Egress Fees)** giúp bạn tiết kiệm chi phí cho 60 TB dữ liệu tải về của 500k user.

* **Đường link tài liệu:** [https://developers.cloudflare.com/r2/pricing/](https://developers.cloudflare.com/r2/pricing/)
* *Công cụ tính toán nhanh của Cloudflare:* [https://r2-calculator.cloudflare.com/](https://r2-calculator.cloudflare.com/)

### 2. Chi phí Cloudflare D1 (Database Check Update)

Trang này chứa bảng **Billing metrics** chứng minh hạn mức **miễn phí 5 triệu lượt đọc (Rows read) mỗi ngày** của gói Free. Nó đảm bảo cho việc 500k user mở app 3 lần/ngày (1.5 triệu lượt check) không bị tính tiền.

* **Đường link tài liệu:** [https://developers.cloudflare.com/d1/platform/pricing/](https://developers.cloudflare.com/d1/platform/pricing/)

### 3. Về Giới hạn Hệ thống D1 (D1 Limits)

Để chi tiết hơn về mặt kỹ thuật (như dung lượng tối đa của một DB ở gói Free là **500 MB**, gói Paid là **10 GB**), bạn có thể đính kèm thêm link giới hạn này:

* **Đường link tài liệu:** [https://developers.cloudflare.com/d1/platform/limits/](https://developers.cloudflare.com/d1/platform/limits/)

---


> "Hệ thống Hot-Updater (OTA) chạy dựa trên hạ tầng Serverless của Cloudflare (R2 kết hợp D1 Database).
> * Với quy mô **500,000 user** hiện tại (tương đương ~1.5 triệu lượt check update/ngày và ~4 triệu lượt download bundle/tháng), toàn bộ tài nguyên tiêu thụ **vẫn nằm trọn trong hạn mức Free Tier** của Cloudflare (Hạn mức cho phép: 5 triệu lượt đọc DB/ngày và 10 triệu lượt tải file/tháng).
> * Chi phí vận hành hạ tầng hàng tháng ước tính: **$0.00**."
> 
>