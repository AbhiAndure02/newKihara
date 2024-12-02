function monthBetweenDtaseIST(firstEmi) {
    const createdDateUTC = new Date(firstEmi);

    if (isNaN(createdDateUTC)) {
      throw new Error('Invalid date provided');
    }
  
   
    const createdDateIST = new Date(createdDateUTC.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
  
    const currentDateIST = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
  
    const yearDiff = currentDateIST.getFullYear() - createdDateIST.getFullYear();
    const monthDiff = currentDateIST.getMonth() - createdDateIST.getMonth();
  
    const totalMonths = yearDiff * 12 + monthDiff;
  
    return totalMonths;
  }
  
  export default monthBetweenDtaseIST;