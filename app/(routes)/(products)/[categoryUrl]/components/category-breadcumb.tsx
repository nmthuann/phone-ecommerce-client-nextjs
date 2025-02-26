"use client";
import { BreadcrumbItem, Breadcrumbs } from "@heroui/react";

interface CategoryBreadcumbProps {
    items: { title: string; path: string }[];
    currentPath: string;
}

export const CategoryBreadcumb: React.FC<CategoryBreadcumbProps> = ({
    items,
    currentPath
}) => {
    const home = { title: "Trang chủ", path: "/" };
    const breadcrumbItems = [home, ...items];
    return (
        <Breadcrumbs>
            {breadcrumbItems.map((breadcrumb) => (
                <BreadcrumbItem
                    key={breadcrumb.path}
                    href={breadcrumb.path}
                    isCurrent={currentPath === breadcrumb.path}
                >
                    {breadcrumb.title}
                </BreadcrumbItem>
            ))}
        </Breadcrumbs>
    );
};
