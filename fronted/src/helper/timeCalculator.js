function daysBetweenDatesIST(createdAt) {

    const createdDateUTC = new Date(createdAt);

    
    const ISTOffset = 330 * 60 * 1000; 
    const createdDateIST = new Date(createdDateUTC.getTime() + ISTOffset);

    const currentDateUTC = new Date();
    const currentDateIST = new Date(currentDateUTC.getTime() + ISTOffset);

    const differenceInMilliseconds = currentDateIST - createdDateIST;
    const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));

    return differenceInDays;
}

export default daysBetweenDatesIST;

