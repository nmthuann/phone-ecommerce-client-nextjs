'use client'

export function PolicyDetail() {
  return (
    <div className='max-w-4xl mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold text-center mb-6 text-slate-950'>Chính Sách Cửa Hàng Điện Thoại</h1>

      <section className='m-6'>
        <h2 className='text-2xl font-semibold mb-4 text-slate-950'>Chính Sách Bảo Mật Thông Tin</h2>
        <p className='text-slate-600 dark:text-slate-400'>
          Chúng tôi cam kết bảo vệ quyền riêng tư của khách hàng. Mọi thông tin cá nhân được cung cấp sẽ chỉ được sử
          dụng nhằm mục đích hỗ trợ khách hàng tốt hơn trong quá trình mua sắm và bảo hành sản phẩm. Chúng tôi không
          chia sẻ thông tin khách hàng với bên thứ ba khi chưa có sự đồng ý.
        </p>
      </section>

      <section className='m-6'>
        <h2 className='text-2xl font-semibold mb-4 text-slate-950'>Chính Sách Vận Chuyển</h2>
        <p className='text-slate-600 dark:text-slate-400'>
          Chúng tôi hỗ trợ giao hàng nhanh chóng trên toàn quốc. Đối với khu vực nội thành, đơn hàng sẽ được giao trong
          vòng 1-2 giờ. Đối với các khu vực ngoại thành và tỉnh thành khác, thời gian giao hàng dao động từ 1-3 ngày làm
          việc. Tất cả đơn hàng đều được đóng gói cẩn thận và có bảo hiểm vận chuyển.
        </p>
      </section>

      <section className='m-6'>
        <h2 className='text-2xl font-semibold mb-4 text-slate-950'>Chính Sách Đổi Trả & Bảo Hành</h2>
        <p className='text-slate-600 dark:text-slate-400'>
          Chúng tôi hỗ trợ đổi trả sản phẩm trong vòng 7 ngày nếu sản phẩm còn nguyên vẹn, chưa kích hoạt và đầy đủ phụ
          kiện đi kèm. Các sản phẩm bị lỗi từ nhà sản xuất sẽ được bảo hành theo chính sách của hãng. Đối với các lỗi từ
          người dùng, chúng tôi có dịch vụ sửa chữa và thay thế linh kiện với chi phí hợp lý.
        </p>
      </section>

      <section className='m-6'>
        <h2 className='text-2xl font-semibold mb-4 text-slate-950'>Chính Sách Thanh Toán</h2>
        <p className='text-slate-600 dark:text-slate-400'>
          Cửa hàng hỗ trợ nhiều phương thức thanh toán linh hoạt: tiền mặt, chuyển khoản, thẻ tín dụng, và ví điện tử
          (Momo, ZaloPay, VNPay). Chúng tôi cũng cung cấp chương trình trả góp 0% lãi suất qua thẻ tín dụng của nhiều
          ngân hàng đối tác.
        </p>
      </section>

      <section className='m-6'>
        <h2 className='text-2xl font-semibold mb-4 text-slate-950'>Hỗ Trợ & Liên Hệ</h2>
        <p className='text-slate-600 dark:text-slate-400'>
          Nếu bạn cần tư vấn hoặc hỗ trợ, vui lòng liên hệ với chúng tôi qua:
        </p>
        <ul className='list-disc list-inside text-slate-600 dark:text-slate-400 mt-2'>
          <li>
            Hotline: <span className='font-bold text-slate-950'>0987-654-321</span>
          </li>
          <li>
            Email: <span className='font-bold text-slate-950'>support@dienthoaishop.com</span>
          </li>
          <li>
            Facebook: <span className='font-bold text-slate-950'>fb.com/dienthoaishop</span>
          </li>
        </ul>
      </section>
    </div>
  )
}
