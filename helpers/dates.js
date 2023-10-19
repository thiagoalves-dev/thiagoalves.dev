const dateDbToPtBr = (date) => {
    const [yyyy, mm, dd] = date.split(/-/g);

    return `${dd}/${mm}/${yyyy}`;
};

export {
    dateDbToPtBr
};