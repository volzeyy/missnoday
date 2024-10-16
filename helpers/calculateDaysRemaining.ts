const calculateDaysRemaining = (date: string, duration: number) => {
    const createdDate: Date = new Date(date);
    const currentDate: Date = new Date();
    const elapsedDays = Math.floor(
      (currentDate.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    return Math.max(duration - elapsedDays, 0);
};

export default calculateDaysRemaining;