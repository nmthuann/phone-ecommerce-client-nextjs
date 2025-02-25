import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function fetchWithRetry(
  url: string, 
  retries: number = 3, 
  maxDelay: number = 3000
): Promise<Response> 
{
  const randomDelay = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
  const options = {
    method: 'GET',
    next: { revalidate: 0 },
    headers: {
      'X-Rest-Api-Version': `${process.env.NEXT_PUBLIC_BACKEND_VERSION_API}`,
    },
  };
  try {
    const response = await fetch(url, options);
    if (response.status >= 200 && response.status <= 300) {
      return response;
    }

    if (retries > 0) {
      const delay = randomDelay(1000, maxDelay); // Random delay between 1s and 3s
      await new Promise(resolve => setTimeout(resolve, delay));
      return fetchWithRetry(url, retries - 1, maxDelay);
    } else {
      throw new Error(`Failed to fetch after ${retries} retries.`);
    }

  } catch (error) {
    if (retries > 0) {
      const delay = randomDelay(1000, maxDelay); // Random delay between 1s and 3s
      await new Promise(resolve => setTimeout(resolve, delay));
      return fetchWithRetry(url, retries - 1, maxDelay);
    } else {
      throw error;
    }
  }
}


export const createSlug = (productName: string): string => {
    return productName
        .toLowerCase() // Chuyển thành chữ thường
        .replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a')
        .replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e')
        .replace(/(ì|í|ị|ỉ|ĩ)/g, 'i')
        .replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o')
        .replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u')
        .replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y')
        .replace(/(đ)/g, 'd')
        .replace(/([^0-9a-z-\s])/g, '') // Loại bỏ ký tự đặc biệt
        .replace(/(\s+)/g, '-') // Thay khoảng trắng bằng dấu gạch ngang
        .replace(/-+/g, '-') // Loại bỏ dấu gạch ngang liên tiếp
        .replace(/^-+/g, '') // Loại bỏ dấu gạch ngang ở đầu
        .replace(/-+$/g, ''); // Loại bỏ dấu gạch ngang ở cuối
};


export const truncateText = (text: string, maxLength: number): string => {
  if(text == null){
    return "sản phẩm không có mô tả.";
  }
    if (text.length <= maxLength) {
        return text;
    }
    return `${text.substring(0, maxLength)} ...`;
};





