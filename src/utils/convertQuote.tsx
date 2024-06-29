const convertQuote = (target: string | number): string => {
    return typeof target === "string" ? `'${target}'` : `${target}`;
};

export default convertQuote;
