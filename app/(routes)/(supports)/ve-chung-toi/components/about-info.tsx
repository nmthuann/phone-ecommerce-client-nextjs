'use client'

import References from './references'

export function AboutInfo() {
  return (
    <div className='max-w-4xl mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold text-center mb-6 text-slate-950'>Giới Thiệu Về Cửa Hàng Điện Thoại</h1>

      {/* Giới thiệu chung */}
      <section className='m-6'>
        <h2 className='text-2xl font-semibold mb-4 text-slate-950'>Về Chúng Tôi</h2>
        <p className='text-slate-600 dark:text-slate-400'>
          Chào mừng bạn đến với <span className='font-bold text-slate-950'>cửa hàng điện thoại di động</span> của chúng
          tôi! Được thành lập từ năm <span className='font-bold text-slate-950'>2015</span>, chúng tôi chuyên cung cấp
          các dòng điện thoại di động chất lượng cao từ các thương hiệu hàng đầu như{' '}
          <span className='font-bold text-slate-950'>Apple</span>,{' '}
          <span className='font-bold text-slate-950'>Samsung</span>,{' '}
          <span className='font-bold text-slate-950'>Xiaomi</span>,{' '}
          <span className='font-bold text-slate-950'>Oppo</span> và nhiều thương hiệu khác.
        </p>
        <p className='text-slate-600 dark:text-slate-400 mt-4'>
          Với phương châm <span className='italic text-slate-950'>Chất lượng - Uy tín - Giá tốt</span>, chúng tôi luôn
          cam kết mang đến cho khách hàng trải nghiệm mua sắm tuyệt vời nhất.
        </p>
      </section>

      {/* Sản phẩm và dịch vụ */}
      <section className='m-6'>
        <h2 className='text-2xl font-semibold mb-4 text-slate-950'>Sản Phẩm và Dịch Vụ</h2>
        <ul className='list-disc list-inside text-slate-600 dark:text-slate-400'>
          <li>Điện thoại di động chính hãng từ các thương hiệu lớn</li>
          <li>Phụ kiện điện thoại: ốp lưng, sạc, tai nghe, kính cường lực</li>
          <li>Dịch vụ sửa chữa, bảo hành, nâng cấp phần mềm</li>
          <li>Chương trình thu cũ đổi mới với giá hấp dẫn</li>
        </ul>
      </section>

      {/* Sứ mệnh */}
      <section className='m-6'>
        <h2 className='text-2xl font-semibold mb-4 text-slate-950'>Sứ Mệnh của Chúng Tôi</h2>
        <p className='text-slate-600 dark:text-slate-400'>
          Sứ mệnh của chúng tôi là mang đến cho khách hàng những chiếc điện thoại chất lượng cao với mức giá hợp lý,
          đồng thời cung cấp dịch vụ hậu mãi chuyên nghiệp để đảm bảo sự hài lòng tuyệt đối.
        </p>
      </section>

      {/* Liên hệ */}
      <section className='m-6'>
        <h2 className='text-2xl font-semibold mb-4 text-slate-950'>Liên Hệ với Chúng Tôi</h2>
        <p className='text-slate-600 dark:text-slate-400'>
          Nếu bạn có bất kỳ câu hỏi nào hoặc cần tư vấn, hãy liên hệ với chúng tôi qua số điện thoại:{' '}
          <span className='font-bold text-slate-950'>0987-654-321</span> hoặc gửi email đến{' '}
          <span className='font-bold text-slate-950'>dienthoaishop@gmail.com</span>.
        </p>
      </section>

      {/* Khám phá thêm */}
      <section className='m-6'>
        <h2 className='text-2xl font-semibold mb-4 text-slate-950'>Khám Phá Thêm</h2>
        <References />
      </section>
    </div>
  )
}
