interface ContainerPros {
    children: React.ReactNode;
}

const Container: React.FC<ContainerPros> = ({ children }) => {
    return <div className="mx-auto max-w-7xl">{children}</div>;
};

export default Container;
