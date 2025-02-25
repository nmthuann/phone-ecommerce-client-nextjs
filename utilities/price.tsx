interface PriceProps {
    amount: number | string;
}

const Price = ({ amount }: PriceProps) => {
    const formatter = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });

    return <span>{formatter.format(Number(amount))}</span>;
};

export default Price;
