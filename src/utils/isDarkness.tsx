const isDarkness = () => {
    const now = new Date();
    return now.getHours() >= 16 || now.getHours() <= 5;
};

export default isDarkness;
