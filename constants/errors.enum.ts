export enum ErrorType {
  NOT_FOUND = "Not Found!",
  PERMISSOIN_DENIED = "Permission Denied!",
  // Add more error types here
}


export enum ErrorInput{
    INPUT_INVALID = "Nhập thông tin không hợp lệ.",
    NAME_INVALID = "Tên không được chứa số hoặc khoảng trắng.",
    INPUT_WRONG_FORMAT = "Nhập thông tin sai định dạng.",
    NOT_FULL_FIELD = "Vui lòng không được bỏ trống.",
    FIELD_MISSING = "bạn nhập thiếu ",
    PHONE_NUMBER_ERROR = "Số điện thoại phải có đúng 10 chữ số.",
    EMAIL_ERROR = "Nhập Email chưa đúng.",
    PASSWORD_ERROR = "Mật khẩu phải đủ 8 kí tự.",
    NUMBER_ERROR = "Vui lòng không nhập số.",
    STRING_ERROR = "Vui lòng không nhập text.",
    MAX_ERROR = "Không nhập quá ",
    MIN_ERROR = "Phải nhập đủ tối thiểu",
    NOT_SELECT_FIELD = "Vui lòng chọn ",
    LENGTH_ERROR = "Yêu cầu phải đủ",
    EMAIL_NOT_FOUND = "Không tìm thấy email.",
    EMAIL_INVALID = "Email không hợp lệ.",
    PASSWORD_NOT_MATCH="Mật khẩu và xác nhận mật khẩu không khớp."
}

export enum AuthError{
  LOGIN_FAILED = "Đăng nhập thất bại.",
  LOGIN_REQUIRED = "Vui lòng đăng nhập.",
}




export enum SystemError{
  INTERNAL_SERVER_ERROR = "Internal server error.",
  CONNECT_ERROR = "Kết nối thất bại.",
  FETCH_DATA_ERROR = "FETCH_DATA_ERROR",
  NOT_FOUND = "Resource not found (404).",       // 404
  FORBIDDEN = "Access forbidden (403).",         // 403
  METHOD_NOT_ALLOWED = "Method not allowed (405).", // 405
  BAD_REQUEST = "Bad request (400).",
  UNAUTHORIZED = "Unauthorized access (401)."
}

export enum MiddlewareError{
  TOKEN_MISSING = "Bạn thiếu token.",
  TOKEN_INVALID = "Token của bạn hết hạn khoặc không hợp lệ.",
}

export enum UnknownError{
  SOMETHING_WRONG = 'Something went wrong.'
}

export enum AuthExceptionMessages {
  PASSWORD_WRONG = 'Bạn nhập sai mật khẩu.',
  LOGIN_INVAILD = 'Email hoặc Password của bạn không hợp lệ.',
  LOGIN_FAILED = 'Đăng nhập thất bại',
  OTP_INVALID = 'OTP không hợp lệ.',
  OTP_FAILED ='Xác thực OTP thất bại.',
  EMAIL_EXSIT = 'Email đã tồn tại.',
  VERIFY_MAIL_FAILED = 'Xác thực email thất bại.',
  SEND_MAIL_FAILED = 'Gửi mail thất bại.',
  REGISTER_USER_FAILED = 'Đăng ký thất bại.',
}


export enum CartError{
  PRODUCT_EXIST = "Sản phẩm đã tồn tại trong giỏ hàng.", 
  CART_NOT_FOUND = "Chưa có sản phẩm nào được thêm vào giỏ.",
}

export enum CheckoutError{
  PRODUCT_IDS_REQUIRED = "Không có sản phẩm nào được yêu cầu.",
  
}