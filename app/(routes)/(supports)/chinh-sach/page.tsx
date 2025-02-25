import { Metadata } from "next";
import { PolicyDetail } from "./components/policy-detail";

export const metadata: Metadata = {
    title: "Chính sách",
    description: "Danh sách sản phẩm của Productic, được tạo bởi Được dev",
};

export default function PolicyPage() {
    return <PolicyDetail />;
}
