export type SideNavItem = {
    id: number;
    categoryName: string;
    path: string;
    leftValue: number;
    rightValue: number;
    subMenuItems?: SideNavItem[];
};


export type FAQ = {
    question: string;
    answer: string;
}