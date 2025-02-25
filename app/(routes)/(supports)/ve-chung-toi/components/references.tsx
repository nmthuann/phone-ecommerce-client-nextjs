"use client";
import { Link } from "@heroui/react";

export default function References() {
    return (
        <div className="flex flex-wrap gap-4">
            <Link isBlock showAnchorIcon href="/about" color="primary">
                Giới Thiệu
            </Link>
            <Link isBlock showAnchorIcon href="/faq" color="primary">
                Câu Hỏi Thường Gặp
            </Link>
            <Link isBlock showAnchorIcon href="/products" color="primary">
                Sản Phẩm
            </Link>
            <Link isBlock showAnchorIcon href="/about" color="primary">
                Liên Hệ
            </Link>
            <Link isBlock showAnchorIcon href="/blog" color="primary">
                Tin Tức & Blog
            </Link>
        </div>
    );
}
