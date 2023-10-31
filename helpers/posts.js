const slugFromPath = (path) => {
    const pathPieces = path.split('/');
    
    return pathPieces.pop();
};

export {
    slugFromPath
};