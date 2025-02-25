import { Metadata } from "next";
import { AboutInfo } from "./components/about-info";

export const metadata: Metadata = {
    title: "Về chúng tôi",
    description: "Danh sách sản phẩm của Productic, được tạo bởi Được dev",
};

export default function AboutPage() {
    return <AboutInfo />;
}
