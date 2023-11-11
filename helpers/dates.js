const formatDbDate = (date, language) => {
    const [yyyy, mm, dd] = date.split(/-/g);

    if (language === 'pt-br')
        return `${dd}/${mm}/${yyyy}`;

    return `${mm}/${dd}/${yyyy}`;
};

export {
    formatDbDate
};